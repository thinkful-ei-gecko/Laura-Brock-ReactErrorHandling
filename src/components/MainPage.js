import React from 'react'
import Nav from './Nav'
import Notes from './Notes'
import Header from './Header'
import './MainPage.css'
import Context from './Context'

export default class MainPage extends React.Component {
  static contextType = Context;

  render() {
    return (
      <main>
        <Header />
        <div className="flexContainer">
          <Nav
            folders={this.props.folders}
          />
          <Notes
            folders={this.props.folders}
            notes={this.props.notes}
          />
        </div>
      </main>
    )
  }
}