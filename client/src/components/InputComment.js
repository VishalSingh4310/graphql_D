import React from "react";

const InputComment = () => {
  const [comment, setComment] = React.useState("");
  const commentHandler = () => {};
  return (
    <div>
      <input
        className="w-4/5 py-1 px-2"
        placeholder="Comment..."
        type="text"
        onChange={(e) => setComment(e)}
        value={comment}
      />
      <button className="w-1/5 bg-blue-300 p-2" onClick={commentHandler}>
        Comment
      </button>
    </div>
  );
};

export default InputComment;
