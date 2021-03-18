import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../graohql";
import DeleteAlert from "./DeleteAlert";

const User = ({ id, name, refetch }) => {
  const [open, setOpen] = React.useState(false);
  const [deleteUser, { error }] = useMutation(DELETE_USER);

  const deleteUserHandler = async () => {
    try {
      await deleteUser({
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

  const openAlert = () => {
    setOpen(!open);
  };

  return (
    <div className="block text-center flex flex-col items-center border pt-4">
      {open && (
        <DeleteAlert close={openAlert} del={deleteUserHandler} title="User" />
      )}
      <img
        className="w-16 h-16 rounded-full"
        src="https://via.placeholder.com/150"
        alt="img"
      />
      <h1 className="mt-4 font-medium text-xl mb-4">{name}</h1>
      <div
        onClick={openAlert}
        className="transition duration-200 ease-in-out bg-white text-white hover:bg-red-50 hover:text-red-500 transform translate-y-0 hover:-translate-y-0 rounded-sm  text-sm  font-semibold p-1 w-full cursor-pointer"
      >
        Delete
      </div>
    </div>
  );
};

export default User;
