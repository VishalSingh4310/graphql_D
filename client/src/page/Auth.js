import React, { useState } from "react";
import {
  CheckCircleFill,
  ExclamationCircleFill,
} from "@styled-icons/bootstrap";
import styled from "styled-components";
import { CREATE_USER, GET_USER } from "../graohql/index";
import { useMutation, useQuery } from "@apollo/client";

const RedError = styled(ExclamationCircleFill)`
  color: red;
  height: 1.3rem;
  margin-right: 0.5rem;
`;

const RedCorrect = styled(CheckCircleFill)`
  color: green;
  height: 1.3rem;
  margin-right: 0.5rem;
`;

const Auth = ({ toggleScreen }) => {
  const [email, setEmail] = useState("");
  const [createUser, { error }] = useMutation(CREATE_USER);

  const [authToggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLabel, setPasswordlabel] = useState(false);
  const { error1, loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      email: email,
    },
  });
  const authHandler = async () => {
    try {
      if (email !== "" && name !== "") {
        if (authToggle) {
          try {
            const user = await createUser({
              variables: {
                name: name,
                email: email,
              },
            });
            if (user.data.createUser.id !== "") {
              toggleScreen(user.data.createUser.name);
            }
            if (error) {
              console.log(error);
              throw error;
            }
            // refetch();
          } catch (err) {
            console.log(err);
          }
        } else {
          refetch();
          if (data.user === null) {
            alert("User not found");
          }
          if (data.user.name !== "") {
            toggleScreen(data.user.name);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const keyHandler = (e) => {
    if (e.KeyCode === 13 || e.which == 13) {
      authHandler();
    }
  };

  return (
    <div className="flex w-full">
      <div className="bg-red-200 w-full h-screen main_auth">
        <img
          className=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
          alt="left"
        />
      </div>
      <div className="w-full h-full right_panel">
        <p className="py-4 text-2xl font-thin">
          <span
            onClick={() => setToggle(true)}
            className="cursor-pointer"
            style={{ fontWeight: authToggle ? "bold" : 400 }}
          >
            Sign up{" "}
          </span>
          <span>/ </span>
          <span
            onClick={() => setToggle(false)}
            className="cursor-pointer"
            style={{ fontWeight: authToggle ? 400 : "bold" }}
          >
            Login
          </span>
        </p>
        <div className="mt-8 grid items-center main_auth_2">
          <div className="pr-4">
            <p className="text-sm italic">Take a step to open the new door..</p>
            <button
              className="my-2 mt-4 w-full border-2  flex items-center text-center rounded-r  md:hidden"
              style={{ background: "#4081EC" }}
            >
              <img
                //   className=" w-full"
                style={{
                  height: "5vh",
                  objectFit: "cover",
                }}
                src="data:image/png;base64,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"
                alt="google"
              />
              <span className="text-center w-full text-white">
                {!authToggle ? "Login with google" : "Sign up with google"}
              </span>
            </button>
            <div className="mt-8">
              <div className="my-2 w-full p-2 border-2 rounded flex items-center bg-white">
                <input
                  className="w-full pr-2 outline-none"
                  placeholder="Enter you name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <RedError /> */}
                {/* <RedCorrect /> */}
              </div>
              <div className="my-2 w-full p-2 border-2 rounded flex items-center bg-white">
                <input
                  className="w-full pr-2 outline-none"
                  placeholder="Enter you email"
                  type="email"
                  value={email}
                  onKeyPress={keyHandler}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <RedError /> */}
                {/* <RedCorrect /> */}
              </div>
              {/* <div className="my-2 mt-4 w-full p-2 border-2 rounded flex items-center bg-white">
                <input
                  className="w-full pr-2 outline-none"
                  placeholder="Enter you password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={keyHandler}
                  onFocus={() => setPasswordlabel(true)}
                  onBlur={() => setPasswordlabel(false)}
                />

                {passwordLabel && password.length > 5 && <RedCorrect />}
              </div>
              {passwordLabel && password.length < 6 && (
                <p className="text-red-400 text-sm">
                  Password must have minimum 6 characters
                </p>
              )} */}
              <div>
                <button
                  className="my-2 mt-4 w-full p-2 border-2 rounded bg-green-500"
                  onClick={authHandler}
                >
                  {!authToggle ? "Login" : "Register"}
                </button>
              </div>
              <div className="flex justify-end">
                <p
                  className="hover:underline  text-sm text-gray-700 text-right cursor-pointer"
                  style={{ width: "fit-content" }}
                >
                  forget password?
                </p>
              </div>
              <div className="flex items-center">
                <span
                  className="w-full bg-gray-300 block my-4"
                  style={{ height: "0.05rem" }}
                ></span>
                <span className="mx-2">or</span>
                <span
                  className="w-full bg-gray-300 block my-4"
                  style={{ height: "0.05rem" }}
                ></span>
              </div>
              <div className="flex flex-col">
                {authToggle && (
                  <span className=" text-sm text-gray-700 text-left cursor-pointer">
                    Already have an account?{" "}
                    <span
                      className="text-blue-500 underline "
                      onClick={() => setToggle(false)}
                    >
                      login
                    </span>
                  </span>
                )}
                {!authToggle && (
                  <span className=" text-sm text-gray-700 text-left cursor-pointer">
                    Create an account?{" "}
                    <span
                      className="text-blue-500 underline "
                      onClick={() => setToggle(true)}
                    >
                      register
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="pl-4  h-full flex main_auth-1">
            <span
              className="my-4 block bg-gray-300"
              style={{ width: "0.05rem", height: "100%" }}
            ></span>
            <div className="pl-8 w-full flex flex-col items-center justify-center h-full pr-4">
              <button
                className="my-2 mt-4 w-full border-2  flex items-center text-center rounded-r"
                style={{ background: "#4081EC" }}
              >
                <img
                  //   className=" w-full"
                  style={{
                    height: "5vh",
                    objectFit: "cover",
                  }}
                  src="data:image/png;base64,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"
                  alt="google"
                />
                <span className="text-center w-full text-white">
                  {!authToggle ? "Login with google" : "Sign up with google"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
