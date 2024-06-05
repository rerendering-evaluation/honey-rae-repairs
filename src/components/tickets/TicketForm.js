import { useRef } from "react";
import { memo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { honeyUserObject, postNewTicket } from "../ApiManager";
export const TicketForm = memo(() => {
  /*
      TODO: Add the correct default properties to the
      initial state object
  */
  const ticket = useRef({
    description: "",
    emergency: false
  });
  /*
      TODO: Use the useNavigation() hook so you can redirect
      the user to the ticket list
  */
  const navigate = useNavigate();
  const handleSaveButtonClick = event => {
    event.preventDefault();

    // TODO: Create the object to be saved to the API
    /* 
    {
        "it": 2,
        "userId": 3,
        "description": "It is true to gain, but it is as if one were born blind. Modes are the most responsibilities. Or at least the fault. Let us accuse those who abandon pain."
        "emergency": true,
        "dateCompleted": ""
    }
    */
    const ticketToSendToAPI = {
      userId: honeyUserObject.id,
      description: ticket.value.description,
      emergency: ticket.value.emergency,
      dateCompleted: ""
    };

    // TODO: Perform the fetch() to POST the object to the API
    return postNewTicket(ticketToSendToAPI).then(() => navigate("/tickets"));
  };
  return <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input required autoFocus type="text" className="form-control" placeholder="Brief description of problem" value={ticket.value.description} ref={dummy} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox" value={ticket.value.emergency} ref={dummy} />
                </div>
            </fieldset>
            <button onClick={clickEvent => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Submit Ticket
            </button>
        </form>;
});