import React from "react";
import { List } from "antd";

const ListCaptureData = ({ title, data }) => {
  return (
    <List
      size="small"
      header={<div style={{ backgroundColor: "gray" }}>{title}</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      pagination={{
        onChange: (page) => {
          // console.log(page);
        },
        pageSize: 5,
      }}
    />
  );
};

export default ListCaptureData;
