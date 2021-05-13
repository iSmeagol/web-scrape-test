import React, { useState } from "react";
import axios from "axios";
import {
  Layout,
  Input,
  Button,
  Space,
  Select,
  Switch,
  BackTop,
  Divider,
  Spin,
} from "antd";
import SiteContent from "pages/site-content/SiteContent";
import CollapsibleCapturedData from "pages/site-content/CollapsibleCapturedData";

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const URL = "http://localhost:5000";

const Main = () => {
  // "https://www.amazon.com/international-sales-offers/b/?ie=UTF8&node=15529609011&ref_=nav_cs_gb_intl_52df97a2eee74206a8343034e85cd058"
  // https://www.yell.com/ucs/UcsSearchAction.do?scrambleSeed=1385622960&keywords=accountants&location=United+Kingdom
  // https://www.yell.com/ucs/UcsSearchAction.do?scrambleSeed=1817584326&companyName=Accountants&location=LOndon
  const [urlState, setUrlState] = useState(
    "https://www.yell.com/ucs/UcsSearchAction.do?scrambleSeed=1817584326&companyName=Accountants&location=LOndon"
  );
  // const [urlActionState, setUrlActionState] = useState("");
  const [htmlState, setHtmlState] = useState("");
  const [classesState, setClassesState] = useState([]);
  const [capturedData, setCapturedData] = useState([]);
  const [captureState, setCaptureState] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const onSearch = (value) => {
    document.getElementById("html__content").innerHTML = "";
    setPageLoading(true); //loading the page
    let url = value;
    const params = {
      url: url,
    };
    axios.get(`${URL}/fetch`, { params: params }).then((res) => {
      setHtmlState(res.data);
      setPageLoading(false); //stop loading the page
      // document.getElementById("html__content").innerHTML = res.data;
    });
  };

  // const fetchInnerText = () => {
  //   if (classesState.length === 0) return true;
  //   const classes = classesState.map((c) => `.${c}`);
  //   // console.log(classes.join(","));
  //   const params = {
  //     url: urlState,
  //     selectors: classes.join(", "),
  //   };
  //   axios.get(`${URL}/fetch/selector`, { params: params }).then((res) => {
  //     console.log(res.data);
  //   });
  // };

  // const handleChange = (value) => {
  //   // console.log(`selected ${value}`);
  //   setClassesState(value);
  // };

  return (
    <>
      <Spin spinning={pageLoading} tip="Fetching website...">
        <Layout style={{ minHeight: "100vh" }}>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "30px" }}>
              <Space direction="vertical" style={{ minWidth: "100%" }}>
                <Search
                  placeholder="Enter url.."
                  value={urlState}
                  onSearch={onSearch}
                  onChange={(e) => setUrlState(e.target.value)}
                  enterButton
                />
                {/* {JSON.stringify(capturedData)} */}
                <Space>
                  <Switch
                    checkedChildren="Interact"
                    unCheckedChildren="Interact"
                    checked={captureState}
                    onChange={(value) => {
                      setCaptureState(value);
                    }}
                  />
                </Space>
                <SiteContent
                  content={htmlState}
                  classesState={classesState}
                  setClassesState={setClassesState}
                  urlState={urlState}
                  setUrlState={setUrlState}
                  onSearch={onSearch}
                  captureState={captureState}
                  setCaptureState={setCaptureState}
                  capturedData={capturedData}
                  setCapturedData={setCapturedData}
                />
              </Space>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
            <Divider />
            <Content
              style={{
                textAlign: "center",
                position: "sticky",
                bottom: "0",
                zIndex: 100,
              }}
            >
              <CollapsibleCapturedData
                capturedData={capturedData}
                setCapturedData={setCapturedData}
              />
            </Content>
          </Layout>
        </Layout>
        <BackTop />
      </Spin>
    </>
  );
};

export default Main;
