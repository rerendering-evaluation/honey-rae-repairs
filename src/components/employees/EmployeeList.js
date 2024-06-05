import { memo } from "react";
import { useEffect, useState } from "react";
import { getAllEmployees } from "../ApiManager";
import { Employee } from "./Employee";
import "./Employees.css";
export const Employeelist = memo(() => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmployees().then(employeeArray => setEmployees(employeeArray));
  }, []);
  return <article className="employees">
        {employees.map(employee => <Employee key={`employee--${employee.id}`} id={employee.id} fullName={employee.user.fullName} email={employee.user.email} />)}
    </article>;
});