import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getHello: builder.query<{ msg: string }, void>({
      query: () => 'hello'
    })
  })
})

export const { useGetHelloQuery } = exampleApi
