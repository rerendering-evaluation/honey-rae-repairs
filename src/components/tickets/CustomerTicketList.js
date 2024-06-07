import { useRef } from "react";
import { useCallback } from "react";
import { memo } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerTickets, honeyUserObject } from "../ApiManager";
import { CustomerTicket } from "./CustomerTicket";
import "./Tickets.css";
export const CustomerTicketList = memo(() => {
  const tickets = useRef([]);
  const [filteredTickets, setFiltered] = useState([]);
  const openOnly = useRef(false);
  const navigate = useNavigate();
  const getAllTickets = useCallback(() => {
    return getCustomerTickets().then(data => {
      tickets.current = data;
    });
  }, []);
  useEffect(() => {
    getAllTickets();
  }, [] // When this array is empty, you are observing initial component state
  );

  useEffect(() => {
    const myTickets = tickets.current.filter(ticket => ticket.userId === honeyUserObject.id);
    setFiltered(myTickets);
  }, [tickets.current]);
  useEffect(() => {
    if (openOnly.current) {
      const openTicketArray = tickets.current.filter(ticket => {
        return ticket.userId === honeyUserObject.id && ticket.dateCompleted === "";
      });
      setFiltered(openTicketArray);
    } else {
      const myTickets = tickets.current.filter(ticket => ticket.userId === honeyUserObject.id);
      setFiltered(myTickets);
    }
  }, [openOnly.current]);
  return <>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
        <button onClick={() => openOnly.current = true}>Open Tickets</button>
        <button onClick={() => openOnly.current = false}>All My Tickets</button>
        <h2>List of Tickets</h2>

        <article className="tickets">
            {filteredTickets.map(ticket => {
        return <CustomerTicket ticketObj={ticket} getAllTickets={getAllTickets} />;
      })}
        </article>
    </>;
});