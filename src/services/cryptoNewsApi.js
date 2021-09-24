import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
	'x-rapidapi-host': process.env.NEXT_PUBLIC_BING_RAPIDAPI_HOST,
	'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
};

const baseUrl = process.env.NEXT_PUBLIC_BING_API_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });


export const cryptoBingApi = createApi({
	reducerPath: 'cryptoBingApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getNews: builder.query({
			query: ({ newsCategory, count }) => createRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
		}),
	}),
});

export const { useGetNewsQuery } = cryptoBingApi
