import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser ={name, email};

     //send data to the server
     fetch(`http://localhost:3000/users${user._id}`,{
        method: 'PATCH',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
     })
     .then(res=> res.json())
     .then(data=>{
        if(data.modifiedCount){
            alert('User Details Updated');
        }
     })
  };
  return (
    <div>
      <h3>Update User</h3>
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          name="name"
          defaultValue={user.name}
        />
        <br />
        <input
          type="email"
          name="email"
          defaultValue={user.email}
        />
        <br />
        <input type="submit" value="Update User" />
      </form>
    </div>
  );
};

export default UpdateUser;
