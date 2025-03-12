import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_ARTICLE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ page = 0, title = '' }) =>
        title
          ? `/articles/search?title=${encodeURIComponent(title)}&page=${page}`
          : `/articles?page=${page}`,
      providesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    getArticle: builder.query({
      query: (id) => `/articles/${id}`,
    }),
    createArticle: builder.mutation({
      query: (article) => ({
        url: '/articles',
        method: 'POST',
        body: article,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    updateArticle: builder.mutation({
      query: ({ id, ...article }) => ({
        url: `/articles/${id}`,
        method: 'PUT',
        body: article,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi
