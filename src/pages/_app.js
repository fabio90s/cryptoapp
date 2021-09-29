import '../styles/globals.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../store/store';
import { Paper } from '@mui/material';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useMemo, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
	let userSetting = 'light';
	if (typeof window !== 'undefined') {
		localStorage.getItem('mode') ? userSetting = localStorage.getItem('mode') : null;
	}
	useEffect(() => {
		setDarkMode(userSetting);
	}, [userSetting]);

	const [darkMode, setDarkMode] = useState('light');

	const darkModeHandler = () => {
		setDarkMode(darkMode === 'light' ? 'dark' : 'light');
		localStorage.setItem('mode', darkMode === 'light' ? 'dark' : 'light');
	};

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: darkMode,
				},
			}),
		[darkMode]
	);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Paper sx={{ marginLeft: '250px' }} elevation={0}>
					<Provider store={store}>
						<Layout darkModeHandler={darkModeHandler}>
							<Head>
								<title>Crypto News</title>
								<link
									rel="stylesheet"
									href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
								/>
								<meta
									name="viewport"
									content="initial-scale=1.0, width=device-width"
								/>
							</Head>
							<Component {...pageProps} />

							<Footer></Footer>
						</Layout>
					</Provider>
				</Paper>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default MyApp;
