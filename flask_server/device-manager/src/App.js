import React, { useState } from "react";
import RegisterDevice from "./RegisterDevice";
import ViewData from "./ViewData";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="container py-5">
      <h1 className="text-center text-dark mb-5">Device Manager</h1>
      {!isAdmin ? (
        <AdminLogin onLogin={setIsAdmin} />
      ) : (
        <div>
          <div className="row mb-5">
            <div className="col-md-6">
              <RegisterDevice />
            </div>
            <div className="col-md-6">
              <ViewData />
            </div>
          </div>
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}

export default App;
