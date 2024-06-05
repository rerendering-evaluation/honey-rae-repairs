import { memo } from "react";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../ApiManager";
import { Customer } from "./Customer";
import "./Customers.css";
export const CustomerList = memo(() => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getAllCustomers().then(customers => setCustomers(customers));
  }, []);
  return <article className="customers">
        {customers.map(customer => <Customer key={`customer--${customer.id}`} id={customer.id} fullName={customer.fullName} email={customer.email} />)}
    </article>;
});