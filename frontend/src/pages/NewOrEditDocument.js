import React, { useEffect } from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw } from "draft-js";
import "./../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useDispatch } from "react-redux";
import { saveDocument } from "../features/documents/DocumentSlice";

const NewOrEditDocument = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = useState(
    EditorState.createEmpty()
  );
  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    const rawContentState = JSON.stringify(
      convertToRaw(body.getCurrentContent())
    );
    dispatch(saveDocument({ title, rawContentState }));
  };

  return (
    <form onSubmit={handleSave}>
      <label htmlFor="title">Document Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <Editor
          toolbarStyle={{ border: "1px solid #ccc" }}
          editorStyle={{
            border: "1px solid #ccc",
            minHeight: "6rem",
            padding: "0 1rem",
          }}
          editorState={body}
          onEditorStateChange={(editorState) => {
            setBody(editorState);
          }}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default NewOrEditDocument;
