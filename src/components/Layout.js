import React, { useState } from 'react';
import Navbar from './Navbar';
import CssBaseline from '@mui/material/CssBaseline';

const Layout = (props) => {
	const [mode, setMode] = useState('light');
	const getMode = (data) => {
		setMode(data);
		props.onGetTheme(mode)
	};
	return (
		<>
			<CssBaseline />
			<Navbar onToggleMode={getMode} />
			{props.children}
		</>
	);
};

export default Layout;
