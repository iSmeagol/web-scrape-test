import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useState, useRef } from "react";
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
  const [selectedElementAttributes, setSelectedElementAttributes] = useState(
    []
  );
  const [selectedElementType, setSelectedElementType] = useState([]);
  const [targetElement, setTargetElement] = useState(null);

  const contentOnMouseover = (e) => {
    //? if capture state is true and target is not the container of rendered page
    if (
      captureState &&
      !JSON.stringify(e.target.className).includes("rendered_container")
    )
      e.target.style.border = "2px dotted #E74D3D";
    // console.log(e.target.nodeName);
  };

  const contentOnMouseout = (e) => {
    console.log(showDrawer);
    //? if capture state is true and target is not the container of rendered page and drawer is false
    if (
      captureState &&
      !JSON.stringify(e.target.className).includes("rendered_container")
    )
      e.target.style.border = "none";

    if (
      captureState &&
      !JSON.stringify(e.target.className).includes("rendered_container") &&
      showDrawer
    )
      e.target.style.border = "2px dotted #E74D3D";
  };

  const contentOnClick = (e) => {
    e.preventDefault();

    //? if capture state is true and target is not the container of rendered page
    // if (
    //   captureState &&
    //   !JSON.stringify(e.target.className).includes("rendered_container")
    // ) {
    e.target.style.border = "none";
    // }

    console.log("target", e.target);
    console.log("parent", e.target.parentElement);
    console.log("child", e.target.children);
    // console.log("child", e.target.childNodes);
    setTargetElement(e.target);

    // console.log("target", e.target.tagName);
    // console.log("nodeName", e.target.nodeName);
    // console.log("nodeName", e.target.href);
    // console.log("node attributes", e.target.attributes);

    //! set selected element
    console.log("type", e.target.nodeName);
    setSelectedElementType(e.target.nodeName.toLowerCase());

    // ! get attributes of an element target
    const attributeNodeArray = [...e.target.attributes];
    const attrs = attributeNodeArray.reduce((attrs, attribute) => {
      attrs[attribute.name] = attribute.value;
      return attrs;
    }, {});
    console.log("attributes", attrs);
    setSelectedElementAttributes(attrs); //? set element attribute to pass on drawer
    // ! get attributes of an element target

    const classes = e.target.className.split(" "); //convert to array
    // console.log(classes);
    // console.log(e.target);

    setTargetClasses(classes);

    if (captureState) {
      setSelectedElementText(e.target.innerText);
      //if capture listen
      setShowDrawer(true);
    }
    //check if there is a form action
    // const formTarget = e.target.form;
    // if (formTarget) {
    //   if (e.target.getAttribute("type") === "submit") {
    //     console.log("event form", e.target.form.getAttribute("action"));
    //     // e.target.form.children.forEach((element) => {
    //     //   console.log("element", element);
    //     // });
    //     // console.log(e.target.form.elements);
    //   }
    // }

    // setClassesState(classes);
  };

  return (
    <>
      <Content
        className="rendered_container"
        id="html__content"
        onMouseOver={contentOnMouseover}
        onMouseOut={contentOnMouseout}
        onClick={contentOnClick}
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
        selectedElementAttributes={selectedElementAttributes}
        selectedElementType={selectedElementType}
        targetElement={targetElement}
        setTargetElement={setTargetElement}
      />
    </>
  );
};

export default SiteContent;
