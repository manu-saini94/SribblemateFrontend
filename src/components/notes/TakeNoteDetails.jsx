import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ArchiveIcon from "../../assets/archive.svg";
import BellIcon from "../../assets/bell.svg";
import ColorPalleteIcon from "../../assets/colorpallete.svg";
import ImageIcon from "../../assets/image.svg";
import MoreIcon from "../../assets/more.svg";
import PinIcon from "../../assets/pin.svg";
import UnpinIcon from "../../assets/unpin.svg";
import IconImage from "../IconImage";
import ColorPalette from "./colorpalette/ColorPalette";

const TakeNoteDetails = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pin, setPin] = useState(false);
  const [archive, setArchive] = useState(false);
  const color = useSelector((state) => state.noteColor.color);
  const colorPaletteRef = useRef(null);
  const takeNoteDetailsRef = useRef(null);
  const [openPalette, setOpenPalette] = useState(false);

  const { setIsTakeNoteActive } = props;

  const onPaletteIconClick = () => {
    setOpenPalette(true);
  };
  const onPinClick = () => {
    setPin(!pin);
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };
  const onArchiveClick = () => {
    setArchive(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        colorPaletteRef.current &&
        !colorPaletteRef.current.contains(event.target)
      ) {
        setOpenPalette(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPaletteRef]);

  useEffect(() => {
    function handleClickOutsideNote(event) {
      if (
        takeNoteDetailsRef.current &&
        !takeNoteDetailsRef.current.contains(event.target)
      ) {
        setIsTakeNoteActive(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideNote);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNote);
    };
  }, [takeNoteDetailsRef]);

  return (
    <div
      className="card "
      style={{ height: "auto", backgroundColor: `${color}`, width: "35rem" }}
      ref={takeNoteDetailsRef}
    >
      <div className="card-body pb-2">
        <div className="d-flex flex-row ">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon1"
              style={{ backgroundColor: `${color}` }}
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>

        <div className="input-group mb-3">
          <textarea
            className="form-control"
            placeholder="Take a note..."
            aria-label="Take a note..."
            aria-describedby="basic-addon1"
            style={{
              backgroundColor: `${color}`,
              resize: "none",
              overflow: "hidden",
              minHeight: "auto",
            }}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <IconImage x={0} y={0} src={BellIcon} />

            <IconImage x={5} y={0} src={ImageIcon} />
            <IconImage
              x={0}
              y={0}
              src={ColorPalleteIcon}
              onClick={() => onPaletteIconClick()}
            />

            <IconImage
              x={5}
              y={0}
              src={ArchiveIcon}
              onClick={() => onArchiveClick()}
            />

            {pin ? (
              <IconImage
                x={0}
                y={0}
                src={UnpinIcon}
                onClick={() => onPinClick()}
              />
            ) : (
              <IconImage
                x={0}
                y={0}
                src={PinIcon}
                onClick={() => onPinClick()}
              />
            )}

            <IconImage x={5} y={0} src={MoreIcon} />
          </div>
          <div>
            <button type="button" className="btn btn-sm fw-medium">
              Save
            </button>
          </div>
        </div>
        {openPalette && (
          <div className="position-relative" ref={colorPaletteRef}>
            <ColorPalette />
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeNoteDetails;
