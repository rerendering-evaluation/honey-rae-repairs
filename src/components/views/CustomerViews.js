import { memo } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { TicketForm } from "../tickets/TicketForm";
import { CustomerTicketList } from "../tickets/CustomerTicketList";
import { Profile } from "../profile/Profile";
import { TicketEdit } from "../tickets/TicketEdit";
export const CustomerViews = memo(() => {
  return <Routes>
            <Route path="/" element={<>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>}>

                <Route path="tickets" element={<CustomerTicketList />} />
				
				<Route path="ticket/create" element={<TicketForm />} />

                <Route path="profile" element={<Profile />} />

                <Route path="tickets/:ticketId/edit" element={<TicketEdit />} />

            </Route>
        </Routes>;
});