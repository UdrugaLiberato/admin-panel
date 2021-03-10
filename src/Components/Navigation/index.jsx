import React from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import {
  FaDyalog,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg1.jpg";
import { Link } from "react-router-dom";
import Switch from "react-switch";

const Navigation = ({
  collapsed,
  toggled,
  handleCollapsedChange,
  handleToggleSidebar,
}) => {
  return (
    <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Liberato Admin Panel
        </div>
        <div className="block">
          {" "}
          <Switch
            height={16}
            width={30}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={handleCollapsedChange}
            checked={collapsed}
            onColor="#219de9"
            offColor="#bbbbbb"
          />{" "}
          <span>Collapse</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}>
            Dashboard
            <Link to="/" />
          </MenuItem>
          <SubMenu
            defaultOpen={true}
            title="Map"
            icon={<FaMapMarkerAlt />}
            suffix={<span className="badge red">Liberato</span>}
          >
            <MenuItem>
              Locations <Link to="/locations" />
            </MenuItem>
            <MenuItem>
              Category
              <Link to="/categories" />
            </MenuItem>
            <MenuItem>
              Questions
              <Link to="/questions" />
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FaUsers />}>
            Users
            <Link to="/users" />
          </MenuItem>
          <MenuItem icon={<FaDyalog />}>
            Logout
            <Link to="/logout" />
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Navigation;
