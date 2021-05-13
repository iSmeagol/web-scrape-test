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

  // const fetchInnerText = (url, classes) => {
  //   const params = {
  //     url: url,
  //     selectors: classes,
  //   };
  //   console.log(params);
  //   return;
  //   axios.get(`${URL}/fetch/selector`, { params: params }).then((res) => {
  //     console.log(res.data);
  //   });
  // };

  return (
    <>
      <Content
        className="rendered_container"
        id="html__content"
        // style={{
        //   border: "1px solid red",
        //   minHeight: "300px",
        //   maxHeight: "700px",
        //   overflow: "scroll",
        // }}
        onMouseOver={(e) => {
          // console.log("className", e.target.className);
          // console.log("className", e.target.className);
          // // const regex = new RegExp("class=(.*?)", "g");
          // // const regex = new RegExp(/([^=,]*)=("[^"]*"|[^,"]*)/);
          // // const regex = /([^class=,]*)=("[^"]*"|[^,"]*)/g;
          // // const regex = new RegExp('class="(.*?)"', "g");
          // const regex = ' ([class=^"]*)="([^"]*)"';
          // const target = e.target.outerHTML;
          // // console.log("match", target.match(regex));
          // console.log(
          //   "match",
          //   Array.from(target.matchAll(regex), (m) => m[0])
          // );
          // // const res = target.matchAll(regex);
          // // const test = Array.from(target.matchAll(regex), (m) => m[0]);
          // // });
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
