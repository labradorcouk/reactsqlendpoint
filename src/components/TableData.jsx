import React from "react";
 import ListGroup from 'react-bootstrap/ListGroup'; 
 import Table from 'react-bootstrap/Table';
 import { UsageBarChart } from './UsageBarChart'; // import the UsageBarChart component
 /**
  * Renders information about the user obtained from MS Graph 
  * @param props
  */
 export const TableData = (props) => {
  const stats = props?.graphqlData?.data?.permissionsTables?.items;
  return (
      <Table striped bordered hover responsive>
          <thead>
              <tr>
                  <th>Permission ID</th>
                  <th>User ID</th>
                  <th>User Email</th>
                  <th>Permission Info</th>
                  <th>Meter Master ID</th>
                  <th>Address Master ID</th>
                  <th>Meter No</th>
                  <th>Usage</th>
              </tr>
          </thead>
          <tbody>
              {stats?.map((item, i) => (
                  item.meterMaster.items.map((meterItem, j) => (
                      <tr key={`${i}-${j}`}>
                          <td>{item.permissionID}</td>
                          <td>{item.userID}</td>
                          <td>{item.userEmail}</td>
                          <td>{item.permissionInfo}</td>
                          <td>{meterItem.meterMasterId}</td>
                          <td>{meterItem.addressMasterId}</td>
                          <td>{meterItem.meterNo}</td>
                          <td>{meterItem.consumption_hh.items[0]?.usage}</td>
                      </tr>
                  ))
              ))}
          </tbody>
      </Table>
  );
};