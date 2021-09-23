import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
	'x-rapidapi-host': process.env.NEXT_PUBLIC_CRYPTO_RAPIDAPI_HOST,
	'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
};
const baseUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),
	}),
});

export const { useGetCryptosQuery } = cryptoApi;
