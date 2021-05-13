import { Content } from "antd/lib/layout/layout";
import React from "react";
import parse from "html-react-parser";

const SiteContent = ({
  content,
  classesState,
  setClassesState,
  urlState,
  setUrlState,
  onSearch,
}) => {
  return (
    <Content
      className="class1 class2"
      id="html__content"
      style={{
        border: "1px solid red",
        minHeight: "300px",
        maxHeight: "700px",
        overflow: "scroll",
      }}
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

        // alert(e.target.href);
        // console.log("children", e.target);
        // console.log("event", e.target);
        // console.log("className", e.target.className);
        const classes = e.target.className.split(" ");
        setClassesState(classes);
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    >
      {/* {parse(content)} */}
    </Content>
  );
};

export default SiteContent;
