import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, CREATE_LIKE } from "../graohql";
import DeleteAlert from "./DeleteAlert";
import styled from "styled-components";
import { Heart, ChatLeft, HeartFill } from "@styled-icons/bootstrap";
import { LinkedinDimensions } from "@styled-icons/bootstrap/Linkedin";

const RedHeart = styled(Heart)`
  color: red;
  height: 1rem;
  margin-right: 0.5rem;
`;
const RedHeartFill = styled(HeartFill)`
  color: red;
  height: 1rem;
  margin-right: 0.5rem;
`;
const RedChat = styled(ChatLeft)`
  color: #8080fd;
  height: 1rem;
  margin-left: 0.5rem;
`;

const Post = ({
  name,
  imgUrl,
  time,
  id,
  refetch,
  likes,
  comments,
  caption,
  likeUsers,
}) => {
  const [open, setOpen] = React.useState(false);
  const [deletePost, { error }] = useMutation(DELETE_POST);
  const [createLike, { error1 }] = useMutation(CREATE_LIKE);

  const deletePostHandler = async () => {
    try {
      await deletePost({
        variables: {
          id: id,
        },
      });
      if (error) {
        console.log(error);
      }
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const LikePost = async () => {
    try {
      await createLike({
        variables: {
          userId: "604b7e8129eceed771df2983",
          postId: id,
        },
      });
      if (error1) {
        console.log(error1);
      }
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const openAlert = () => {
    setOpen(!open);
  };

  return (
    <div>
      {open && (
        <DeleteAlert close={openAlert} del={deletePostHandler} title="Post" />
      )}
      <div className="block text-center flex flex-col items-center  h-full hover:shadow-2xl rounded">
        <img className="w-full h-52 object-cover" src={imgUrl} alt="img" />
        <h1 className="mt-4 font-medium text-xl">{name}</h1>
        <p className="mb-2 text-sm">{caption}</p>
        <p className="pb-4 text-capitalize text-gray-600 text-xs italic">
          {new Date(time).toDateString()}
        </p>
        <div className="w-full flex items-center justify-between px-4">
          <div>
            <span
              className="text-red-400 mr-2 text-sm cursor-pointer"
              onClick={LikePost}
            >
              <RedHeart /> <strong>{likes}</strong>
            </span>
            <span className="text-blue-400 text-sm cursor-pointer">
              <RedChat /> <strong>{comments}</strong>
            </span>
          </div>
          <span className="text-gray-900 text-sm cursor-pointer">
            shares <strong>0</strong>
          </span>
        </div>
        <div
          onClick={openAlert}
          className="transition duration-200 ease-in-out bg-white text-white hover:bg-red-50 hover:text-red-500 transform translate-y-2 hover:-translate-y-0 rounded-sm  text-sm  font-medium p-1 w-full cursor-pointer"
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default Post;
