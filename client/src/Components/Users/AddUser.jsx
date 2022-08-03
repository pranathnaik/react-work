import React, { useState } from "react";
import { CreateUser } from "../../HttpServices/Users";
import Modal from "../UI/Modal";
import { toast } from "react-toastify";
import classes from "./AddUser.module.css";
import "react-toastify/dist/ReactToastify.css";
function AddUser(props) {
  const userObject = {
    username: "",
    firstname: "",
    lastname: "",
    country: "",
  };
  const [userData, setUserData] = useState(userObject);

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const HandleOnAddUser = (e) => {
    e.preventDefault();
    CreateUser(userData)
      .then(({ data }) => {
        props.onHideAddUser();
        props.triggerState();

        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <Modal>
      <h1>Add User</h1>
      <form onSubmit={HandleOnAddUser} className={classes["form-group"]}>
        <div className={classes["form-input"]}>
          <label>Username</label>
          <input
            onChange={HandleInputChange}
            name="username"
            placeholder="username"
          />
        </div>
        <div className={classes["form-input"]}>
          <label>Firstname</label>
          <input
            onChange={HandleInputChange}
            name="firstname"
            placeholder="Firstname"
          />
        </div>
        <div className={classes["form-input"]}>
          <label>Lastname</label>
          <input
            onChange={HandleInputChange}
            name="lastname"
            placeholder="Lastname"
          />
        </div>
        <div className={classes["form-input"]}>
          <label>Country</label>
          <input
            onChange={HandleInputChange}
            name="country"
            placeholder="Country"
          />
        </div>
        <div className={classes["btn-box"]}>
          <button
            className={classes["btn-cancel"]}
            onClick={props.onHideAddUser}
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

export default AddUser;
