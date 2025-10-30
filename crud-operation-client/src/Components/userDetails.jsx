import React from 'react';

import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div>
            <h3>User Details</h3>
            <form action="">
                
            </form>
           
        </div>
    );
};

export default UserDetails;