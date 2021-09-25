import React, { useState } from 'react';
import { useGetNewsQuery } from '../services/cryptoNewsApi';
import {
	Card,
	CardContent,
	CardHeader,
	Avatar,
	Button,
	CardActionArea,
	CardActions,
	Container,
	Grid,
	Typography,
	Alert,
} from '@mui/material';
import moment from 'moment';
import styles from '../styles/News.module.css';
import Link from 'next/link';
import {
	FacebookShareButton,
	LinkedinShareButton,
	RedditShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookIcon,
	LinkedinIcon,
	RedditIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Spinner from '../components/Spinner';

const LatestNews = (props) => {
	const [isCopied, setIsCopied] = useState(false);
	const [newsIndex, setNewsIndex] = useState(null);
	const altImg =
		'https://cdn.icon-icons.com/icons2/1386/PNG/512/generic-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95642.png';

	const { data: cryptoNews, isFetching } = useGetNewsQuery({
		newsCategory: 'Cryptocurrency',
		count: props.simplified ? 10 : 100,
	});


	return (
		<>
			{!props.simplified && (
				<Typography sx={{ padding: 2 }} variant="h3">
					Latest Crypto News
				</Typography>
			)}
			{isFetching && <Spinner />}
			{!isFetching && (
				<Container
					sx={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}
				>
					<Grid container item className={styles.main_news}>
						{cryptoNews?.value.map((news, index) => (
							<Grid
								key={news.url}
								container
								item
								xs={12}
								sm={6}
								md={6}
								lg={4}
								className={styles.main_news}
							>
								<Card sx={{ maxWidth: 345, margin: 2 }} raised={true}>
									<Link passHref={true} href={news.url}>
										<a target="_blank" rel="noreferrer">
											<CardActionArea>
												<CardHeader
													title={<strong>{news.name}</strong>}
													avatar={
														<Avatar
															variant="square"
															sx={{ height: 80, width: 80 }}
															alt="img"
															src={news?.image?.thumbnail?.contentUrl || altImg}
														/>
													}
												/>
												<CardContent>
													<Typography
														gutterBottom
														variant="h5"
														component="div"
													></Typography>
													<Typography variant="body2" color="text.secondary">
														{`${news.description.slice(0, 150)}...`}
													</Typography>
												</CardContent>
												<CardHeader
													title={news?.provider[0]?.name}
													subheader={moment(news.datePublished)
														.startOf('ss')
														.fromNow()}
													avatar={
														<Avatar
															alt="img"
															src={
																news?.provider[0]?.image?.thumbnail
																	?.contentUrl || altImg
															}
														/>
													}
												></CardHeader>
											</CardActionArea>
										</a>
									</Link>
									<CardActions>
										<CopyToClipboard
											onCopy={() => setIsCopied(true)}
											text={news.url}
										>
											<Button
												size="small"
												color="primary"
												onClick={() =>
													setNewsIndex((newsIndex) =>
														newsIndex === index ? null : index
													)
												}
											>
												Share
											</Button>
										</CopyToClipboard>

										<WhatsappShareButton url={news.url}>
											<WhatsappIcon size={32} round />
										</WhatsappShareButton>
										<TelegramShareButton url={news.url}>
											<TelegramIcon size={32} round />
										</TelegramShareButton>
										<FacebookShareButton url={news.url}>
											<FacebookIcon size={32} round />
										</FacebookShareButton>
										<LinkedinShareButton url={news.url}>
											<LinkedinIcon size={32} round />
										</LinkedinShareButton>
										<RedditShareButton url={news.url}>
											<RedditIcon size={32} round />
										</RedditShareButton>
										<TwitterShareButton url={news.url}>
											<TwitterIcon size={32} round />
										</TwitterShareButton>
									</CardActions>
									{isCopied && newsIndex === index && (
										<div className={styles.alert}>
											<Alert onClose={() => setIsCopied(false) && setNewsIndex(null)}>Copied!</Alert>
										</div>
									)}
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			)}
		</>
	);
};

export default LatestNews;
