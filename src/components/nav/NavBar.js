import { memo } from "react";
import { honeyUserObject } from "../ApiManager";
import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";
import "./NavBar.css";
export const NavBar = memo(() => {
  if (honeyUserObject.staff) {
    // Return employee views
    return <EmployeeNav />;
  } else {
    // Return customer views
    return <CustomerNav />;
  }
});