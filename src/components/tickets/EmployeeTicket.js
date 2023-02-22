import { honeyUserObject, postClaimedEmployeeTicket, putClosedTicket } from "../ApiManager"

export const EmployeeTicket = ({ ticketObject, employees, getAllTickets }) => {
    const userEmployee = employees.find(employee => employee.userId === honeyUserObject.id)
    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const claimTicket = () => {
        return <button onClick={
            () => {
                postClaimedEmployeeTicket(userEmployee, ticketObject)
                    .then(getAllTickets)
            }
        }>Claim</button>
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return putClosedTicket(ticketObject, copy)
            .then(getAllTickets)
    }

    const canClose = () => {
        if (userEmployee.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

    return (
        <section className="ticket" key={`ticket--${ticketObject.id}`}>
            <header className="ticket__header">Ticket {ticketObject.id}</header>
            <div>{ticketObject.description}</div>
            <div>Emergency: {ticketObject.emergency ? "🧨" : "No"}</div>
            <footer className="ticket__footer">
                {
                    ticketObject.employeeTickets.length
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : claimTicket()
                }
                {
                    canClose()
                }
            </footer>
        </section>
)
}