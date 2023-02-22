import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTicketToEdit, putEditedTicket } from "../ApiManager"

export const TicketEdit = () => {
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false
    })
    const { ticketId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            getTicketToEdit(ticketId)
                .then(data => updateTicket(data))
        },
        [ticketId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return putEditedTicket(ticket)
            .then(() => {
                updateTicket(ticket)
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={ticket.description}
                        onChange={(evt) => {
                            const copy = {...ticket}
                            copy.description = evt.target.value
                            updateTicket(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="emergency">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket.emergency}
                        onChange={(evt) => {
                            const copy = {...ticket}
                            copy.emergency = evt.target.checked
                            updateTicket(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Update Ticket
            </button>
        </form>
    )
}