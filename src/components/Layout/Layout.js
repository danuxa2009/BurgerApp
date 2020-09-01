import React from "react";

import clasess from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <div>Toolbar, SideDrawer, BackDrop</div>
      <main className={clasess.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
