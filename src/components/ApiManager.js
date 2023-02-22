const localHoneyUser = localStorage.getItem("honey_user")
export const honeyUserObject = JSON.parse(localHoneyUser)

export const getAllCustomers = () => {
    return fetch("http://localhost:8088/users?isStaff=false")
        .then(res => res.json())
}

export const getCustomerDetail = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(res => res.json())
}

export const getAllEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=user")
        .then(res => res.json())
}

export const getEmployeeDetail = (employeeId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(res => res.json())
}

export const getCurrentCustomer = () => {
    return fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
        .then(res => res.json())
}

export const putUpdatedCustomerProfile = (profile) => {
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
}

export const getCurrentEmployee = () => {
    return fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
        .then(res => res.json())
}

export const putUpdatedEmployeeProfile = (profile) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
}

export const deleteCustomerTicket = (ticket) => {
    fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
        method: 'DELETE'
    })
}

export const getCustomerTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets`)
        .then(res => res.json())
}

export const postClaimedEmployeeTicket = (userEmployee, ticketObject) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            employeeId: userEmployee.id,
            serviceTicketId: ticketObject.id
        })
    })
        .then(response => response.json())
}

export const putClosedTicket = (ticketObject, closedTicket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(closedTicket)
    })
        .then(response => response.json())
}

export const getEmployeeTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then(res => res.json())
}

export const getTicketToEdit = (ticketId) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(res => res.json())
}

export const putEditedTicket = (ticket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(res => res.json())
}

export const postNewTicket = (newTicket) => {
    return fetch("http://localhost:8088/serviceTickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        })
            .then(res => res.json())
}