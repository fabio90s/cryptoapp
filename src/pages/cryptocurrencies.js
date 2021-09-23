import React, { useEffect, useState } from 'react';
import millify from 'millify';
import Link from 'next/link';
import {
	Card,
	CardHeader,
	CardContent,
	CardActionArea,
	Grid,
	Input,
	Avatar,
	Container,
} from '@material-ui/core';
import { useGetCryptosQuery } from '../services/cryptoApi';
import styles from '../styles/Cryptocurrencies.module.css';

const Cryptocurrencies = (props) => {
	const count = props.simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(search.toLowerCase())
		);
		setCryptos(filteredData);
	}, [cryptosList, search]);

	return (
		<>
			{!props.simplified && (
				<Container>
					<Input
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearch(e.target.value)}
						className={styles.searchField}
					/>
				</Container>
			)}
			{isFetching && <p>Loading...</p>}
			{!isFetching && (
				<Container>
					<Grid spacing={3} container item direction="row">
						{cryptos?.map((crypto) => (
							<Grid item key={crypto.id} xs={12} sm={6} md={4} lg={3}>
								<Link href={`/crypto/${crypto.id}`}>
									<Card raised={true}>
										<CardActionArea>
										<CardHeader
											title={`${crypto.rank}. ${crypto.name}`}
											avatar={
												<Avatar
													sx={{ marginTop: 20 }}
													src={crypto.iconUrl}
												></Avatar>
											}
										></CardHeader>
										<CardContent>
											<hr />
											<p>Price: {millify(crypto.price)}</p>
											<p>Market Cap: {millify(crypto.marketCap)}</p>
											<p>Daily Change: {millify(crypto.change)}%</p>
										</CardContent>
										</CardActionArea>
									</Card>
								</Link>
							</Grid>
						))}
					</Grid>
				</Container>
			)}
		</>
	);
};

export default Cryptocurrencies;
