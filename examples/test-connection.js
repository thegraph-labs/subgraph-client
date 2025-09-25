/**
 * Test connection to The Graph Gateway
 * Run with: npm run test-connection
 */

import { QuickQueries } from '../src/graph-utils.js';

async function testConnection() {
  try {
    console.log('🧪 Testing connection to The Graph Gateway...\n');
    
    // Test searching for subgraphs
    const searchResult = await QuickQueries.search('uniswap');
    
    if (searchResult.data && searchResult.data.subgraphs) {
      console.log('\n✅ Connection successful!');
      console.log(`Found ${searchResult.data.subgraphs.length} Uniswap-related subgraphs\n`);
      
      // Show first few results
      searchResult.data.subgraphs.slice(0, 3).forEach((subgraph, index) => {
        console.log(`${index + 1}. ${subgraph.displayName}`);
        console.log(`   ID: ${subgraph.id}`);
        console.log(`   Description: ${subgraph.description || 'No description'}`);
        console.log(`   Signal: ${parseFloat(subgraph.signalledTokens).toFixed(2)} GRT\n`);
      });
    } else {
      console.error('❌ No data returned');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:');
    
    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('   • Invalid API key. Get one from https://thegraph.com/studio/');
      console.error('   • Make sure your .env file contains: GATEWAY_API_KEY=your_key_here');
    } else {
      console.error(`   • ${error.message}`);
    }
    
    process.exit(1);
  }
}

testConnection();