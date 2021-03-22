import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graohql";
import { GET_POSTS } from "../graohql";
import User from "./User";
import Post from "./Post";
import AddUser from "./AddUser";
import {
  PlusSquareDotted,
  ExclamationTriangleFill,
} from "@styled-icons/bootstrap";
import styled from "styled-components";
import { BallTriangle } from "svg-loaders-react";

const RedAdd = styled(PlusSquareDotted)`
  height: 2rem;
  margin-right: 0.5rem;
`;
const RedAddButton = styled(PlusSquareDotted)`
  height: 1rem;
  margin-right: 0.5rem;
`;
const RedAlert = styled(ExclamationTriangleFill)`
  height: 3rem;
  color: #cb0101;
  margin-right: 0.5rem;
`;

const AllUsers = ({ title, select, name, logout }) => {
  const [modalOpen, setModal] = React.useState(false);
  const { error, loading, data, refetch } = useQuery(
    title === "Posts" ? GET_POSTS : GET_USERS
  );
  console.log(title);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <BallTriangle style={{ stroke: "#F87171" }} />
      </div>
    );
  }
  console.log(data);
  if (error) {
    console.log(error.message);
    return (
      <div
        className="flex justify-center items-center flex-col"
        style={{ width: "100%", height: "100vh" }}
      >
        <>
          <RedAlert />
          <span>
            Server Error &#8203;
            <span className="text-red-700 italic">({error.message})</span>
          </span>
        </>
        <span className="mt-2">Please Check you internet connection.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between bg-red-100 p-4 px-8 mb-4 w-full">
        <h1
          className=" font-light text-2xl  bg-red-100 cursor-pointer"
          onClick={() => select()}
        >
          {title}
        </h1>
        <div className="flex items-center">
          <p onClick={() => logout()} className="mr-8 underline cursor-pointer">
            Logout
          </p>
          <AddUser title={title} refetch={refetch} />
        </div>
      </div>
      {title === "Posts" && (
        <div className="max-w-screen-2xl w-11/12 py-4 mb-4">
          <h1 className="text-3xl font-light">Hello {name}</h1>
          <p className="text-gray-400 mt-2">
            Do you already know what you design today?
          </p>
        </div>
      )}
      <div className=" w-11/12 grid grid-cols-1 gap-4  max-w-screen-2xl justify-center  sm:grid-cols-2 md:grid-cols-3 mb-8">
        {title !== "Posts" &&
          data.users.map((user) => (
            <User
              key={user.id}
              name={user.name}
              id={user.id}
              refetch={refetch}
            />
          ))}
        {title === "Posts" &&
          data.posts.map((post) => (
            <Post
              refetch={refetch}
              key={post.id}
              id={post.id}
              name={post.post_name}
              imgUrl={post.post_img}
              time={post.post_time}
              likes={post.likes.likeCount}
              caption={post.caption}
              comments={post.comments.commentCount}
              likeUsers={post.likes.likeUsers}
            />
          ))}
      </div>
      {title === "Posts" && data.posts.length == 0 && (
        <div className="flex items-center flex-col">
          <div
            className="mt-4 p-2 rounded flex items-center cursor-pointer"
            onClick={() => setModal(true)}
          >
            <RedAdd />{" "}
            <span className="hover:underline">
              try adding some memories which you want people to know
            </span>
            <AddUser
              title="Posts"
              refetch={refetch}
              onlyFunction={true}
              openModal={modalOpen}
              modalOperation={setModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;
