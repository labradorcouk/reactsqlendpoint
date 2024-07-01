import React from "react";
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */
export const ProfileData = (props) => {
  return (
    <div id="profile-div">
      <p>
        <strong>Name: </strong> {props.graphData.name}
      </p>
      <p>
        <strong>Email: </strong> {props.graphData.username}
      </p>
      <p>
        <strong>Id: </strong> {props.graphData.localAccountId}
      </p>
    </div>
  );
};