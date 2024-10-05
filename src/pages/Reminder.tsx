import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import React from "react";
import { useSelector } from "react-redux";
import DisplayNotes from "../components/notes/shownotes/DisplayNotes";
import withNote from "../components/notes/withNote";
import { selectReminderNotes } from "../redux/selectors";

const Reminder = () => {
  const reminderNotes = useSelector(selectReminderNotes);
  return (
    <div className="container">
      {reminderNotes?.pinnedNotes.length > 0 && (
        <h6 className="pin-heading">PINNED</h6>
      )}
      <DisplayNotes notes={reminderNotes.pinnedNotes} />
      <br />

      {reminderNotes?.archivedNotes.length > 0 && (
        <h6 className="pin-heading">ARCHIVE</h6>
      )}
      <DisplayNotes notes={reminderNotes.archivedNotes} />
      <br />
      {reminderNotes?.othersNotes.length > 0 && (
        <h6 className="pin-heading">OTHERS</h6>
      )}
      <DisplayNotes notes={reminderNotes.othersNotes} />

      {reminderNotes?.pinnedNotes.length === 0 &&
        reminderNotes?.archivedNotes.length === 0 &&
        reminderNotes?.othersNotes.length === 0 && (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <NotificationsActiveOutlinedIcon
              className=""
              style={{ fontSize: "100px", color: "lightgray" }}
            />
            <span style={{ fontSize: "25px", color: "lightgray" }}>
              Notes with reminders appear here
            </span>
          </div>
        )}
    </div>
  );
};

export default withNote(Reminder);
