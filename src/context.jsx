import React, { Component } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "update_users":
            return {
                ...state,
                users: action.payload,
                all_users: action.payload
            }
        case "show_users":
            return {
                ...state,
                users: state.all_users
            }
        case "delete_user":
            return {
                ...state,
                users: state.users.filter(user => user.login.uuid !== action.payload),
                all_users: state.all_users.filter(user =>
                    user.login.uuid !== action.payload),
            }
        case "add_user":
            return {
                ...state,
                users: state.users.concat(action.payload),
                all_users: state.all_users.concat(action.payload)
            }
        case "gender":
            return {
                ...state,
                users: state.users.filter(user => user.gender === action.payload),
                all_users: state.users
            }
        case "country":
            return {
                ...state,
                users: state.users.filter(user =>
                    user.location.country.toLowerCase() === action.payload.toLowerCase()),
                all_users: state.users
            }
        case "age":
            return {
                ...state,
                users: state.users.filter(user =>
                    user.dob.age === Number(action.payload)),
                all_users: state.users
            }
        case "registerAge":
            return {
                ...state,
                users: state.users.filter(user =>
                    user.registered.age === Number(action.payload)),
                all_users: state.users
            }
        default:
            return state;
    }
}

export class UserProvider extends Component {
    state = {
        users: [],
        all_users: [],
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    }

    // axios api request
    getUsers = async (num) => {
        const url = `https://randomuser.me/api/?results=${num}`;
        const data = (await axios.get(url)).data.results;
        this.setState({
            ...this.state, users: data
        });
    }

    componentDidMount() {
        // default users number
        const num = 20;
        this.getUsers(num);
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;
export default UserConsumer;