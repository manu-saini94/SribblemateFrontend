import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import TakeNote from "./TakeNote";
import TakeNoteDetails from "./TakeNoteDetails";

const Notes = () => {
  const [isTakeNoteActive, setIsTakeNoteActive] = useState<Boolean>(true);

  const notes = useSelector((state: RootState) => state.allNotes.notes);

  const onTakeNoteClick = () => {
    setIsTakeNoteActive(false);
  };

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex justify-content-center px-3 mx-auto mt-4 mb-3"
        style={{ width: "35rem" }}
      >
        {isTakeNoteActive ? (
          <div onClick={() => onTakeNoteClick()}>
            <TakeNote />
          </div>
        ) : (
          <TakeNoteDetails setIsTakeNoteActive={setIsTakeNoteActive} />
        )}
      </div>
      <div className="d-flex flex-row flex-wrap">
        {/* {notes?.map((note) => {
          return (
            <div
              key={note.id}
              className="p-2 border m-2"
              style={{ backgroundColor: note.color }}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div>
                <strong>Images:</strong>
                <ul>
                  {note.images.map((image, index) => (
                    <li key={index}>{image}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Labels:</strong>
                <ul>
                  {note.labelSet.map((label) => (
                    <li key={label.id}>{label.labelName}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Collaborators:</strong>
                <ul>
                  {note.collaboratorList.map((collaborator) => (
                    <li key={collaborator.id}>{collaborator.email}</li>
                  ))}
                </ul>
              </div>
              <p>
                <strong>Pinned:</strong> {note.pinned ? "Yes" : "No"}
              </p>
              <p>
                <strong>Trashed:</strong> {note.trashed ? "Yes" : "No"}
              </p>
              <p>
                <strong>Archived:</strong> {note.archived ? "Yes" : "No"}
              </p>
              <p>
                <strong>Reminder:</strong> {note.reminder}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(note.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(note.updatedAt).toLocaleString()}
              </p>
            </div>
          );
        })} */}
      </div>
      <div className="d-flex flex-row flex-wrap d-none">Flex item 4</div>
    </div>
  );
};

export default Notes;
