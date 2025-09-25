/**
 * Utility functions for working with The Graph API
 * Compatible with GitHub Copilot in VS Code
 */

import { TheGraphClient } from './graph-client.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize client with API key from environment
const client = new TheGraphClient(process.env.GATEWAY_API_KEY);

/**
 * Common Uniswap V3 queries
 */
export const UniswapQueries = {
  // Top pools by TVL
  topPoolsByTVL: `
    query TopPoolsByTVL($limit: Int!) {
      pools(
        first: $limit
        orderBy: totalValueLockedUSD
        orderDirection: desc
        where: { totalValueLockedUSD_gt: "1000" }
      ) {
        id
        token0 {
          symbol
          name
        }
        token1 {
          symbol
          name
        }
        totalValueLockedUSD
        volumeUSD
        feeTier
      }
    }
  `,

  // Recent swaps
  recentSwaps: `
    query RecentSwaps($limit: Int!) {
      swaps(
        first: $limit
        orderBy: timestamp
        orderDirection: desc
      ) {
        id
        timestamp
        amount0
        amount1
        amountUSD
        pool {
          token0 {
            symbol
          }
          token1 {
            symbol
          }
        }
        transaction {
          id
        }
      }
    }
  `,

  // Token information
  tokenInfo: `
    query TokenInfo($tokenAddress: String!) {
      token(id: $tokenAddress) {
        id
        symbol
        name
        decimals
        totalSupply
        volume
        volumeUSD
        txCount
        poolCount
        derivedETH
      }
    }
  `
};

/**
 * Helper functions for common operations
 */
export const GraphHelpers = {
  /**
   * Search for Uniswap pools by token symbols
   */
  async findUniswapPools(token0Symbol, token1Symbol) {
    // Use the Gateway with the proper Uniswap V3 subgraph ID
    const uniswapV3SubgraphId = '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYZ22YwKx9QqPWVTH7CZ'; // Mainnet Uniswap V3
    
    const query = `
      query FindPools($token0: String!, $token1: String!) {
        pools(
          where: {
            or: [
              { 
                and: [
                  { token0_: { symbol_contains_nocase: $token0 } }
                  { token1_: { symbol_contains_nocase: $token1 } }
                ]
              }
              {
                and: [
                  { token0_: { symbol_contains_nocase: $token1 } }
                  { token1_: { symbol_contains_nocase: $token0 } }
                ]
              }
            ]
          }
        ) {
          id
          token0 {
            id
            symbol
            name
          }
          token1 {
            id
            symbol
            name
          }
          feeTier
          totalValueLockedUSD
          volumeUSD
        }
      }
    `;

    return client.querySubgraph(uniswapV3SubgraphId, query, {
      token0: token0Symbol,
      token1: token1Symbol
    });
  },

  /**
   * Get trending tokens by volume
   */
  async getTrendingTokens(limit = 10) {
    const uniswapV3SubgraphId = '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYZ22YwKx9QqPWVTH7CZ';
    
    return client.querySubgraph(uniswapV3SubgraphId, `
      query TrendingTokens($limit: Int!) {
        tokens(
          first: $limit
          orderBy: volumeUSD
          orderDirection: desc
          where: { volumeUSD_gt: "100000" }
        ) {
          id
          symbol
          name
          volumeUSD
          totalValueLockedUSD
          txCount
          derivedETH
        }
      }
    `, { limit });
  },

  /**
   * Get historical price data for a token
   */
  async getTokenPriceHistory(tokenAddress, days = 7) {
    const uniswapV3SubgraphId = '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYZ22YwKx9QqPWVTH7CZ';
    
    const timestamp24hAgo = Math.floor(Date.now() / 1000) - (days * 24 * 60 * 60);
    
    return client.querySubgraph(uniswapV3SubgraphId, `
      query TokenPriceHistory($tokenAddress: String!, $timestamp: Int!) {
        tokenDayDatas(
          where: { 
            token: $tokenAddress
            date_gt: $timestamp
          }
          orderBy: date
          orderDirection: desc
        ) {
          id
          date
          priceUSD
          volumeUSD
          totalValueLockedUSD
          token {
            symbol
            name
          }
        }
      }
    `, { tokenAddress: tokenAddress.toLowerCase(), timestamp: timestamp24hAgo });
  }
};

/**
 * Easy-to-use query functions
 */
export const QuickQueries = {
  /**
   * Search subgraphs by keyword
   */
  async search(keyword) {
    console.log(`🔍 Searching for subgraphs: "${keyword}"`);
    const result = await client.searchSubgraphs(keyword);
    console.log(`Found ${result.data.subgraphs.length} subgraphs`);
    return result;
  },

  /**
   * Get top Uniswap pools
   */
  async getTopUniswapPools(limit = 10) {
    const uniswapV3SubgraphId = '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYZ22YwKx9QqPWVTH7CZ';
    
    console.log(`📊 Getting top ${limit} Uniswap V3 pools...`);
    const result = await client.querySubgraph(
      uniswapV3SubgraphId,
      UniswapQueries.topPoolsByTVL,
      { limit }
    );
    
    if (result.data) {
      console.log(`✅ Found ${result.data.pools.length} pools`);
    }
    return result;
  },

  /**
   * Get recent swaps
   */
  async getRecentSwaps(limit = 10) {
    const uniswapV3SubgraphId = '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYZ22YwKx9QqPWVTH7CZ';
    
    console.log(`💱 Getting ${limit} recent swaps...`);
    const result = await client.querySubgraph(
      uniswapV3SubgraphId,
      UniswapQueries.recentSwaps,
      { limit }
    );
    
    if (result.data) {
      console.log(`✅ Found ${result.data.swaps.length} swaps`);
    }
    return result;
  }
};

// Export the client for advanced usage
export { client as TheGraphClient };