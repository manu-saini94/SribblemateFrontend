import React from "react";
import Avatar from "../../assets/avatar.svg";
import ListView from "../../assets/listview.svg";
import Settings from "../../assets/settings.svg";
import IconImage from "../IconImage";

const ViewSettingsAvatar = () => {
  return (
    <div className="col-sm-4 d-flex justify-content-end px-1 py-1 ">
      {" "}
      <IconImage x={3} y={1} src={ListView} />
      <IconImage x={3} y={1} src={Settings} />
      <IconImage x={3} y={1} src={Avatar} />
    </div>
  );
};

export default ViewSettingsAvatar;
