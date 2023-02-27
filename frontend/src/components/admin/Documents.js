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
        documents.map((doc, i) => {
          const userKey = Object.keys(doc)[0];
          return (
            <div key={i}>
              <h2>{userKey}</h2>
              {doc[userKey] &&
                doc[userKey].map((docItem, j) => {
                  return (
                    <React.Fragment key={j}>
                      <p>{docItem.title}</p>
                      <article>
                        {ReactHtmlParser(
                          draftToHtml(
                            JSON.parse(docItem.body)
                          )
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
