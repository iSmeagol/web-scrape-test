import { Content } from "antd/lib/layout/layout";
import React from "react";
import parse from "html-react-parser";

const SiteContent = ({ content }) => {
  return (
    <Content
      id="html__content"
      style={{
        border: "1px solid red",
        minHeight: "300px",
        maxHeight: "700px",
        overflow: "scroll",
      }}
      onMouseOver={(e) => {
        console.log(e.target);
        // const regex = new RegExp('"(.*?)"');
        const regex = new RegExp("class=(.*?)", "g");
        // const target = `asdad class="hello" asdsa sa name="world"`;
        const target = e.target.outerHTML;
        // console.log(e.target, e.target.outerHTML);
        const res = target.matchAll(regex);
        const test = Array.from(target.matchAll(regex), (m) => m[0]);
        // console.log("test", test);
        // res.forEach((data) => {
        //   console.log("matches", data);
        // });
      }}
    >
      {parse(content)}
    </Content>
  );
};

export default SiteContent;
