import React from "react";
import Context from "./Context";

export default class AddFolder extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  static contextType = Context;
  //state = {
  //folder: { value: "" }
  //};

  setFolderName = folderName => {
    this.setState({
      folderName: {
        value: folderName
      }
    });
  };

  handleButtonSubmit = e => {
    e.preventDefault();
    const folder = {
      name: e.target["folder-name"].value
    };

    fetch(`http://localhost:9090/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(folder)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(e => Promise.reject(e));
        }
        return response.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <section>
        <h3>Create a Folder</h3>
        <form onSubmit={this.handleButtonSubmit}>
          <label htmlFor="folder-input">Name</label>
          <input
            type="text"
            onChange={e => this.setFolderName(e.target.value)}
            id="folder-Input"
            name="folder-name"
          />
          <button type="submit">Add Folder</button>
        </form>
      </section>
    );
  }
}
