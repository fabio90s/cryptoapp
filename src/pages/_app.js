import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../store/store';
import { Paper } from '@mui/material';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
      	<Paper elevation={0}>
			<Navbar></Navbar>
			<main>
				<Component {...pageProps} />
				<Footer></Footer>
			</main>
      </Paper>
		</Provider>
	);
}

export default MyApp;
