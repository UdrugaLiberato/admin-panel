import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import Navigation from "./Components/Navigation";
import ListLocations from "./Components/Locations";
import EditLocation from "./Components/Locations/edit";
import Logout from "./Components/Logout";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <Navigation
        collapsed={collapsed}
        toggled={toggled}
        handleCollapsedChange={handleCollapsedChange}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/locations" exact component={ListLocations} />
        <Route path="/locations/edit/:id" exact component={EditLocation} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    </div>
  );
};

export default App;
