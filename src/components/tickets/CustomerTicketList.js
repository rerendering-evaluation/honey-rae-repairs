import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCustomerTickets, honeyUserObject } from "../ApiManager"
import { CustomerTicket } from "./CustomerTicket"
import "./Tickets.css"

export const CustomerTicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const getAllTickets = () => {
        return getCustomerTickets()
            .then((data) => {
                setTickets(data)
        })
    }

    useEffect(
        () => {
            getAllTickets()
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    return <>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
        <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
        <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(ticket => {
                    return <CustomerTicket ticketObj={ticket} getAllTickets={getAllTickets}/>
                })
            }
        </article>
    </>
}