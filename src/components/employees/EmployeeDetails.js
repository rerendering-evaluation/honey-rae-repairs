import { memo } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeDetail } from "../ApiManager";
export const EmployeeDetails = memo(() => {
  const {
    employeeId
  } = useParams();
  const [employee, updateEmployee] = useState({});
  useEffect(() => {
    getEmployeeDetail(employeeId).then(data => {
      const singleEmployee = data[0];
      updateEmployee(singleEmployee);
    });
  }, [employeeId]);
  return <section className="employee">
        <header className="employee__header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Specialty: {employee?.specialty}</div>
        <div>Rate: {employee?.rate}</div>
        <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
    </section>;
});