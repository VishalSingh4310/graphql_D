import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, CREATE_LIKE } from "../graohql";
import DeleteAlert from "./DeleteAlert";
import styled from "styled-components";
import { Heart, ChatLeft, HeartFill, TrashFill } from "@styled-icons/bootstrap";
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
const RedTrash = styled(TrashFill)`
  height: 0.8rem;
  margin-right: 0.5rem;
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
      <div className="block text-left flex flex-col items-start  h-full  relative hover-trigger">
        <img
          className="w-full h-56 object-cover rounded-xl relative "
          src={imgUrl}
          alt="img"
        />
        <div className="flex justify-between w-full">
          <div>
            <div className="flex items-start mt-2">
              <img
                className="w-6 h-6 object-cover rounded-full mt-1 "
                alt="user"
                src="https://images.unsplash.com/photo-1616169443520-85e1c9fc6032?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              />
              <div>
                <h1 className="font-medium text-md ml-4">{name}</h1>
                <p className="ml-4 mb-2 text-sm text-gray-600">{caption}</p>
              </div>
            </div>
          </div>
          <div className=" mt-4 pb-4 text-capitalize text-gray-600 text-xs">
            <div className="w-full flex items-center justify-between pl-4">
              <div>
                <span
                  className="text-red-400  text-xs cursor-pointer"
                  onClick={LikePost}
                >
                  <RedHeart /> <strong>{likes}</strong>
                </span>
                {/* <span className="text-blue-400 text-xs cursor-pointer">
                  <RedChat /> <strong>{comments}</strong>
                </span> */}
              </div>
              {/* <span className="text-gray-900 text-sm cursor-pointer">
                <RedShare /> <strong>0</strong>
              </span> */}
            </div>
            {/* {new Date(time).toDateString()} */}
          </div>
        </div>
        <div
          onClick={openAlert}
          className="hover-target-1  absolute  text-center bg-red-50 text-red-500 rounded-sm  text-sm  font-medium p-1  cursor-pointer"
        >
          <RedTrash className="hover-target text-red-500" />
          Delete
        </div>
      </div>
    </div>
  );
};

export default Post;
