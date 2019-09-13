import React from 'react';
import Context from './Context';

export default class AddNote extends React.Component {

    static contextType = Context;

    

    render () {
        return (
            <section>
                <h3>Create a Note</h3>
                <form>
                    <label htmlFor="note-input">
                        Name
                    </label>
                    <input type="text" id="note-Input" name="note-name"/>
                    <button type="submit">
                        Add Note
                    </button>
                </form>
            </section>
        )
    }
}