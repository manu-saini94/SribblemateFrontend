import React from "react";
import Avatar from "../../assets/avatar.svg";
import ListView from "../../assets/listview.svg";
import Settings from "../../assets/settings.svg";
import IconImage from "../global/IconImage";

const ViewSettingsAvatar = () => {
  const onPaletteIconClick = () => {};
  return (
    <div className="col-sm-4 d-flex justify-content-end px-1 py-1 ">
      {" "}
      <IconImage x={3} y={1} src={ListView} onClick={onPaletteIconClick} />
      <IconImage x={3} y={1} src={Settings} onClick={onPaletteIconClick} />
      <IconImage x={3} y={1} src={Avatar} onClick={onPaletteIconClick} />
    </div>
  );
};

export default ViewSettingsAvatar;
