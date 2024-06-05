import { memo } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerDetail } from "../ApiManager";
export const CustomerDetails = memo(() => {
  const {
    customerId
  } = useParams();
  const [customer, updateCustomer] = useState({});
  useEffect(() => {
    getCustomerDetail(customerId).then(data => {
      const singleCustomer = data[0];
      updateCustomer(singleCustomer);
    });
  }, [customerId]);
  return <section className="customer">
            <header className="customer__header">{customer?.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <footer className="customer__footer">Phone number: {customer.phoneNumber}</footer>
        </section>;
});