export const graphqlQuery = `query{
    dataLoadStats {
      items {
        source_table
        facet
        daily_counts
        date
      }
    }
  }`;

export async function callGraphqlAPI(accessToken, query = null, variables = null) {
    const headers = new Headers();

    if (!query) {
        query = graphqlQuery;
    }
    const bearer = `Bearer ${accessToken}`;

    const graphqlEndpoint = "https://api.fabric.microsoft.com/v1/workspaces/5539d978-183f-4a63-a6fb-1b35fa3985ab/graphqlapis/2a928382-baa9-47e2-8675-5600e5f8795a/graphql";

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: graphqlQuery
        })
    };

    return fetch(graphConfig.graphqlEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}