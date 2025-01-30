import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateLabelType } from "labeltypes";
import { BASE_URL_V1, LABEL_FETCH_URL, LABEL_URL } from "./serviceUtils";

export const labelsApi = createApi({
  reducerPath: "labelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_V1 + LABEL_URL,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["Labels"],
  endpoints: (builder) => ({
    getAllLabels: builder.query<UpdateLabelType[], void>({
      query: () => ({ url: LABEL_FETCH_URL }),
      providesTags: ["Labels"],
      transformResponse: (response: { object: UpdateLabelType[] }) => {
        return response.object;
      },
    }),
  }),
});

export const { useLazyGetAllLabelsQuery } = labelsApi;
