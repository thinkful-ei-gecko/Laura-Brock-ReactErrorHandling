import React from 'react'
import Nav from './Nav'
import Notes from './Notes'
import Header from './Header'
import './MainPage.css'
import Context from './Context'
import ErrorPage from './ErrorPage'
import PropTypes from 'prop-types'

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
            <ErrorPage>
              <Notes
                folders={this.props.folders}
               notes={this.props.notes}
              />
            </ErrorPage>
        </div>
      </main>
    )
  }
}
MainPage.propTypes = {
  folders: PropTypes.array,
  notes: PropTypes.array
}