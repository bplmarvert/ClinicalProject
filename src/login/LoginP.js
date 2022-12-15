import React, { useState } from "react";
import axios from "axios";

export const LoginP = (props) => {
  const [user, setUser] = useState({ userName: "", password: "", token: "" });

  const onChangeSetUserName = (e) => {
    setUser({ ...user, userName: e.target.value });
  };

  const onChangeSetPassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const onSubmitCheckUser = (e) => {
    console.log(
      "window.localStorage.getItem(token)",
      localStorage.getItem("token")
    );
    e.preventDefault();
    axios
      .post(
        "http://localhost:8083/api/user/",
        {
          username: user.userName,
          password: user.password,
        },
        { headers: { token: window.localStorage.getItem("token") } } //en 3e argument, on peut définir le contenu du header
      )
      .then((resp) => {
        //console.log("response du fetch ", resp);
        localStorage.setItem("token", resp.data.token); // stringify if object
        if (resp.status === 200) {
          console.log("status = ", resp.status);
          props.setCurrentComponent("StudyList");

          //);
        }
        if (resp.status === 403) {
          alert("Login or password error");
        }
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
