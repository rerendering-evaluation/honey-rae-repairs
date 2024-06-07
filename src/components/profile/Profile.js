import { memo } from "react";
import { EmployeeForm } from "./EmployeeForm";
import { CustomerForm } from "./CustomerForm";
import { honeyUserObject } from "../ApiManager";
export const Profile = memo(() => {
  if (honeyUserObject.staff) {
    // Return employee edit profile form
    return <EmployeeForm />;
  } else {
    // Return customer edit profile form
    return <CustomerForm />;
  }
});