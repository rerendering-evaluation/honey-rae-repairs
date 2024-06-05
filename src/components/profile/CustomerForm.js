import { useRef } from "react";
import { memo } from "react";
import { useEffect, useState } from "react";
import { getCurrentCustomer, putUpdatedCustomerProfile } from "../ApiManager";
export const CustomerForm = memo(() => {
  const profile = useRef({
    address: "",
    phoneNumber: ""
  });
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    getCurrentCustomer().then(data => profile.current = data[0]);
  }, []);
  useEffect(() => {
    if (feedback !== "") {
      // Clear feedback to make entire element disappear after 3 seconds
      setTimeout(() => setFeedback(""), 3000);
    }
  }, [feedback]);
  const handleSaveButtonClick = event => {
    event.preventDefault();
    return putUpdatedCustomerProfile(profile.value).then(() => setFeedback("Profile information successfully saved"));
  };
  return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Edit Profile: </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input required autoFocus type="text" className="form-control" value={profile.value.address} ref={dummy} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number: </label>
                    <input type="tel" className="form-control" value={profile.value.phoneNumber} ref={dummy} />
                </div>
            </fieldset>
            <button onClick={clickEvent => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>;
});