import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ByIdTransformType, CreateNoteType, UpdateNoteType } from "notetypes";
import {
  BASE_URL_V1,
  CREATE_NOTE_URL,
  HTTP_METHODS,
  LABEL_URL,
  NOTE_FETCH_ALL_URL,
  NOTE_FETCH_URL,
  NOTE_UPDATE_URL,
  NOTE_URL,
  providesList,
} from "./serviceUtils";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_V1 + NOTE_URL,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["Notes"],

  endpoints: (builder) => ({
    getAllNotes: builder.query<UpdateNoteType[], void>({
      query: () => NOTE_FETCH_ALL_URL,
      transformResponse: (response: { object: UpdateNoteType[] }) => {
        return response.object;
      },
      providesTags: (result) => providesList(result, "Notes"),
    }),

    fetchNotesByLabels: builder.query<ByIdTransformType, void>({
      query: () => LABEL_URL + NOTE_FETCH_ALL_URL,
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

    getNote: builder.query<UpdateNoteType, { noteId: number }>({
      query: ({ noteId }) => ({ url: NOTE_FETCH_URL, params: { noteId } }),

      transformResponse: (response: { object: UpdateNoteType }) => {
        return response.object;
      },
      providesTags: (result) => [{ type: "Notes", id: result?.id }],
    }),

    updateNote: builder.mutation<UpdateNoteType, UpdateNoteType>({
      query: (noteData) => ({
        url: NOTE_UPDATE_URL,
        method: HTTP_METHODS.PUT,
        body: noteData,
      }),
      transformResponse: (response: { object: UpdateNoteType }) => {
        return response.object;
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notesApi.util.updateQueryData("getAllNotes", undefined, (draft) =>
            draft.map((note) => {
              if (note.id === id) {
                return { ...note, ...patch };
              }
              return note;
            })
          )
        );
        try {
          await queryFulfilled;
          // dispatch(notesApi.endpoints.getNote.initiate({ noteId: id }));
        } catch {
          patchResult.undo();
        }
      },
      // invalidatesTags: (result, error, { id }) => [{ type: "Notes", id }],
    }),
  }),
});

export const {
  useLazyGetAllNotesQuery,
  useLazyFetchNotesByLabelsQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} = notesApi;
