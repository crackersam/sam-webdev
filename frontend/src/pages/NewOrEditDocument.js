import React, { useEffect } from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw } from "draft-js";
import "./../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDocument,
  getDocument,
  updateDocument,
} from "../features/documents/DocumentSlice";
import { useParams } from "react-router-dom";

const NewOrEditDocument = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = useState(
    EditorState.createEmpty()
  );
  const { document } = useSelector((state) => state.doc);
  const dispatch = useDispatch();
  const slug = useParams().slug;

  useEffect(() => {
    if (slug && !document) {
      dispatch(getDocument(slug));
    }
    if (document) {
      setTitle(document.title);
      setBody(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(document.body))
        )
      );
    }
  }, [slug, document, dispatch]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!slug) {
      const rawContentState = JSON.stringify(
        convertToRaw(body.getCurrentContent())
      );
      dispatch(saveDocument({ title, rawContentState }));
    } else {
      const rawContentState = JSON.stringify(
        convertToRaw(body.getCurrentContent())
      );
      dispatch(
        updateDocument({
          title,
          slug,
          rawContentState,
        })
      );
    }
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
