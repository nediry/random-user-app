import React, { useState } from 'react';
import UserConsumer from '../context';
import axios from 'axios';

const Navbar = () => {
    
    const [number, setNumber] = useState(""),
        [user, setUser] = useState(""),
        [country, setCountry] = useState(""),
        [age, setAge] = useState(""),
        [registeredAge, setRegisteredAge] = useState(""),
        [female, setFemale] = useState(false),
        [male, setMale] = useState(false);

    // change input functions
    const changeInputNumber = (e) => setNumber(e.target.value);
    const changeInputUser = (e) => setUser(e.target.value);
    const changeInputCountry = (e) => setCountry(e.target.value);
    const changeInputAge = (e) => setAge(e.target.value);
    const changeInputRegisteredAge = (e) => setRegisteredAge(e.target.value);

    const getUrl = (num) => `https://randomuser.me/api/?results=${num}`;

    // submit event functions
    const inputUpdateSubmit = async (e, dispatch) => {
        e.preventDefault();
        const data = (await axios.get(getUrl(number))).data.results;

        // update users function
        dispatch({ type: "update_users", payload: data });
        // update text box
        setNumber("");
    }

    const inputAddSubmit = async (e, dispatch) => {
        e.preventDefault();
        // get data of new users
        const data = (await axios.get(getUrl(user))).data.results;

        // add user or users function
        dispatch({ type: "add_user", payload: data });
        setUser("");
    }

    // filters by country when input country box submits
    const inputCountrySubmit = (e, dispatch) => {
        e.preventDefault();
        dispatch({ type: "country", payload: country });
        setCountry("");
    }
    
    // filters by age when input age box submits
    const inputAgeSubmit = (e, dispatch) => {
        e.preventDefault();
        dispatch({ type: "age", payload: age });
        setAge("");
    }
    
    // filters by registered age when input registered age box submits
    const inputRegisteredAgeSubmit = (e, dispatch) => {
        e.preventDefault();
        dispatch({ type: "registerAge", payload: registeredAge });
        setAge("");
    }

    // filters by gender when checkbox changes
    const changeChecked = (e, gender, dispatch) => {

        // check other checkbox active or not
        if (gender === "female") {
            if (male === true) {
                setMale(false);
                dispatch({ type: "show_users", payload: "" });
            }
            setFemale(!female);
        } else {
            if (female === true) {
                setFemale(false);
                dispatch({ type: "show_users", payload: "" });
            }
            setMale(!male);
        }

        // gender filter funciton
        if (e.target.checked) {
            dispatch({ type: "gender", payload: gender });
        } else {
            dispatch({ type: "show_users", payload: "" });
        }
    }

    // show users button event
    const showUsers = (dispatch) => {
        dispatch({ type: "show_users", payload: "" });

        // do not check when the checkbox is checked
        setFemale(false);
        setMale(false);
    }

    return (
        <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className="navbar">
                            <div className="show-users">
                                <button onClick={() => showUsers(dispatch)} >Show users</button>
                            </div>

                            <hr />

                            <form className="update-users" onSubmit={e => inputUpdateSubmit(e, dispatch)} >
                                <label htmlFor="number">Update users</label>
                                <input type="text" name="number" placeholder="Enter number"
                                    value={number} onChange={e => changeInputNumber(e)} />
                            </form>

                            <hr />

                            <form className="add-user" onSubmit={e => inputAddSubmit(e, dispatch)} >
                                <label htmlFor="user">Add user</label>
                                <input type="text" name="user" placeholder="Enter number"
                                    value={user} onChange={e => changeInputUser(e)} />
                            </form>

                            <hr />

                            <div id="female">
                                <label htmlFor="female">Female</label>
                                <input type="checkbox" name="female" className="female" checked={female}
                                    onChange={(e) => changeChecked(e, "female", dispatch)} />
                            </div>
                            <div id="male">
                                <label htmlFor="male">Male</label>
                                <input type="checkbox" name="male" className="male" checked={male}
                                    onChange={(e) => changeChecked(e, "male", dispatch)} />
                            </div>

                            <hr />

                            <form className="country" onSubmit={e => inputCountrySubmit(e, dispatch)} >
                                <label htmlFor="country">User's country</label>
                                <input type="text" name="country" placeholder="Enter country"
                                    value={country} onChange={e => changeInputCountry(e)} />
                            </form>

                            <hr />

                            <form className="age" onSubmit={e => inputAgeSubmit(e, dispatch)} >
                                <label htmlFor="age">User's age</label>
                                <input type="text" name="age" placeholder="Enter age"
                                    value={age} onChange={e => changeInputAge(e)} />
                            </form>

                            <hr />

                            <form className="registered" onSubmit={e => inputRegisteredAgeSubmit(e, dispatch)} >
                                <label htmlFor="registeredAge">Registered age</label>
                                <input type="text" name="registeredAge" placeholder="Enter age"
                                    value={registeredAge} onChange={e => changeInputRegisteredAge(e)} />
                            </form>

                            <hr />
                        </div>
                    )
                }
            }
        </UserConsumer>
    )
}

export default Navbar;