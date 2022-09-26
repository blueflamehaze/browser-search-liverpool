import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  // Set the base URL which we will make the requests
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),

  endpoints: (builder) => ({
    // This query allows to get all the characters from base URL in SWAPI
    // It's called on /src/features/pages/home/Home.jsx
    getAllPeople: builder.query({
      query: () => ({
        url: "people/",
        method: "GET",
      }),
    }),

    /**
     * This query allows to get a character by id from base URL in SWAPI
     * @param {string} id from characters. It's called on /src/features/pages/product-details/ProductDetails.jsx
     */
    getCharacter: builder.query({
      query: (id) => ({
        url: `people/${id}`,
        method: "GET",
      }),
    }),

    /**
     * This query allows to search characters by name from base URL in SWAPI
     * @param {string} searchParams - from search input. It's called on /src/features/pages/search-results/SearchResults.jsx
     */
    searchCharacter: builder.query({
      query: (searchParams) => ({
        url: `people/?search=${searchParams}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllPeopleQuery,
  useGetCharacterQuery,
  useSearchCharacterQuery,
} = starWarsApi;
