import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../store/store';
import { Paper } from '@mui/material';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Paper elevation={0}>
				<Navbar></Navbar>
				<main>
					<Head>
						<title>My page title</title>
						<meta
							name="viewport"
							content="initial-scale=1.0, width=device-width"
						/>
					</Head>
					<Component {...pageProps} />
					<Footer></Footer>
				</main>
			</Paper>
		</Provider>
	);
}

export default MyApp;
