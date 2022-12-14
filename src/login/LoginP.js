import React, { useEffect, useState } from "react";
import axios from "axios";

export const LoginP = () => {
  const [user, setUser] = useState({ userName: "", password: "" });

  const onChangeSetUserName = (e) => {
    setUser({ ...user, userName: e.target.value });
  };

  const onChangeSetPassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const onSubmitCheckUser = (e) => {
    e.preventDefault();
    axios

      .post("http://localhost:8083/api/user/", {
        username: user.userName,
        password: user.password,
      })
      .then((resp) => {
        console.log("response du fetch ", resp);
        localStorage.setItem("token", resp.data.token); // stringify if object
      })
      .catch((e) => {
        console.log("erreur dans onSubmitCheckUser", e);
        console.log("e.response.status", e.response.status); // 403 => forbidden
        window.localStorage.setItem("token", "");
      });
  };

  return (
    <>
      <h2 className="loginDisplay"> Please log in :</h2>
      <form onSubmit={onSubmitCheckUser}>
        <label>
          <p>
            <strong>Username : </strong>
          </p>{" "}
          <input type="text" onChange={onChangeSetUserName} />
        </label>
        <label>
          <p>
            <strong>Password : </strong>
          </p>{" "}
          <input type="password" onChange={onChangeSetPassword} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};
