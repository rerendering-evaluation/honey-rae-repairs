import { useState } from "react"
import { EmployeeTicketList } from "./EmployeeTicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms} />
        <EmployeeTicketList searchTermState={searchTerms}/>
    </>
}