/**
 * Interactive playground for experimenting with The Graph API
 * Run with: npm run dev (auto-reloads on changes)
 */

import { TheGraphClient, QuickQueries, GraphHelpers } from '../src/graph-utils.js';

console.log('🎮 The Graph API Playground');
console.log('Edit this file and save to see changes!\n');

async function playground() {
  try {
    // 🔧 Experiment here!
    // GitHub Copilot will help you write queries
    
    // Example 1: Search for specific protocols
    console.log('🔍 Searching for Aave subgraphs...');
    const aaveSubgraphs = await QuickQueries.search('aave');
    console.log(`Found: ${aaveSubgraphs.data?.subgraphs?.length || 0} results\n`);
    
    // Example 2: Custom GraphQL query
    // Ask Copilot: "Write a query to get the largest Uniswap V3 positions"
    
    // Example 3: Real-time price tracking
    // Ask Copilot: "Create a function to monitor ETH price changes"
    
    // Example 4: Portfolio tracking
    // Ask Copilot: "Build a function to track wallet positions"
    
    console.log('💡 Try asking GitHub Copilot:');
    console.log('   • "Show me the top lending pools on Aave"');
    console.log('   • "Get all NFT collections from OpenSea"');
    console.log('   • "Find the most active DEX traders"');
    console.log('   • "Track gas prices across different protocols"');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the playground
playground();

// TODO: Add your experiments below!
// GitHub Copilot can help you build:
// - Price alerts
// - Portfolio trackers  
// - Trading bots
// - Analytics dashboards
// - DeFi yield calculators