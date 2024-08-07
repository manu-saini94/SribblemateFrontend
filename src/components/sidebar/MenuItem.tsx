import React from "react";
import { Link } from "react-router-dom";
import IconImage from "../global/IconImage";

const MenuItem = (props) => {
  const { itemProps, active, onMenuItemClick } = props;
  return (
    <Link to={`${itemProps.path}`} style={{ textDecoration: "none" }}>
      <li
        className={`list-group-item list-group-item-action border-0 rounded-5 ${active} `}
        onClick={onMenuItemClick}
      >
        <div className="container text-center">
          <div className="row d-flex">
            <div className=" col-2 d-flex justify-content-sm-start">
              <IconImage x={0} y={0} src={itemProps.iconSrc} />
            </div>
            <div className="col-8 d-flex justify-content-start mx-3">
              <span className="">{itemProps.name}</span>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default MenuItem;
