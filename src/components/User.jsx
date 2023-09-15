import React, { useState } from 'react';
import UserConsumer from '../context';

const User = ({ user, id }) => {
    const [visible, setVisible] = useState(false);

    const changeVisiblity = () => setVisible(!visible);

    const deleteUser = (dispatch, id) => dispatch({ type: "delete_user", payload: id });

    return (
        <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className="user">
                            <div className="image">
                                <img src={user.picture.large} alt="#"
                                    onClick={() => changeVisiblity()} />
                                <i className="fa-solid fa-trash" id="trash"
                                    onClick={() => deleteUser(dispatch, user.login.uuid)}></i>
                                <span id="id">{id}</span>
                            </div>
                            {
                                visible ? <div className="user-info" >
                                    <h3>{user.name.first + " " + user.name.last}</h3>
                                    <p className="lacation">{user.location.country + ", "
                                        + user.location.city}</p>
                                    <hr />
                                    <p className="user-detail">{"Phone: " + user.phone}</p>
                                    <p className="user-detail">{"Birth Date: "
                                        + user.dob.date.slice(0, 10) + " | Age: "
                                        + user.dob.age}</p>
                                    <p className="user-detail">Email: {user.email}</p>
                                    <p className="user-detail">{"Registered Date: "
                                        + user.registered.date.slice(0, 10)
                                        + " | Registered Age:"
                                        + user.registered.age}</p>
                                </div> : null
                            }
                        </div>
                    )
                }
            }
        </UserConsumer>
    )
}

export default User;