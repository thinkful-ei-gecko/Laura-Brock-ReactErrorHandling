import { NavLink } from 'react-router-dom';
import React from 'react';
import './Nav.css'
import Context from './Context'
import AddFolder from './AddFolder';
import PropTypes from 'prop-types';


export default class Nav extends React.Component {
	static contextType = Context;

	render() {
		const navLinks = this.props.folders.map(folder =>
			<NavLink className='Nav-item'
				activeClassName='is-active'
				to={`/folder/${folder.id}`}
				key={folder.id}>
				{folder.name}
			</NavLink>)

		return (
			<div className='Nav'>
				{navLinks}
				<AddFolder />
			</div>
		)
	}
}
Nav.propTypes = {
	folders: PropTypes.array,
}