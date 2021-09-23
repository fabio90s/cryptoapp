import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import millify from 'millify';
import { Typography, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { Container } from '@material-ui/core';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './cryptocurrencies';
import LatestNews from './news';

export default function Home() {
	const { data, isFetching } = useGetCryptosQuery(10);

	const globalStats = data?.data?.stats;
	return (
		<>
			{isFetching && <p>Loading...</p>}
			{!isFetching && (
				<Container>
					<Typography variant="h4" sx={{ pt: 2 }}>
						Global Crypto Status
					</Typography>
					<Grid spacing={2} container direction="row" sx={{ pt: 2 }}>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							Total Cryptocurrencies
							<br />
							<strong>{globalStats.total.toLocaleString('en-US')}</strong>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							Total Exchanges
							<br />
							<strong>{millify(globalStats.totalExchanges)}</strong>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							Total Market Cap
							<br />
							<strong>{millify(globalStats.totalMarketCap)}</strong>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							Total 24h Volume
							<br />
							<strong>{millify(globalStats.total24hVolume)}</strong>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							Total Markets
							<br />
							<strong>{millify(globalStats.totalMarkets)}</strong>
						</Grid>
					</Grid>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 40,
							marginBottom: 40,
						}}
					>
						<Typography variant={'h4'}>
							Top 10 Cryptocurrencies in the world
						</Typography>
						<Typography variant={'h6'} sx={{ color: '#0071bd' }}>
							<Link href="/cryptocurrencies">Show More</Link>
						</Typography>
					</div>
					<Cryptocurrencies simplified={true} />
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 40,
						}}
					>
						<Typography variant={'h4'}>Latest Crypto News</Typography>
						<Typography variant={'h6'} sx={{ color: '#0071bd' }}>
							<Link href="/news">
								<a>Show More</a>
							</Link>
						</Typography>
					</div>
					<LatestNews />
				</Container>
			)}
		</>
	);
}
