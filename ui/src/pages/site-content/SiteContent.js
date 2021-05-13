import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useState } from "react";
// import parse from "html-react-parser";
import DrawerFetchData from "./DrawerFetchData";
import "./sitecontent.scss";

const SiteContent = ({
  content,
  classesState,
  setClassesState,
  urlState,
  setUrlState,
  onSearch,
  captureState,
  setCaptureState,
  capturedData,
  setCapturedData,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [targetClasses, setTargetClasses] = useState([]);
  const [selectedElementText, setSelectedElementText] = useState("");

  return (
    <>
      <Content
        className="rendered_container"
        id="html__content"
        onMouseOver={(e) => {
          // console.log(e.target);
        }}
        onClick={(e) => {
          e.preventDefault();

          console.log("target", e.target.tagName);
          console.log("nodeName", e.target.nodeName);
          console.log("nodeName", e.target.href);
          console.log("node attributes", e.target.attributes);

          const classes = e.target.className.split(" "); //convert to array

          console.log(classes);
          console.log(e.target);
          setTargetClasses(classes);

          if (captureState) {
            setSelectedElementText(e.target.innerText);
            //if capture listen
            setShowDrawer(true);
          }
          //check if there is a form action
          const formTarget = e.target.form;

          // console.log(e.target.getAttribute("type"));

          if (formTarget) {
            if (e.target.getAttribute("type") === "submit") {
              // console.log("submit");
              console.log("event form", e.target.form.getAttribute("action"));
              // e.target.form.children.forEach((element) => {
              //   console.log("element", element);
              // });
              console.log(e.target.form.elements);
              // const actionString = e.target.form.getAttribute("action");
              // const url = `${urlState}${actionString}`.replace("//", "/");
              // setUrlState(url);
              // onSearch();
            }
          }

          // setClassesState(classes);
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      >
        {/* {parse(content)} */}
      </Content>

      <DrawerFetchData
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        urlState={urlState}
        targetClasses={targetClasses}
        selectedElementText={selectedElementText}
        capturedData={capturedData}
        setCapturedData={setCapturedData}
      />
    </>
  );
};

export default SiteContent;
