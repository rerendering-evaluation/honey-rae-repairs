import { memo } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { CustomerDetails } from "../customers/CustomerDetails";
import { CustomerList } from "../customers/CustomerList";
import { EmployeeDetails } from "../employees/EmployeeDetails";
import { Employeelist } from "../employees/EmployeeList";
import { Profile } from "../profile/Profile";
import { TicketContainer } from "../tickets/EmployeeTicketContainer";
export const EmployeeViews = memo(() => {
  return <Routes>
            <Route path="/" element={<>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>}>

                <Route path="tickets" element={<TicketContainer />} />

                <Route path="employees" element={<Employeelist />} />

                <Route path="employees/:employeeId" element={<EmployeeDetails />} />

                <Route path="customers" element={<CustomerList />} />

                <Route path="customers/:customerId" element={<CustomerDetails />} />

                <Route path="profile" element={<Profile />} />
                
            </Route>
        </Routes>;
});