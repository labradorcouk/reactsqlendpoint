import React, { useState, useEffect } from 'react';
 import { PageLayout } from './components/PageLayout';
 import { loginRequest, graphqlConfig } from './authConfig';
 import { ProfileData } from './components/ProfileData';
 import { TableData } from './components/TableData';
 import { callMsGraph } from './graph';
 import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
 import './App.css';
 import Button from 'react-bootstrap/Button';
 import Spinner from 'react-bootstrap/Spinner';

 import { PowerBIEmbed } from 'powerbi-client-react';
import * as powerbi from 'powerbi-client';

 /**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
 const ProfileContent = () => {
   const { instance, accounts } = useMsal();
   const [graphData, setGraphData] = useState(null);
   const [graphqlData, setGraphqlData] = useState(null);
   const [display, setDisplay] = useState(false);
   const userEmail = accounts[0].username;

   const [accountInfo, setAccountInfo] = useState(null);

    useEffect(() => {
        setAccountInfo(JSON.stringify(accounts[0], null, 2));
    }, [accounts]);

   function RequestGraphQL() {
        console.log(accounts[0]);
       // Silently acquires an access token which is then attached to a request for GraphQL data
       instance
           .acquireTokenSilent({
               ...loginRequest,
               account: accounts[0],
           })
           .then((response) => {
               callGraphQL(response.accessToken).then((response) => setGraphqlData(response));
           });
   }

 async function callGraphQL(accessToken) {
   setDisplay(true);
   const query = `query{
    permissionsTables(filter: { userEmail: { eq: "${userEmail}" } }) {
      items{
        permissionID
        userID
        userEmail
        permissionInfo
        meterMaster {
          items{
            meterMasterId
            addressMasterId
            meterNo
            consumption_hh {
              items{
                meterNo
                usage
              }
            }
          }
        }
      }
    }
  }`;
   fetch(graphqlConfig.graphqlEndpoint, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accessToken}`,
           },
           body: JSON.stringify({ 
               query: query
           })
       })
       .then((res) => res.json())
       .then((result) => {
        console.log(result); // Log the result to the console
        setGraphqlData(result);
    });
 }

 return (
    <>
        <h5 className="card-title">Welcome {accounts[0].name}</h5>
        <h6 className="card-title">{accounts[0].username}</h6>
        {!graphqlData && (
            <Button variant="primary" onClick={RequestGraphQL}>
                Query Fabric API for GraphQL Data 
                {display ? (
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                ) : null}
            </Button>
        )}
        {graphqlData && <TableData graphqlData={graphqlData} />}
    </>
);
 };

 /**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
 const MainContent = () => {
   return (
       <div className="App">
           <AuthenticatedTemplate>
        <ProfileContent />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h2>Report 1</h2>
            <iframe 
              width="400" 
              height="600" 
              src="https://app.powerbi.com/reportEmbed?reportId=4e28f675-bd56-48bd-9b0c-96c07a2b9bcb&autoAuth=true&ctid=8ce27197-1183-4f62-9cd9-88d9ab202b55" 
              frameborder="0" 
              allowFullScreen="true">
            </iframe>
          </div>

          <div>
            <h2>Report 2</h2>
            <iframe 
              width="400" 
              height="600" 
              src="https://app.powerbi.com/reportEmbed?reportId=8e8b9eda-e16d-43ab-99fb-1fcba8449f2c&autoAuth=true&ctid=8ce27197-1183-4f62-9cd9-88d9ab202b55" 
              frameborder="0" 
              allowFullScreen="true">
            </iframe>
          </div>

          <div>
              <h2>Report 3</h2>
              <iframe 
                width="800" 
                height="600" 
                src="https://app.powerbi.com/reportEmbed?reportId=c511d863-0980-4a44-bc99-0278f9f6bd3b&autoAuth=true&ctid=8ce27197-1183-4f62-9cd9-88d9ab202b55" 
                frameborder="0" 
                allowFullScreen="true">
              </iframe>
            </div>
        </div>
      </AuthenticatedTemplate>

           <UnauthenticatedTemplate>
               <h5>
                   <center>
                       Please sign-in to see your profile information.
                   </center>
               </h5>
           </UnauthenticatedTemplate>
       </div>
   );
 };


 export default function App() {
    return (
      <PageLayout>
        <center>
          <MainContent />
  
        </center>
      </PageLayout>
    );
  }