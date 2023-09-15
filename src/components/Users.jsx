import React from 'react';
import User from './User';
import UserConsumer from '../context';

const Users = () => {
    return (
        <UserConsumer>
            {
                value => {
                    const { users } = value;
                    return (
                        <div className="users">
                            {
                                users.map((user, idx) => (
                                    <User key={idx} id={idx + 1} user={user} />
                                ))
                            }
                        </div>
                    )
                }
            }
        </UserConsumer>
    );
}

export default Users;