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
    getCharacter: builder.query({
      query: (id) => ({
        url: `people/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllPeopleQuery, useGetCharacterQuery } = starWarsApi;
