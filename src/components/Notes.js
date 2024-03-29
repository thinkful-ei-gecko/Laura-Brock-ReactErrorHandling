import React from 'react'
import { Link } from 'react-router-dom'
import Context from './Context'

const liStyle = {
    margin: '9px',
    padding: '6px',
    border: '2px solid grey'
  };

export default class Notes extends React.Component {
    static contextType = Context;

    render() {
        const notes = this.context.notes.map(note =>
            <Link to={`/note/${note.id}`}
            key={note.id}>
                <li style={liStyle}>
                    <h2>{note.name}</h2>
                    <p>Date Modified: {new Date(note.modified).toDateString()}</p>
                </li>
            </Link>
        )
        return (
            <ul>
                {notes}
            </ul>
        )
    }
}