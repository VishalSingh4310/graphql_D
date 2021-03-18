import React, { useState } from "react";

const Modal = ({ title, toggle, addUser }) => {
  const [imgInput, setImgInput] = useState("");
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const doneHandler = async () => {
    setLoading(true);
    if (title === "Posts") {
      if (image !== "" && name !== "" && caption !== "") {
        await addUser(image, name, caption);
        setName("");
        setCaption("");
        setImage("");
        toggle(false);
      }
    } else {
      if (imgInput !== "" && name !== "") await addUser(name, imgInput);
      setName("");
      setImgInput("");
      toggle(false);
    }
    setLoading(false);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Add {title === "Posts" ? "Post" : "User"}
                  </h3>
                  <div className="mt-2 w-full">
                    <p className="text-sm text-gray-800">
                      {title === "Posts" ? "Enter Post Image" : "Enter Email"}
                    </p>
                    {title !== "Posts" && (
                      <input
                        type="text"
                        className="border-2 w-full px-2 mb-2"
                        value={imgInput}
                        onChange={(e) => setImgInput(e.target.value)}
                      />
                    )}
                    {title === "Posts" && (
                      <input
                        type="file"
                        onChange={onImageChange}
                        className="filetype bg-white border"
                        id="group_image"
                        disabled={image !== ""}
                      />
                    )}
                    <p className="text-sm text-gray-800">
                      {title === "Posts" ? "Post Title" : "Enter Name"}
                    </p>
                    <input
                      type="text"
                      className="border-2 w-full px-2 mb-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    {title === "Posts" && (
                      <>
                        <p className="text-sm text-gray-800">
                          {title === "Posts" ? "Post Caption" : "Enter Name"}
                        </p>
                        <input
                          type="text"
                          className="border-2 w-full px-2 mb-2"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </>
                    )}
                    {title === "Posts" && (
                      <img
                        id="target"
                        src={
                          image === ""
                            ? "https://arcticstartup.com/wp-content/themes/15zine/library/images/placeholders/placeholder-759x500@2x.png"
                            : image
                        }
                        alt="wdc"
                        className="w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={doneHandler}
              >
                {loading ? "..." : "Post"}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => toggle(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
