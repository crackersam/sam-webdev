import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDocuments } from "../../features/admin/AdminSlice";
import ReactHtmlParser from "react-html-parser";
import draftToHtml from "draftjs-to-html";

const Documents = () => {
  const { documents } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocuments());
  }, []);

  return (
    <>
      {documents &&
        documents.map((docs, i) => {
          return (
            <div key={i}>
              <h2>{Object.keys(docs)[i]}</h2>

              {docs[Object.keys(docs)[i]].map((doc, j) => {
                return (
                  <React.Fragment key={j}>
                    <p key={j}>{doc.title}</p>
                    <article>
                      {ReactHtmlParser(
                        draftToHtml(JSON.parse(doc.body))
                      )}
                    </article>
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
    </>
  );
};

export default Documents;
