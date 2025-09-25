/**
 * The Graph Gateway API Client - Unified Implementation
 * Handles both subgraph IDs and deployment IDs with proper authentication
 * 
 * Authentication Patterns:
 * - Subgraph IDs: API key in URL path (/api/[key]/subgraphs/id/[id])
 * - Deployment IDs: Bearer token in header (Authorization: Bearer [key])
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
    this.gatewayUrl = 'https://gateway.thegraph.com/api';
  }

  /**
   * Query using subgraph ID (uses API key in URL)
   * @param {string} subgraphId - The subgraph ID (e.g., HMuAwu...)
   * @param {string} query - GraphQL query string
   * @param {Object} variables - Query variables
   */
  async query(subgraphId, query, variables = {}) {
    const url = `${this.gatewayUrl}/${this.apiKey}/subgraphs/id/${subgraphId}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
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
   * Query using deployment ID (uses Bearer authentication)
   * @param {string} deploymentId - The deployment ID (Qm... hash)
   * @param {string} query - GraphQL query string
   * @param {Object} variables - Query variables
   */
  async queryByDeployment(deploymentId, query, variables = {}) {
    const url = `${this.gatewayUrl}/deployments/id/${deploymentId}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
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
   * Auto-detect ID type and query appropriately
   * @param {string} id - Either subgraph ID or deployment ID
   * @param {string} query - GraphQL query string
   * @param {Object} variables - Query variables
   */
  async queryAuto(id, query, variables = {}) {
    // Deployment IDs start with 'Qm' and are longer
    if (id.startsWith('Qm') && id.length > 40) {
      console.log('🔍 Detected deployment ID, using deployments endpoint');
      return this.queryByDeployment(id, query, variables);
    } else {
      console.log('🔍 Detected subgraph ID, using subgraphs endpoint');
      return this.query(id, query, variables);
    }
  }

  /**
   * Test connection with a simple introspection query
   */
  async testConnection(id) {
    const query = `{
      __schema {
        queryType {
          name
        }
      }
    }`;
    
    return this.queryAuto(id, query);
  }

  /**
   * Get available entity types from a subgraph
   */
  async getEntityTypes(id) {
    const query = `{
      __schema {
        types(filter: { kind: OBJECT, name_not_in: ["Query", "Subscription"] }) {
          name
          description
        }
      }
    }`;
    
    const result = await this.queryAuto(id, query);
    return result.data.__schema.types;
  }
}