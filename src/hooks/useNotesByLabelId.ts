// QueryStatesType
const useNotesByLabelId = (labelId: number) => {
  // const {
  //   data: noteIdsByLabel = [],
  //   error: noteIdsByLabelError,
  //   isLoading: isNotesByLabelLoading,
  //   isError: isNotesByLabelError,
  //   isFetching: isNotesByLabelFetching,
  // } = notesApi.endpoints.fetchNotesByLabels.useQueryState(undefined, {
  //   selectFromResult: ({ data, isLoading, isError, isFetching, error }) => ({
  //     error,
  //     isError,
  //     isFetching,
  //     isLoading,
  //     data: data ? data[labelId] : [],
  //   }),
  // });
  // const {
  //   data: allNotes = [],
  //   error: allNotesError,
  //   isLoading: isAllNotesLoading,
  //   isError: isAllNotesError,
  //   isFetching: isAllNotesFetching,
  // } = notesApi.endpoints.getAllNotes.useQueryState(undefined, {
  //   selectFromResult: ({ data, isLoading, isError, isFetching, error }) => ({
  //     error,
  //     isError,
  //     isFetching,
  //     isLoading,
  //     data:
  //       data && noteIdsByLabel.length > 0
  //         ? data.filter((note) => noteIdsByLabel?.includes(note.id))
  //         : [],
  //   }),
  // });
  // return {
  //   notes: getCategorizedNotes(allNotes),
  //   isLoading: isAllNotesLoading || isNotesByLabelLoading,
  //   isError: isAllNotesError || isNotesByLabelError,
  //   isFetching: isAllNotesFetching || isNotesByLabelFetching,
  //   error: allNotesError || noteIdsByLabelError,
  // };
};

export default useNotesByLabelId;
