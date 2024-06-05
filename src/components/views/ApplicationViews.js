import { memo } from "react";
import { honeyUserObject } from "../ApiManager";
import { CustomerViews } from "./CustomerViews";
import { EmployeeViews } from "./EmployeeViews";
export const ApplicationViews = memo(() => {
  if (honeyUserObject.staff) {
    // Return employee views
    return <EmployeeViews />;
  } else {
    // Return customer views
    return <CustomerViews />;
  }
});