import {
	Container,
	Grid,
	Divider,
	Typography,
	List,
	ListItem,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Spinner from '../../components/Spinner';
import styles from '../../styles/CryptoDetails.module.css';
import { useGetSingleCryptoQuery } from '../../services/cryptoApi';
import millify from 'millify';
// import HTMLParser from 'HTMLParser';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckIcon from '@mui/icons-material/Check';
import BoltIcon from '@mui/icons-material/Bolt';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { StyledEngineProvider } from '@mui/material/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TagIcon from '@mui/icons-material/Tag';

const Crypto = () => {
	const router = useRouter();
	const { data, isFetching } = useGetSingleCryptoQuery(`${router.query.id}`);
	const crypto = data?.data?.coin;
	const stats = [
		{
			title: 'Price to USD',
			value: `$${crypto?.price && millify(crypto.price)}`,
			icon: <MonetizationOnIcon />,
		},
		{
			title: 'Rank',
			value: `$${crypto?.rank && millify(crypto.rank)}`,
			icon: <TagIcon />,
		},
		{
			title: '24h Volume',
			value: `$${crypto?.volume && millify(crypto.volume)}`,
			icon: <BoltIcon />,
		},
		{
			title: 'Market Cap',
			value: `$${crypto?.marketCap && millify(crypto.marketCap)}`,
			icon: <MonetizationOnIcon />,
		},
		{
			title: 'All-time-high',
			value: `$${
				crypto?.allTimeHigh?.price && millify(crypto.allTimeHigh?.price)
			}`,
			icon: <ArrowUpwardIcon />,
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

	return (
		<StyledEngineProvider injectFirst>
			<Grid container>
				{isFetching && <Spinner />}

				{!isFetching && (
					<Container>
						<Container className={styles.title}>
							<strong>
								{data?.data?.coin?.name} ({data?.data?.coin?.symbol})
							</strong>
							<Divider sx={{ padding: 5 }} className={styles.divider} />
						</Container>
						<div className={styles.main}>
							<Grid item xs={12} sm={12} md={4} lg={4}>
								<div className={styles.left}>
									<Typography className={styles.leftTitle} variant="h5">
										{crypto.name} Price Chart
									</Typography>
									<Typography variant="h6">
										{crypto.name} Value Statistics
									</Typography>
									<Typography variant="subtitle1">
										An overview showing the stats of {crypto.name}{' '}
									</Typography>
									<List sx={{ display: 'flex' }}>
										{stats?.map((item) => (
											<>
												<ListItem className={styles.coin_stats_all}>
													<Typography className={styles.coin_stats_name}>
														{item.icon} {item.title}:
													</Typography>
													<Typography className={styles.coin_stats_value}>
														<strong>{item.value}</strong>
													</Typography>
												</ListItem>
												<Divider />
											</>
										))}
									</List>
								</div>
							</Grid>
							<Grid item xs={12} sm={12} md={4} lg={4}>
								<div className={styles.right}>
									<Typography variant="inherit">
										<strong>{crypto.change}%</strong> {crypto.name} change.
									</Typography>
									<Typography variant="h6">Other Statistics</Typography>
									<Typography variant="subtitle1">
										Overview about all cryptocurrencies
									</Typography>
									<List sx={{ display: 'flex' }}>
										{globalOverview?.map((item) => (
											<>
												<ListItem className={styles.coin_stats_all}>
													<Typography className={styles.coin_stats_name}>
														{item.icon} {item.title}:
													</Typography>
													<Typography className={styles.coin_stats_value}>
														<strong>{item.value}</strong>
													</Typography>
												</ListItem>
												<Divider />
											</>
										))}
									</List>
								</div>
							</Grid>
						</div>
					</Container>
				)}
			</Grid>
		</StyledEngineProvider>
	);
};

export default Crypto;
