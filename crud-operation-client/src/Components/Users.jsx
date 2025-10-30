import React from "react";
import { use } from "react";
import { useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  const [user, setUser] = useState({ name: "", email: "" });

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    //Save this user data to database by server;
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After saving user", data);

        if (data.insertedId) {
          //set users for showing on ui after getting user details from db
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);

          alert("Users Added Successfully");
          e.target.reset();
        }
      });
  };

  const handleDeleteUser = (id)=>{
   fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
   })
   .then(res=>res.json())
   .then(data=>{
    if(data.deletedCount){
        alert('Deleted Successfully')
        const remainingUsers = users.filter(suser=> suser._id !== id);
        setUsers(remainingUsers);
    }
   })
  }

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter name"
        />
        <br />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
        />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <p>__________________________</p>
      <div>
        {users.map((suser) => (
          <p key={suser._id}>
            {" "}
            {suser.name} - {suser.email} <button onClick={()=> handleDeleteUser(suser._id)} >X</button>
            <button>Update</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
