import { useEffect, useState } from "react"
import { getCurrentCustomer, putUpdatedCustomerProfile } from "../ApiManager"

export const CustomerForm = () => {
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: ""
    })
    const [feedback, setFeedback] = useState("")

    useEffect(
        () => {
            getCurrentCustomer()
                .then(data => updateProfile(data[0]))
        },
        []
    )

    useEffect(
        () => {
            if (feedback !== "") {
                // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000);
            }
        },
        [feedback]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return putUpdatedCustomerProfile(profile)
            .then(() => setFeedback("Profile information successfully saved"))
    }

    return ( <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Edit Profile: </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number: </label>
                    <input type="tel"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}