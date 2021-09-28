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
import { Avatar, Paper, TableBody } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGetExchangesCryptoQuery } from '../services/cryptoApi';
import Spinner from '../components/Spinner';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

export default function Exchanges() {
	const [open, setOpen] = useState(false);
	const [excIndex, setExcIndex] = useState(null);
	const { data, isFetching } = useGetExchangesCryptoQuery();
	let exchanges = data?.data?.exchanges;

	return (
		<>
			{isFetching && <Spinner />}
			{!isFetching && (
				<>
					<TableContainer component={Paper}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>Exchanges</TableCell>
									<TableCell align="right">24h Trade Volume</TableCell>
									<TableCell align="right">Markets</TableCell>
									<TableCell align="right">Change</TableCell>
								</TableRow>
							</TableHead>
							{exchanges.map((exchange, index) => (
								<Fragment key={exchange.id}>
									<TableBody>
										<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
											<TableCell>
												<IconButton
													aria-label="expand row"
													size="small"
													onClick={() => setOpen(!open)}
												>
													{open ? (
														<KeyboardArrowUpIcon />
													) : (
														<KeyboardArrowDownIcon />
													)}
												</IconButton>
											</TableCell>
											<TableCell component="th" scope="row">
												<Avatar src={exchange.iconUrl}></Avatar> {exchange.rank}{' '}
												{exchange.name}
											</TableCell>
											<TableCell align="right">
												${millify(exchange.volume)}
											</TableCell>
											<TableCell align="right">
												{millify(exchange.numberOfMarkets)}
											</TableCell>
											<TableCell align="right">{millify(exchange.marketShare)}%</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												style={{ paddingBottom: 0, paddingTop: 0 }}
												colSpan={6}
											>
												<Collapse in={open} timeout="auto" unmountOnExit>
													<Box sx={{ margin: 1 }}>
														<Typography
															variant="body1"
															gutterBottom
															component="div"
														>
															{HTMLReactParser(exchange?.description || '')}
														</Typography>
														<Table size="small" aria-label="purchases">
															{/* <TableBody>
															{row.history.map((historyRow) => (
																<TableRow key={historyRow.date}>
																	<TableCell component="th" scope="row">
																		{historyRow.date}
																	</TableCell>
																	<TableCell>{historyRow.customerId}</TableCell>
																	<TableCell align="right">
																		{historyRow.amount}
																	</TableCell>
																	<TableCell align="right">
																		{Math.round(
																			historyRow.amount * row.price * 100
																		) / 100}
																	</TableCell>
																</TableRow>
															))}
														</TableBody> */}
														</Table>
													</Box>
												</Collapse>
											</TableCell>
										</TableRow>
									</TableBody>
								</Fragment>
							))}
						</Table>
					</TableContainer>
				</>
			)}
		</>
	);
}

{
	/* <TableRow>
									<TableCell>
										<IconButton
											aria-label="expand row"
											size="small"
											onClick={() => setOpen(!open)}
										>
											{open ? (
												<KeyboardArrowUpIcon />
											) : (
												<KeyboardArrowDownIcon />
											)}
										</IconButton>
									</TableCell>
									<TableRow>
										<TableCell
											style={{ paddingBottom: 0, paddingTop: 0 }}
											colSpan={6}
										>
											<Collapse in={open} timeout="auto" unmountOnExit>
												<Box sx={{ margin: 1 }}>
													<Table size="small" aria-label="purchases">
														<TableHead>
															<TableRow>
																<TableCell>Description</TableCell>
															</TableRow>
														</TableHead>
														<TableBody></TableBody>
													</Table>
												</Box>
											</Collapse>
										</TableCell>
									</TableRow>
									<TableCell align="right">{exchange.name}</TableCell>
									<TableCell align="right">
										{millify(exchange.volume)}
									</TableCell>
									<TableCell align="right">
										{millify(exchange.marketShare)}
									</TableCell>
									<TableCell align="right">WEE</TableCell>
								</TableRow>
							))}

							<TableBody></TableBody> */
}
