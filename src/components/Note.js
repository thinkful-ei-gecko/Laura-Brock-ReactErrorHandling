import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import Context from "./Context";

export default class Note extends React.Component {
  static contextType = Context;

  handleDeleteButton = e => {
    const baseUrl = "http://localhost:9090";
    console.log(this.props)
    e.preventDefault();
    const noteId = this.props.match.params.noteId;
    console.log(noteId)

    fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(e => Promise.reject(e))
      }
      return response.json();
    })
    .then(() => {
      this.props.history.push('/')
      this.context.deleteNote(noteId)
      
    })
    .catch(error => {
      console.log({error})
    })
  };

  render() {
    const note = this.context.notes.find(
      n => n.id === this.props.match.params.noteId
    );
    const selectedFolder = this.context.folders.find(
      folder => folder.id === note.folderId
    );
    return (
      <main>
        <Header />
        <p>{note.name}</p>
        <p>{note.content}</p>
        <p>{new Date(note.modified).toDateString()}</p>
        <p>{selectedFolder.name}</p>
        <button>
          <Link to="/">Go Back</Link>
        </button>
        <button 
        type="button" 
        onClick={this.handleDeleteButton}>Delete</button>
      </main>
    );
  }
}