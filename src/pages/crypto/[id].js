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
		<>
			{isFetching && <Spinner />}

			{!isFetching && (
				<Container>
					<Grid container>
						<Container className={styles.title}>
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
							<Divider sx={{ padding: 5 }} className={styles.divider} />
						</Container>
						<div className={styles.main}>
							<Grid container item xs={12} sm={6} md={6} lg={5}>
								<Container className={styles.left}>
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
												<ListItem className={styles.coin_stats}>
													<Typography className={styles.coin_stats_name}>
														{item.icon} {item.title}
													</Typography>
													<Typography className={styles.coin_stats_value}>
														<strong>{item.value}</strong>
													</Typography>
												</ListItem>
												<Divider />
											</>
										))}
									</List>
								</Container>
							</Grid>
							<Grid container item xs={12} sm={6} md={6} lg={5}>
								<Container className={styles.right}>
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
												<ListItem className={styles.coin_stats}>
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
								<List>
									{crypto?.links.map((link) => (
										<>
											<ListItem className={styles.links_list}>
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
											<Divider />
										</>
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
