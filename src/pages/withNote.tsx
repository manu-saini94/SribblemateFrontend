import { CommonNoteProps } from "notetypes";
import React, { ComponentType } from "react";
import CommonNote from "./CommonNote";

function withNote<T extends CommonNoteProps | {}>(
  WrappedComponent: ComponentType<T>
) {
  return (props: T) => (
    <CommonNote>
      <WrappedComponent {...props} />
    </CommonNote>
  );
}

export default withNote;
