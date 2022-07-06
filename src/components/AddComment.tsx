import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import ButtonPurple from "./ButtonPurple";
import TextArea from "./TextArea";

const AddComment = ({
  addComment,
  error,
  value,
  setValue,
}: {
  addComment: (e: FormEvent, comment: string) => void;
  error: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <form className="bg-white py-6 px-9" onSubmit={(e) => addComment(e, value)}>
      <h2 className="font-bold text-light-accent text-lg pb-7">Add Comment</h2>
      <div className="">
        <TextArea
          onChange={(e) => setValue(e.target.value)}
          value={value}
          error={error}
          className="w-full"
          placeholder="Type your comment here"
        />
        <div className="flex justify-end mt-4">
          <ButtonPurple type="submit">Post Comment</ButtonPurple>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
