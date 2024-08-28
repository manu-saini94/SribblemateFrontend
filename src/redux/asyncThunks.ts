import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNoteForUser,
  getAllLabelNotesByUser,
  getAllNotesByLabel,
  getAllNotesByUser,
} from "api/services";
import { CreateNoteType } from "notetypes";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () => {
  return getAllNotesByUser().then((response) => response.data.object);
});

export const fetchAllLabelNotes = createAsyncThunk(
  "notes/fetchAllLabelNotes",
  () => {
    return getAllLabelNotesByUser().then((response) => response.data.object);
  }
);

export const fetchNotesByLabel = createAsyncThunk(
  "notes/fetchAllLabelNotes",
  (labelId: number) => {
    return getAllNotesByLabel(labelId).then((response) => response.data.object);
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  (noteData: CreateNoteType) => {
    return createNoteForUser(noteData).then((response) => response.data.object);
  }
);
