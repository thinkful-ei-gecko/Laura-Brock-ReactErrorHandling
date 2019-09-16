import React from "react";
import { Route, Switch } from "react-router-dom";
import "../App.css";
import MainPage from "./MainPage";
import FolderRoute from "./FolderRoute";
import NotFoundPage from "./NotFoundPage";
import Note from "./Note";
import Context from "./Context";

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  };
  componentDidMount() {
    const baseUrl = "http://localhost:9090";

    Promise.all([fetch(`${baseUrl}/notes`), fetch(`${baseUrl}/folders`)])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok) {
          return notesResponse.json().then(e => Promise.reject(e));
        }
        if (!foldersResponse.ok) {
          return foldersResponse.json().then(e => Promise.reject(e));
        }
        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({
          notes,
          folders
        });
      })
      /* .then(() => {
        console.log(this.props)
        this.state.props.history.push("/");
      }) */
      .catch(e => console.log(e));
  }

  handleDelete = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDelete,
      addNote: this.addNote,
      addFolder: this.addFolder
    };
    //console.log(value);
    return (
      <Context.Provider value={value}>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <MainPage
                  folders={this.state.folders}
                  notes={this.state.notes}
                />
              )}
            />
            <Route
              exact
              path="/folder/:folderId"
              render={routeProps => (
                <FolderRoute
                  folders={this.state.folders}
                  notes={this.state.notes}
                  {...routeProps}
                />
              )}
            />
            <Route
              exact
              path="/note/:noteId"
              render={routeProps => (
                <Note
                  folders={this.state.folders}
                  notes={this.state.notes}
                  {...routeProps}
                />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

export default App;