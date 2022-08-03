import React, { useState, useEffect } from "react";
import Users from "./Components/Users/Users";
import Header from "./Components/Header/Header";
import "./App.module.css";
import AddUser from "./Components/Users/AddUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllUsers, SearchUserByUserName } from "./HttpServices/Users";

function App() {
  const [addUserShown, setAddUserIsShown] = useState(false);
  const [searchPostData, setSearchPostData] = useState({});
  const [userData, setUserData] = useState([]);

  const GetAllUsersByRequest = () => {
    GetAllUsers()
      .then(({ data: { data } }) => {
        setUserData(data);
      })
      .catch((err) => {
        console.log("error " + err.message);
      });
  };

  useEffect(() => {
    Object.keys(searchPostData).length === 6
      ? setUserData([searchPostData])
      : GetAllUsersByRequest();
  }, [searchPostData]);

  const toggleAddUser = () => {
    setAddUserIsShown(true);
  };

  const closeAddUser = () => {
    setAddUserIsShown(false);
    console.log("closeAddUser");
  };

  const handleSearchSubmit = (e) => {
    SearchUserByUserName(e)
      .then(({ data: { data } }) => {
        setSearchPostData(data);
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <ToastContainer position="bottom-center" />
      {addUserShown && (
        <AddUser
          triggerState={GetAllUsersByRequest}
          onHideAddUser={closeAddUser}
        />
      )}
      <Header
        onShowAddUser={toggleAddUser}
        onSearchOnSubmit={handleSearchSubmit}
      />
      <Users triggerState={GetAllUsersByRequest} user={userData} />
    </div>
  );
}

export default App;
