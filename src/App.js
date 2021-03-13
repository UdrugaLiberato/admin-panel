import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import ListLocations from "./Components/Locations";
import EditLocation from "./Components/Locations/edit";
import Logout from "./Components/Logout";
import { getUserStatus } from "./context/user";
import Navigation from "./Components/Navigation";
import CreateLocation from "./Components/Locations/create";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const history = useHistory();
  const status = getUserStatus();
  const { pathname } = useLocation();
  useEffect(() => {
    if (status === false.toString()) {
      history.push("/");
    }
  }, []);
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      {pathname !== "/" && (
        <Navigation
          collapsed={collapsed}
          toggled={toggled}
          handleCollapsedChange={handleCollapsedChange}
          handleToggleSidebar={handleToggleSidebar}
        />
      )}
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/locations" exact component={ListLocations} />
        <Route path="/locations/edit/:id" exact component={EditLocation} />
        <Route path="/locations/new" exact component={CreateLocation} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    </div>
  );
};

export default App;
