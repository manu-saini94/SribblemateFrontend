import { WithAuthProps } from "authtypes";
import React, { ComponentType } from "react";
import Auth from "./Auth";

function withAuth<T extends WithAuthProps>(WrappedComponent: ComponentType<T>) {
  return (props: T) => (
    <Auth>
      <WrappedComponent {...props} />
    </Auth>
  );
}

export default withAuth;
