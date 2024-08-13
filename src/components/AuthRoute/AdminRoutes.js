import React from "react";

const AdminRoutes = ({ children }) => {
  //get user from localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false;

  if (!isAdmin) return <h1>Access Denied, admin only</h1>;
  return <>{children}</>;
};

export default AdminRoutes;
