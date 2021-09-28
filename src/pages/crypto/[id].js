import {
	Container,
	Grid,
	Divider,
	Typography,
	List,
	ListItem,
	MenuItem,
} from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import styles from '../../styles/CryptoDetails.module.css';
import {
	useGetSingleCryptoQuery,
	useGetHistoryCryptoQuery,
} from '../../services/cryptoApi';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckIcon from '@mui/icons-material/Check';
import BoltIcon from '@mui/icons-material/Bolt';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BarChartIcon from '@mui/icons-material/BarChart';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TagIcon from '@mui/icons-material/Tag';
import Link from 'next/link';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LineChart from '../../components/LineChart';
import Head from 'next/head';

const Crypto = () => {
	const router = useRouter();
	const cryptoId = router.query.id;
	const [timeframe, setTimeframe] = useState('7d');
	const { data, isFetching } = useGetSingleCryptoQuery(cryptoId);
	const { data: period } = useGetHistoryCryptoQuery({ cryptoId, timeframe });
	const crypto = data?.data?.coin;
	const history = period?.data?.history;
	const stats = [
		{
			title: 'Price to USD',
			value: `$${crypto?.price && millify(crypto.price)}`,
			icon: <MonetizationOnIcon />,
			id: '1',
		},
		{
			title: 'Rank',
			value: `${crypto?.rank && millify(crypto.rank)}`,
			icon: <TagIcon />,
			id: '2',
		},
		{
			title: '24h Volume',
			value: `$${crypto?.volume && millify(crypto.volume)}`,
			icon: <BoltIcon />,
			id: '3',
		},
		{
			title: 'Market Cap',
			value: `$${crypto?.marketCap && millify(crypto.marketCap)}`,
			icon: <MonetizationOnIcon />,
			id: '4',
		},
		{
			title: 'All-time-high',
			value: `$${
				crypto?.allTimeHigh?.price && millify(crypto.allTimeHigh?.price)
			}`,
			icon: <ArrowUpwardIcon />,
			id: '5',
		},
	];

	const globalOverview = [
		{
			title: 'Number of Markets',
			value: crypto?.numberOfMarkets,
			icon: <BarChartIcon />,
		},
		{
			title: 'Number of Exchanges',
			value: crypto?.numberOfExchanges,
			icon: <GraphicEqIcon />,
		},
		{
			title: 'Approved Supply',
			value:
				crypto?.approvedSupply === true ? (
					<CheckIcon color="success" />
				) : (
					<DoNotDisturbIcon />
				),
			icon: <ErrorOutlineIcon />,
		},
		{
			title: 'Total Supply',
			value: crypto?.numberOfMarkets,
			icon: <ErrorOutlineIcon />,
		},
		{
			title: 'Circulating Supply',
			value: `${
				crypto?.circulatingSupply && millify(crypto?.circulatingSupply)
			}`,
			icon: <ErrorOutlineIcon />,
		},
	];

	const time = ['24h', '7d', '30d', '1y', '5y'];
	const selectHandler = (e) => {
		setTimeframe(e.target.value);
	};
	return (
		<>
			<Head>
				<title>{data?.data?.coin?.name}</title>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{isFetching && <Spinner />}
			{!isFetching && (
				<Container>
					<Grid container>
						<Container id="back-to-top-anchor" className={styles.title}>
							<strong>
								<span>
									{data?.data?.coin?.name} ({data?.data?.coin?.symbol})
								</span>
							</strong>
							<br />
							<Typography className={styles.subtitle} variant="subtitle2">
								{data?.data?.coin?.name} live price in US dollars. View value,
								statistics, market cap and supply.
							</Typography>
							<Divider className={styles.divider} />
						</Container>
						<Container className={styles.chart_section}>
							<FormControl sx={{ width: 200, marginBottom: 5 }}>
								<InputLabel id="demo-simple-select-label">
									Time period
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={timeframe}
									label="Time period"
									onChange={selectHandler}
								>
									{time.map((time) => (
										<MenuItem key={time} value={time}>
											{time}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									flexWrap: 'wrap',
									marginBottom: 30,
								}}
							>
								<Typography className={styles.leftTitle} variant="h5">
									{crypto.name} Price Chart
								</Typography>
								<Typography variant="inherit">
									<strong>{crypto.change}%</strong> {crypto.name} change.
									Current {crypto.name} price:{' '}
									<strong>{millify(crypto.price)} </strong>
								</Typography>
							</div>
							<LineChart
								key={history?.map((price) => price.price)}
								title={'Price in USD'}
								labels={history?.map((time) =>
									new Date(time.timestamp).toLocaleDateString()
								)}
								data={history?.map((price) => price.price)}
							></LineChart>
						</Container>
						<div className={styles.main}>
							<Grid container item xs={12} sm={6} md={6} lg={5}>
								<Container className={styles.left}>
									<Typography variant="h6">
										{crypto.name} Value Statistics
									</Typography>
									<Typography variant="subtitle1">
										An overview showing the stats of {crypto.name}{' '}
									</Typography>
									<List sx={{ display: 'flex', flexDirection: 'column' }}>
										{stats?.map((item) => (
											<ListItem key={item.title} className={styles.coin_stats}>
												<Typography className={styles.coin_stats_name}>
													{item.icon} {item.title}
												</Typography>
												<Typography className={styles.coin_stats_value}>
													<strong>{item.value}</strong>
												</Typography>
											</ListItem>
										))}
									</List>
								</Container>
							</Grid>
							<Grid container item xs={12} sm={6} md={6} lg={5}>
								<Container className={styles.right}>
									<Typography variant="h6">Other Statistics</Typography>
									<Typography variant="subtitle1">
										Overview about all cryptocurrencies
									</Typography>
									<List sx={{ display: 'flex', flexDirection: 'column' }}>
										{globalOverview?.map((item) => (
											<ListItem key={item.title} className={styles.coin_stats}>
												<Typography className={styles.coin_stats_name}>
													{item.icon} {item.title}:
												</Typography>
												<Typography className={styles.coin_stats_value}>
													<strong>{item.value}</strong>
												</Typography>
											</ListItem>
										))}
									</List>
								</Container>
							</Grid>
							<Container className={styles.crypto_info}>
								<Typography variant="h3">
									<strong>What is {crypto?.name}?</strong>
								</Typography>
								{HTMLReactParser(crypto?.description)}
								<Divider />
							</Container>

							<Container className={styles.crypto_links}>
								<Typography variant="h4">
									<strong>{crypto?.name} Links</strong>
								</Typography>
								<List key={3}>
									{crypto?.links.map((link) => (
										<ListItem key={link.url} className={styles.links_list}>
											<Typography className={styles.link_name} variant="h6">
												<strong>{link?.type}</strong>{' '}
											</Typography>
											<Typography variant="body1">
												<Link passHref={true} href={link?.url}>
													<a target="_blank" rel="noreferrer">
														{link?.url}
													</a>
												</Link>
											</Typography>
										</ListItem>
									))}
								</List>
							</Container>
						</div>
					</Grid>
				</Container>
			)}
		</>
	);
};

export default Crypto;
