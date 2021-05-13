import React, { useState } from "react";
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
  selectedElementAttributes,
  selectedElementType,
}) => {
  const [title, setTitle] = useState("");
  const [titleValidateStatus, setTitleValidateStatus] = useState("warning");

  const addDataToList = (dataTitle, data) => {
    const dataObj = {
      title: dataTitle,
      data: data,
    };
    const dataExist =
      capturedData.filter(
        (o) => JSON.stringify(o.data) === JSON.stringify(data)
      ).length > 0
        ? true
        : false;

    // console.log(
    //   dataExist,
    //   capturedData.filter((o) => o.data === dataObj.data)
    // );

    if (!dataExist) {
      setCapturedData((prev) => [...prev, dataObj]);
      notification["success"]({
        message: "Success!",
        description: "Captured data has been added.",
      });
    } else {
      notification["error"]({
        message: "Error!",
        description: "Captured data has been added already.",
      });
      console.log("data exist");
    }
    setShowDrawer(false);
    setTitle("");
  };

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

      if (!dataExist) {
        setCapturedData((prev) => [...prev, dataObj]);
        notification["success"]({
          message: "Success!",
          description: "Captured data has been added.",
        });
      } else {
        notification["error"]({
          message: "Error!",
          description: "Captured data has been added already.",
        });
        console.log("data exist");
      }
      setShowDrawer(false);
      setTitle("");
    });
  };

  const fetchData = (selector, dataTitle, resultNeeded) => {
    const params = {
      url: urlState,
      selectors: selector,
      resultNeeded: resultNeeded,
    };
    axios.get(`${URL}/fetch/selectors/all`, { params: params }).then((res) => {
      // console.log(selector, res.data);
      addDataToList(dataTitle, res.data);
      setShowDrawer(false);
      setTitle("");
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
          {/* {JSON.stringify(targetClasses)} */}
          {JSON.stringify(selectedElementType)}
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
          <TextArea rows={8} value={selectedElementText} readOnly />
          <Space size={8} align="center">
            <Button type="primary" onClick={fetchAllInnerText}>
              Capture Text
            </Button>
            {selectedElementAttributes.href && (
              <Button
                type="primary"
                onClick={() => {
                  // console.log(JSON.stringify(selectedElementAttributes.class));
                  // return;
                  let selector = selectedElementType;
                  //if element have class
                  //if element have href
                  if (selectedElementAttributes.href) {
                    selector = `${selectedElementType}[href]`;
                    if (selectedElementAttributes.class) {
                      selector = selectedElementAttributes.class
                        .split(" ")
                        .map((c) => `.${c}`);
                      selector = `${selectedElementType}${selector.join("")}`;
                    }
                  }
                  const resultNeeded = "href";
                  // console.log(selector);
                  fetchData(selector, title, resultNeeded);
                }}
              >
                Capture Target URL
              </Button>
            )}
            <Button type="primary">Capture Image</Button>
          </Space>
        </Space>
      </Drawer>
    </>
  );
};

export default DrawerFetchData;
