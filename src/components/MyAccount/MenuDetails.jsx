import React from "react";
import ManageAccount from "./ManageAccount";
import ApplyJob from "./ApplyJob";
import MyResume from "./MyResume";
import ChangePassword from "./ChangePassword";

const MenuDetails = ({ tabMenu }) => {
  return (
    <div className="md:w-4/5 w-[90%] mx-auto space-y-5">
      {tabMenu === "Manage Acoount" ? (
        <ManageAccount />
      ) : tabMenu === "Applied Job" ? (
        <ApplyJob />
      ) : tabMenu === "My Resume" ? (
        <MyResume />
      ) : tabMenu === "Change Password" ? (
        <ChangePassword />
      ) : null}
    </div>
  );
};

export default MenuDetails;
