import React, { useState } from "react";
import classes from "./User.module.css";
import { DeleteUser } from "../../HttpServices/Users";
import UpdateUser from "./UpdateUser";

function Users({ user, triggerState }) {
  const [updateModal, setUpdateModal] = useState(false);
  const [username, setUsername] = useState("");
  function HandleOnDeleteUser(username) {
    DeleteUser(username)
      .then(() => {
        triggerState();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function hideUpdateModal() {
    setUpdateModal(false);
  }

  return (
    <>
      {updateModal && (
        <UpdateUser
          triggerState={triggerState}
          onHideUpdateUser={hideUpdateModal}
          username={username}
        />
      )}
      <div className={classes.card}>
        <table>
          <caption>User Details</caption>
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Country</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => {
              return (
                <tr key={user._id}>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Firstname">{user.firstname}</td>
                  <td data-label="Lastname">{user.lastname}</td>
                  <td data-label="Country">{user.country}</td>
                  <td data-label="Country">
                    <button
                      onClick={() => {
                        setUpdateModal(true);
                        setUsername(user.username);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td data-label="Country">
                    <button
                      onClick={() => {
                        HandleOnDeleteUser(user.username);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
