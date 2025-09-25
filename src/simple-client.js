/**
 * The Graph Gateway API Client - Simplified for GitHub Copilot
 * Works with any valid subgraph deployment ID from The Graph Studio
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export class TheGraphGateway {
  constructor(apiKey = process.env.GATEWAY_API_KEY) {
    if (!apiKey) {
      throw new Error('🚨 API key required! Get one from https://thegraph.com/studio/');
    }
    this.apiKey = apiKey;
    this.gatewayUrl = 'https://gateway-arbitrum.network.thegraph.com/api';
  }

  /**
   * Query any subgraph by deployment ID
   * @param {string} deploymentId - The subgraph deployment ID or IPFS hash
   * @param {string} query - GraphQL query string
   * @param {Object} variables - Query variables
   */
  async query(deploymentId, query, variables = {}) {
    const url = `${this.gatewayUrl}/${this.apiKey}/subgraphs/id/${deploymentId}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${JSON.stringify(result)}`);
      }

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`);
      }

      return result;
      
    } catch (error) {
      throw new Error(`Query failed: ${error.message}`);
    }
  }

  /**
   * Test connection with a simple introspection query
   */
  async testConnection(deploymentId) {
    const query = `{
      __schema {
        queryType {
          name
        }
      }
    }`;
    
    return this.query(deploymentId, query);
  }
}