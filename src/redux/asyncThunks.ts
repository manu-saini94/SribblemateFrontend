import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNoteForUser, getAllNotesByUser } from "api/services";
import { CreateNoteType } from "notetypes";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () => {
  return getAllNotesByUser().then((response) => response.data.object);
});

export const createNote = createAsyncThunk(
  "notes/createNote",
  (noteData: CreateNoteType) => {
    return createNoteForUser(noteData).then((response) => response.data.object);
  }
);
