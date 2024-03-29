import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import "./FolderRoute.css";
import Context from "./Context";
import { Link } from "react-router-dom";
import AddNote from "./AddNote";
import PropTypes from 'prop-types';


export default class FolderRoute extends React.Component {
  static contextType = Context;

  handleDeleteButton = (e, noteId) => {
    const baseUrl = "http://localhost:9090";
    e.preventDefault();
    //console.log(noteId);

    fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(e => Promise.reject(e));
        }
        return response.json();
      })
      .then(() => {
        this.props.history.push("/");
        this.context.deleteNote(noteId);
      })
      .catch(error => {
        console.log({ error });
      });
  };

  render() {
    const folder = this.props.folders.find(
      f => f.id === this.props.match.params.folderId
    );
    const selectedNotes = this.props.notes
      .filter(notes => notes.folderId === folder.id)
      .map(note => (
        <Link to={`/note/${note.id}`}
        key={note.id}>
          <li className='liStyle'>
            <h2>{note.name}</h2>
            <p>Date Modified: {new Date(note.modified).toDateString()}</p>
            <p>{note.content}</p>
            <button
              type="button"
              onClick={e => this.handleDeleteButton(e, note.id)}
            >
              Delete
            </button>
          </li>
        </Link>
      ));
    return (
      <main>
        <Header />
        <div className="flexContainer">
          <Nav folders={this.props.folders} />
          <div className='rightSide'>
            <AddNote />
            <ul>{selectedNotes}</ul>
          </div>
        </div>
      </main>
    );
  }
}

FolderRoute.propTypes = {
	match: PropTypes.shape({
    params: PropTypes.shape({
      folderId: PropTypes.string.isRequired
    })
  }),
  history: PropTypes.object,
  folders: PropTypes.array,
  notes: PropTypes.array
}