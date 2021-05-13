import React from "react";
import { Collapse } from "antd";
import ListCaptureData from "components/ListCaptureData";
import "./collapsiblecapturedata.scss";

const { Panel } = Collapse;
const CollapsibleCapturedData = ({ capturedData, setCapturedData }) => {
  return (
    <Collapse style={{ width: "100%" }} expandIconPosition="right">
      <Panel header="Captured Data" key="1">
        {/* {JSON.stringify(capturedData)} */}
        <div className="grid-container">
          {capturedData.map((obj) => (
            <ListCaptureData
              key={JSON.stringify(obj.title).replaceAll(" ", "_").toLowerCase()}
              title={obj.title}
              data={obj.data}
            />
          ))}
        </div>
      </Panel>
    </Collapse>
  );
};

export default CollapsibleCapturedData;
