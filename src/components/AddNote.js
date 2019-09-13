import React from "react";
import Context from "./Context";

export default class AddNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  static contextType = Context;

  setNoteName = noteName => {
    this.setState({
      noteName: {
        value: noteName
      }
    });
  };

  handleButtonSubmit = e => {
    e.preventDefault();
    const newNote = {
      name: e.target["note-name"].value,
      content: e.target["note-content"].value,
      folderId: e.target["note-folder-id"].value,
      modified: new Date()
    };

    fetch(`http://localhost:9090/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newNote)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(e => Promise.reject(e));
        }
        return response.json();
      })
      .then(newNote => {
        e.target.reset()
        //console.log(this.context.note)
        this.context.addNote(newNote);
        this.props.history.push(`/notes/${newNote.id}`);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { folders = [] } = this.context;
    return (
      <section>
        <h3>Create a Note</h3>
        <form onSubmit={this.handleButtonSubmit}>
          <div>
            <label htmlFor="note-input">Name</label>
            <input
              type="text"
              onChange={e => this.setNoteName(e.target.value)}
              id="note-Input"
              name="note-name"
              required
            />
          </div>
          <div>
            <label htmlFor="note-content-input">Content</label>
            <textarea id="note-content-Input" name="note-content" />
          </div>
          <div>
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" name="note-folder-id">
              <option value={null}>...</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Note</button>
        </form>
      </section>
    );
  }
}
