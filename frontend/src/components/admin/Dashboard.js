import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
