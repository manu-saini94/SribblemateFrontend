import useDisplayNoteCards from "hooks/useDisplayNoteCards";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import withNote from "../components/notes/withNote";

const Notes = () => {
  const notes = useSelector(
    (state: RootState) => state.notes.pinnedAndOthersNotes
  );
  return useDisplayNoteCards(notes);
};

export default withNote(Notes);
