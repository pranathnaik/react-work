import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./AddUser.module.css";
import { toast } from "react-toastify";
import { SearchUserByUserName, UpdateUserData } from "../../HttpServices/Users";

function UpdateUser(props) {
  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    country: "",
  });

  useEffect(() => {
    SearchUserByUserName(props.username)
      .then((data) => {
        setUserData(data.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const HandleOnUpdateUser = (e) => {
    e.preventDefault();
    UpdateUserData(props.username, userData)
      .then(({ data }) => {
        props.onHideUpdateUser();
        toast.success(data.message);
        props.triggerState(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <Modal>
      <h1>Add User</h1>
      <form onSubmit={HandleOnUpdateUser} className={classes["form-group"]}>
        <div className={classes["form-input"]}>
          <label>Username</label>
          <input
            onChange={HandleInputChange}
            name="username"
            placeholder="username"
            value={userData.username}
          />
        </div>
        <div className={classes["form-input"]}>
          <label>Firstname</label>
          <input
            onChange={HandleInputChange}
            name="firstname"
            placeholder="Firstname"
            value={userData.firstname}
          />
        </div>
        <div className={classes["form-input"]}>
          <label>Lastname</label>
          <input
            onChange={HandleInputChange}
            name="lastname"
            placeholder="Lastname"
            value={userData.lastname}
          />
        </div>

        <div className={classes["form-input"]}>
          <label>Country</label>
          <input
            onChange={HandleInputChange}
            name="country"
            placeholder="Country"
            value={userData.country}
          />
        </div>
        <div className={classes["btn-box"]}>
          <button
            className={classes["btn-cancel"]}
            onClick={props.onHideUpdateUser}
          >
            Cancel
          </button>
          <button className={classes["btn-submit"]} type="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateUser;
