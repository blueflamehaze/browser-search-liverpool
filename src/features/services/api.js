import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),

  endpoints: (builder) => ({
    getAllPeople: builder.query({
      query: () => ({
        url: "people/",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllPeopleQuery } = starWarsApi;
