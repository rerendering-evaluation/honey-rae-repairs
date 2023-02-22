import { useEffect, useState } from "react"
import { getAllEmployees, getEmployeeTickets } from "../ApiManager"
import { EmployeeTicket } from "./EmployeeTicket"
import "./Tickets.css"

export const EmployeeTicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)

    const getAllTickets = () => {
        return getEmployeeTickets()
                .then((data) => {
                    setTickets(data)
                })
    }

    useEffect(
        () => {
            getAllTickets()

            getAllEmployees()
                .then((data) => {
                    setEmployees(data)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [ searchTermState ]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            setFiltered(tickets)
        },
        [tickets]
    )

    return <>
        <button onClick={() => setEmergency(true)}>Emergency Only</button>
        <button onClick={() => setEmergency(false)}>Show All</button>
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(ticket => <EmployeeTicket 
                    key={ticket.id}
                    ticketObject={ticket} 
                    employees={employees} 
                    getAllTickets={getAllTickets}/>)
            }
        </article>
    </>
}