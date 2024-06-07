import { useRef } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { getAllEmployees, getEmployeeTickets } from "../ApiManager";
import { EmployeeTicket } from "./EmployeeTicket";
import "./Tickets.css";
export const EmployeeTicketList = ({
  searchTermState
}) => {
  const tickets = useRef([]);
  const [employees, setEmployees] = useState([]);
  const [filteredTickets, setFiltered] = useState([]);
  const emergency = useRef(false);
  const getAllTickets = useCallback(() => {
    return getEmployeeTickets().then(data => {
      tickets.current = data;
    });
  }, []);
  useEffect(() => {
    getAllTickets();
    getAllEmployees().then(data => {
      setEmployees(data);
    });
  }, [] // When this array is empty, you are observing initial component state
  );

  useEffect(() => {
    const searchedTickets = tickets.current.filter(ticket => {
      return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase());
    });
    setFiltered(searchedTickets);
  }, [searchTermState]);
  useEffect(() => {
    if (emergency.current) {
      const emergencyTickets = tickets.current.filter(ticket => ticket.emergency === true);
      setFiltered(emergencyTickets);
    } else {
      setFiltered(tickets.current);
    }
  }, [emergency.current]);
  useEffect(() => {
    setFiltered(tickets.current);
  }, [tickets.current]);
  return <>
        <button onClick={() => emergency.current = true}>Emergency Only</button>
        <button onClick={() => emergency.current = false}>Show All</button>
        <h2>List of Tickets</h2>

        <article className="tickets">
            {filteredTickets.map(ticket => <EmployeeTicket key={ticket.id} ticketObject={ticket} employees={employees} getAllTickets={getAllTickets} />)}
        </article>
    </>;
};