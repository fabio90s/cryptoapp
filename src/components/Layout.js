import React from 'react';
import Navbar from './Navbar';
import CssBaseline from '@mui/material/CssBaseline';

const Layout = (props) => {
	return (
		<>
			<CssBaseline />

			<Navbar />
			{props.children}
		</>
	);
};

export default Layout;
