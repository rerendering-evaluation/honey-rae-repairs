import { useRef } from "react";
import { memo } from "react";
import { useEffect, useState } from "react";
import { getCurrentEmployee, putUpdatedEmployeeProfile } from "../ApiManager";
export const EmployeeForm = memo(() => {
  // TODO: Provide initial state for profile
  const profile = useRef({
    specialty: "",
    rate: 0,
    userId: 0
  });
  const [feedback, setFeedback] = useState("");

  // TODO: Get employee profile info from API and update state
  useEffect(() => {
    getCurrentEmployee().then(data => {
      const employeeObject = data[0];
      profile.current.value = employeeObject;
    });
  }, []);
  useEffect(() => {
    if (feedback !== "") {
      // Clear feedback to make entire element disappear after 3 seconds
      setTimeout(() => setFeedback(""), 3000);
    }
  }, [feedback]);
  const handleSaveButtonClick = event => {
    event.preventDefault();
    return putUpdatedEmployeeProfile(profile.current.value).then(() => {
      setFeedback("Employee profile successfully saved");
    });
  };
  return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Edit Profile:</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input required autoFocus type="text" className="form-control" ref={profile} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly rate:</label>
                    <input type="number" className="form-control" ref={profile} />
                </div>
            </fieldset>
            <button onClick={clickEvent => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>;
});