/**
 * Test The Graph Gateway directly
 */

import dotenv from 'dotenv';
dotenv.config();

console.log('API Key loaded:', process.env.GATEWAY_API_KEY ? 'YES (length: ' + process.env.GATEWAY_API_KEY.length + ')' : 'NO');

import fetch from 'node-fetch';

const test = async () => {
  try {
    // Use the Gateway with a known Uniswap V3 subgraph ID
    const apiKey = process.env.GATEWAY_API_KEY;
    const subgraphId = '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYZ22YwKx9QqPWVTH7CZ'; // Uniswap V3 mainnet
    const url = `https://gateway-arbitrum.network.thegraph.com/api/${apiKey}/subgraphs/id/${subgraphId}`;
    
    const query = {
      query: `{
        pools(first: 3, orderBy: totalValueLockedUSD, orderDirection: desc) {
          id
          token0 {
            symbol
          }
          token1 {
            symbol
          }
          totalValueLockedUSD
        }
      }`
    };
    
    console.log('Making request to Gateway...');
    console.log('Subgraph ID:', subgraphId);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }
    
    const result = await response.json();
    console.log('Success! Response:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
};

test();