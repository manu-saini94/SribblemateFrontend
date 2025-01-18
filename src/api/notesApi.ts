import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateNoteType } from "notetypes";
import { BASE_URL_V1, NOTE_FETCH_URL, NOTE_URL } from "./serviceUtils";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_V1 + NOTE_URL,
    credentials: "include",
  }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getAllNotes: builder.query<UpdateNoteType[], void>({
      query: () => ({ url: NOTE_FETCH_URL }),
      providesTags: ["Notes"],
    }),
  }),
});

export const { useGetAllNotesQuery } = notesApi;
