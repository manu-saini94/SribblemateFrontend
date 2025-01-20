import { useFetchNotesByLabelsQuery, useGetAllNotesQuery } from "api/notesApi";
import { QueryStatesType } from "global";
import { getCategorizedNotes } from "utility/reduxutils/noteUtils";

const useNotesByLabelId = (labelId: number): QueryStatesType => {
  const {
    data: allNotes = [],
    isLoading: notesLoading,
    error: allNotesError,
  } = useGetAllNotesQuery();
  const {
    data: noteIdsByLabel = {},
    isLoading: mappingLoading,
    error: notesByLabelError,
  } = useFetchNotesByLabelsQuery();

  const getCategoryNotes = () => {
    const filteredNotes = noteIdsByLabel[labelId]
      ? allNotes.filter((note) => noteIdsByLabel[labelId]?.includes(note.id))
      : [];
    return getCategorizedNotes(filteredNotes);
  };

  return {
    notes: getCategoryNotes(),
    loading: notesLoading || mappingLoading,
    error: allNotesError || notesByLabelError,
  };
};

export default useNotesByLabelId;
