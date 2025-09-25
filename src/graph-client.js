import fetch from 'node-fetch';

/**
 * The Graph Gateway API Client
 * Direct access to The Graph's decentralized network without MCP
 */
export class TheGraphClient {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('API key is required. Get one from https://thegraph.com/studio/');
    }
    this.apiKey = apiKey;
    this.gatewayUrl = 'https://gateway-arbitrum.network.thegraph.com/api';
  }

  /**
   * Execute a GraphQL query against a specific subgraph deployment
   * @param {string} deploymentId - The deployment ID (0x...) or subgraph ID
   * @param {string} query - GraphQL query string
   * @param {Object} variables - Query variables (optional)
   */
  async querySubgraph(deploymentId, query, variables = {}) {
    const url = `${this.gatewayUrl}/${this.apiKey}/subgraphs/id/${deploymentId}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Get subgraph metadata and schema information
   * @param {string} deploymentId - The deployment ID
   */
  async getSubgraphInfo(deploymentId) {
    // Query the network subgraph to get deployment info
    const networkSubgraphId = 'DZz4kDTdmzWLWsV373w2bSmoar3umKKH9y82SUKr5qmp';
    
    const query = `
      query GetDeploymentInfo($deploymentId: String!) {
        subgraphDeployment(id: $deploymentId) {
          id
          ipfsHash
          createdAt
          network
          schemaIpfsHash
          subgraphCount
          versions {
            subgraph {
              displayName
              description
              website
            }
          }
        }
      }
    `;

    return this.querySubgraph(networkSubgraphId, query, { deploymentId });
  }

  /**
   * Search for subgraphs by keyword
   * @param {string} searchText - Search term
   * @param {number} limit - Number of results (default: 10)
   */
  async searchSubgraphs(searchText, limit = 10) {
    // Use the public network subgraph endpoint
    const url = 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet';
    
    const query = `
      query SearchSubgraphs($searchText: String!, $limit: Int!) {
        subgraphs(
          where: { displayName_contains_nocase: $searchText, active: true }
          first: $limit
          orderBy: signalledTokens
          orderDirection: desc
        ) {
          id
          displayName
          description
          website
          currentVersion {
            id
            subgraphDeployment {
              id
              ipfsHash
              network
            }
          }
          signalledTokens
          createdAt
        }
      }
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { searchText, limit }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Get top subgraphs for a specific contract address
   * @param {string} contractAddress - The contract address
   * @param {string} network - Network name (e.g., 'mainnet', 'arbitrum-one')
   * @param {number} limit - Number of results (default: 5)
   */
  async getSubgraphsForContract(contractAddress, network, limit = 5) {
    const networkSubgraphId = 'DZz4kDTdmzWLWsV373w2bSmoar3umKKH9y82SUKr5qmp';
    
    const query = `
      query GetSubgraphsForContract($network: String!, $limit: Int!) {
        subgraphs(
          where: { 
            currentVersion_: { 
              subgraphDeployment_: { 
                network: $network 
              } 
            }
            active: true
          }
          first: $limit
          orderBy: signalledTokens
          orderDirection: desc
        ) {
          id
          displayName
          description
          currentVersion {
            id
            subgraphDeployment {
              id
              network
              ipfsHash
            }
          }
          signalledTokens
        }
      }
    `;

    return this.querySubgraph(networkSubgraphId, query, { network, limit });
  }

  /**
   * Get the GraphQL schema for a subgraph deployment
   * This is a simplified version - full schema introspection requires GraphQL introspection queries
   * @param {string} deploymentId - The deployment ID
   */
  async getSchema(deploymentId) {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          queryType { name }
          mutationType { name }
          subscriptionType { name }
          types {
            ...FullType
          }
          directives {
            name
            description
            locations
            args {
              ...InputValue
            }
          }
        }
      }

      fragment FullType on __Type {
        kind
        name
        description
        fields(includeDeprecated: true) {
          name
          description
          args {
            ...InputValue
          }
          type {
            ...TypeRef
          }
          isDeprecated
          deprecationReason
        }
        inputFields {
          ...InputValue
        }
        interfaces {
          ...TypeRef
        }
        enumValues(includeDeprecated: true) {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          ...TypeRef
        }
      }

      fragment InputValue on __InputValue {
        name
        description
        type { ...TypeRef }
        defaultValue
      }

      fragment TypeRef on __Type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
      }
    `;

    return this.querySubgraph(deploymentId, introspectionQuery);
  }
}