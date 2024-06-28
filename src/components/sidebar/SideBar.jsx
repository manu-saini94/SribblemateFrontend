import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArchiveIcon from "../../assets/archiveicon.svg";
import ReminderIcon from "../../assets/bellicon.svg";
import EditIcon from "../../assets/editicon.svg";
import NotesIcon from "../../assets/notesicon.svg";
import TrashIcon from "../../assets/trashicon.svg";

import MenuItem from "./MenuItem";

const menuList = [
  {
    name: "Notes",
    path: "note",
    iconSrc: NotesIcon,
  },
  {
    name: "Reminders",
    path: "reminder",
    iconSrc: ReminderIcon,
  },
  {
    name: "Edit labels",
    path: "edit",
    iconSrc: EditIcon,
  },
  {
    name: "Archive",
    path: "archive",
    iconSrc: ArchiveIcon,
  },
  {
    name: "Trash",
    path: "trash",
    iconSrc: TrashIcon,
  },
];

const SideBar = (props) => {
  const [active, setActive] = useState("Notes");

  const navigate = useNavigate();
  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const onMenuItemClick = (menuItem) => {
    console.log("event", menuItem.name);
    setActive(menuItem.name);
  };

  return (
    <div className="collapse collapse-horizontal show" id="collapseSideBar">
      <div
        className="card card-body border-0"
        style={{ minHeight: "100vh", width: "270px" }}
      >
        <ul className="list-group list-group-flush d-flex flex-column ">
          {menuList.map((menuItem) => {
            return (
              <MenuItem
                key={menuItem.name}
                itemProps={menuItem}
                onMenuItemClick={() => onMenuItemClick(menuItem)}
                onClick={() => handleMenuItemClick(menuItem.path)}
                active={
                  active === menuItem.name
                    ? "active custom-active-bg"
                    : "custom-hover-bg"
                }
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
