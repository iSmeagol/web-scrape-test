import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, notification, Space } from "antd";
import axios from "axios";

const { TextArea } = Input;

const URL = "http://localhost:5000";

const DrawerFetchData = ({
  showDrawer,
  setShowDrawer,
  urlState,
  targetClasses,
  selectedElementText,
  capturedData,
  setCapturedData,
}) => {
  //   useEffect(() => {
  //     fetchInnerText(urlState, targetClasses);
  //   }, [targetClasses, urlState]);

  //   const [captureDataState, setCaptureDataState] = useState("");
  const [title, setTitle] = useState("");
  const [titleValidateStatus, setTitleValidateStatus] = useState("warning");

  const fetchAllInnerText = () => {
    if (targetClasses.length === 0) return;
    if (title === "") {
      setTitleValidateStatus("error");
      return;
    }
    const classes = targetClasses.map((c) => `.${c}`);
    const params = {
      url: urlState,
      selectors: classes.join(", "),
    };
    console.log(params);
    axios.get(`${URL}/fetch/selectors/all`, { params: params }).then((res) => {
      console.log(res.data);
      const dataObj = {
        title: title,
        data: res.data,
      };
      const dataExist =
        capturedData.filter(
          (o) => JSON.stringify(o.data) === JSON.stringify(res.data)
        ).length > 0
          ? true
          : false;

      console.log(
        dataExist,
        capturedData.filter((o) => o.data === dataObj.data)
      );

      if (!dataExist) setCapturedData((prev) => [...prev, dataObj]);
      else {
        notification["error"]({
          message: "Error!",
          description: "The data selected has been added already.",
        });
        console.log("data exist");
      }
    });
  };

  return (
    <>
      <Drawer
        title="Capture"
        placement="right"
        closable={true}
        width={520}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
      >
        <Space
          style={{ width: "100%", textAlign: "center" }}
          direction="vertical"
        >
          {/* {urlState} */}
          {JSON.stringify(targetClasses)}
          <Form.Item hasFeedback validateStatus={titleValidateStatus}>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setTitleValidateStatus("success");
                  setTitle(e.target.value);
                } else {
                  setTitleValidateStatus("error");
                }
              }}
            />
          </Form.Item>
          <TextArea rows={4} value={selectedElementText} readOnly />
          <Space size={8} align="center">
            <Button type="primary" onClick={fetchAllInnerText}>
              Capture Text
            </Button>
            <Button type="primary">Capture Target URL</Button>
            <Button type="primary">Capture Image</Button>
          </Space>
        </Space>
      </Drawer>
    </>
  );
};

export default DrawerFetchData;
