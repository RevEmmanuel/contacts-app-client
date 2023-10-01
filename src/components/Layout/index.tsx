import React from 'react';
import {Outlet} from "react-router-dom";

interface IProps {
}

function Layout(props: IProps) {
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default Layout;
