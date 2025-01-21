import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ByIdTransformType, CreateNoteType, UpdateNoteType } from "notetypes";
import {
  BASE_URL_V1,
  CREATE_NOTE_URL,
  HTTP_METHODS,
  LABEL_URL,
  NOTE_FETCH_URL,
  NOTE_URL,
} from "./serviceUtils";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_V1 + NOTE_URL,
    credentials: "include",
  }),
  tagTypes: ["Notes"],

  endpoints: (builder) => ({
    getAllNotes: builder.query<UpdateNoteType[], void>({
      query: () => NOTE_FETCH_URL,
      transformResponse: (response: { object: UpdateNoteType[] }) => {
        return response.object;
      },
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: "Notes" as const, id }))]
          : [];
      },
    }),

    fetchNotesByLabels: builder.query<ByIdTransformType, void>({
      query: () => LABEL_URL + NOTE_FETCH_URL,
      transformResponse: (response: { object: ByIdTransformType }) => {
        return response.object;
      },
    }),

    createNote: builder.mutation<UpdateNoteType, CreateNoteType>({
      query: (noteData) => ({
        url: CREATE_NOTE_URL,
        method: HTTP_METHODS.POST,
        body: noteData,
      }),
      transformResponse: (response: { object: UpdateNoteType }) => {
        return response.object;
      },
      async onQueryStarted(noteData, { dispatch, queryFulfilled }) {
        try {
          const { data: createdNote } = await queryFulfilled;
          dispatch(
            notesApi.util.updateQueryData("getAllNotes", undefined, (notes) => {
              notes.unshift(createdNote);
              return notes;
            })
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useLazyGetAllNotesQuery,
  useLazyFetchNotesByLabelsQuery,
  useCreateNoteMutation,
} = notesApi;
