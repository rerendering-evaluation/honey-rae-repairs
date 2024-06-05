import { useRef } from "react";
import { memo } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketToEdit, putEditedTicket } from "../ApiManager";
export const TicketEdit = memo(() => {
  const ticket = useRef({
    description: "",
    emergency: false
  });
  const {
    ticketId
  } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getTicketToEdit(ticketId).then(data => ticket.current = data);
  }, [ticketId]);
  const handleSaveButtonClick = event => {
    event.preventDefault();
    return putEditedTicket(ticket.value).then(() => {
      ticket.current = ticket.current.value;
      navigate("/tickets");
    });
  };
  return <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input required autoFocus type="text" className="form-control" value={ticket.value.description} ref={dummy} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="emergency">Emergency:</label>
                    <input type="checkbox" checked={ticket.value.emergency} ref={dummy} />
                </div>
            </fieldset>
            <button onClick={clickEvent => handleSaveButtonClick(clickEvent)}>
                Update Ticket
            </button>
        </form>;
});