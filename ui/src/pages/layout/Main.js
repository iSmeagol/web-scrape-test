import React, { useState } from "react";
import axios from "axios";
import { Layout, Input, Button, Space } from "antd";
import SiteContent from "pages/site-content/SiteContent";

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const URL = "http://localhost:5000";

const Main = () => {
  const [urlState, setUrlState] = useState(
    "https://www.amazon.com/international-sales-offers/b/?ie=UTF8&node=15529609011&ref_=nav_cs_gb_intl_52df97a2eee74206a8343034e85cd058"
  );
  const [htmlState, setHtmlState] = useState("");
  const onSearch = (value) => {
    // console.log(value);
    setUrlState(value);
    const params = {
      url: value,
    };
    axios.get(`${URL}/fetch`, { params: params }).then((res) => {
      // console.log(res.data);
      // console.log(res.data);
      setHtmlState(res.data);
      // document.getElementById("html__content").innerHTML = res.data;
    });
  };
  return (
    <>
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
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    axios.get(`${URL}/screenshot`).then((res) => {
                      console.log(res.data);
                    });
                  }}
                >
                  Capture Screenshot
                </Button>
                <Button>Get Url</Button>
                <Button type="primary">Button</Button>
              </Space>
              <SiteContent content={htmlState} />
            </Space>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;
