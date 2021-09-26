import '../styles/globals.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../store/store';
import { Paper } from '@mui/material';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	return (
		<StyledEngineProvider injectFirst>
			<Provider store={store}>
				<Paper sx={{ marginLeft: '250px' }} elevation={0}>
					<Layout>
						<main>
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
						</main>
					</Layout>
				</Paper>
			</Provider>
		</StyledEngineProvider>
	);
}

export default MyApp;
