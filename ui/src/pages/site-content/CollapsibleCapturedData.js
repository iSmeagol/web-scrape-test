import React, { useState, useEffect } from "react";
import { Collapse, Table } from "antd";
import ListCaptureData from "components/ListCaptureData";

const { Panel } = Collapse;
const CollapsibleCapturedData = ({ capturedData, setCapturedData }) => {
  return (
    <Collapse style={{ width: "100%" }} expandIconPosition="right">
      <Panel header="Captured Data" key="1">
        {/* {JSON.stringify(capturedData)} */}
        {capturedData.map((obj) => (
          <ListCaptureData key={obj.name} title={obj.title} data={obj.data} />
        ))}
      </Panel>
    </Collapse>
  );
};

export default CollapsibleCapturedData;
