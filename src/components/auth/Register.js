import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export const Register = props => {
  const customer = useRef({
    email: "",
    fullName: "",
    isStaff: false
  });
  let navigate = useNavigate();
  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer.current.value)
    }).then(res => res.json()).then(createdUser => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem("honey_user", JSON.stringify({
          id: createdUser.id,
          staff: createdUser.isStaff
        }));
        navigate("/");
      }
    });
  };
  const handleRegister = e => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${customer.current.value.email}`).then(res => res.json()).then(response => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };
  const updateCustomer = evt => {
    const copy = {
      ...customer.current.value
    };
    copy[evt.target.id] = evt.target.value;
    customer.current.value = copy;
  };
  return <main style={{
    textAlign: "center"
  }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Honey Rae Repairs</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input ref={customer} type="text" id="fullName" className="form-control" placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input ref={customer} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input ref={customer} type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>;
};