import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST, CREATE_USER } from "../graohql";
import Modal from "./Modal";

const AddUser = ({
  title,
  refetch,
  onlyFunction,
  openModal,
  modalOperation,
}) => {
  const [createPost, { error }] = useMutation(CREATE_POST);
  const [createUser, { error2 }] = useMutation(CREATE_USER);
  const [open, setOpen] = React.useState(false);

  const addPost = async (img, name, caption) => {
    await createPost({
      variables: {
        post_img: img,
        post_name: name,
        caption: caption,
        post_time: new Date().toISOString(),
      },
    });
    if (error) {
      console.log(error);
    }
    await refetch();
  };

  const addUser = async (name, email) => {
    if (email !== "" && name !== "") {
      await createUser({
        variables: {
          name: name,
          email: email,
        },
      });
      if (error2) {
        console.log(error2);
      }
      refetch();
    } else {
      console.log("empty");
    }
  };

  React.useEffect(() => {
    console.log(openModal);
    if (openModal == true && open === false) {
      setOpen(true);
    }
  }, [openModal]);

  React.useEffect(() => {
    if (open === false && openModal === true) {
      modalOperation(false);
    }
  }, [open]);
  return (
    <>
      {onlyFunction !== true && (
        <div
          className="rounded-full w-4 h-4 flex justify-center items-center bg-white cursor-pointer"
          style={{ width: "40px", height: "40px" }}
        >
          <span className="text-3xl " onClick={() => setOpen(!open)}>
            +
          </span>
        </div>
      )}
      {open && (
        <Modal
          toggle={setOpen}
          addUser={title === "Posts" ? addPost : addUser}
          title={title}
        />
      )}
    </>
  );
};

export default AddUser;
