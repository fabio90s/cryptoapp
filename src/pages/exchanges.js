import React, { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Avatar, Paper, TableBody, Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGetExchangesCryptoQuery } from '../services/cryptoApi';
import Spinner from '../components/Spinner';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

export default function Exchanges() {
	const [excIndex, setExcIndex] = useState(null);
	const { data, isFetching } = useGetExchangesCryptoQuery();
	let exchanges = data?.data?.exchanges;

	return (
		<>
			{isFetching && <Spinner />}
			{!isFetching && (
				<Container sx={{ padding: 5 }}>
					<TableContainer component={Paper}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell id="back-to-top-anchor">Exchanges</TableCell>
									<TableCell align="right">24h Trade Volume</TableCell>
									<TableCell align="right">Markets</TableCell>
									<TableCell align="right">Change</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{exchanges.map((exchange, index) => (
									<Fragment key={exchange.id}>
										<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
											<TableCell>
												{excIndex === index ? (
													<IconButton
														aria-label="expand row"
														size="small"
														onClick={() => setExcIndex(null)}
													>
														<KeyboardArrowUpIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label="expand row"
														size="small"
														onClick={() => setExcIndex(index)}
													>
														<KeyboardArrowDownIcon />
													</IconButton>
												)}
											</TableCell>
											<TableCell component="th" scope="row">
												<Avatar
													alt="crypto-icon"
													src={exchange.iconUrl}
												></Avatar>
												{exchange.rank}. <strong>{exchange.name}</strong>
											</TableCell>
											<TableCell align="right">
												${millify(exchange.volume)}
											</TableCell>
											<TableCell align="right">
												{millify(exchange.numberOfMarkets)}
											</TableCell>
											<TableCell align="right">
												{millify(exchange.marketShare)}%
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												style={{ paddingBottom: 0, paddingTop: 0 }}
												colSpan={6}
											>
												<Collapse
													in={excIndex === index}
													timeout="auto"
													unmountOnExit
												>
													<Box sx={{ margin: 1 }}>
														<Typography
															variant="body1"
															gutterBottom
															component="div"
														>
															{HTMLReactParser(exchange?.description || 'No description available.')}
														</Typography>
														<Table size="small" aria-label="purchases"></Table>
													</Box>
												</Collapse>
											</TableCell>
										</TableRow>
									</Fragment>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			)}
		</>
	);
}
