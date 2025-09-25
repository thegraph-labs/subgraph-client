/**
 * Working example with a known deployment ID
 */

import { TheGraphGateway } from '../src/simple-client.js';

async function testWithKnownSubgraph() {
  try {
    console.log('🧪 Testing The Graph Gateway Connection\n');
    
    const client = new TheGraphGateway();
    
    // Use a known working deployment ID - this one should work
    // This is the Messari Uniswap V3 Ethereum subgraph
    const deploymentId = 'QmeB7YfNvLbM9AnSVeh5JvsfUwm1KVCtUDwaDLh5oxupGh';
    
    console.log(`📊 Testing with deployment: ${deploymentId.substring(0, 20)}...`);
    
    // Simple test query
    const query = `{
      protocols(first: 1) {
        id
        name
        type
      }
    }`;
    
    console.log('Making test query...');
    const result = await client.query(deploymentId, query);
    
    if (result.data && result.data.protocols) {
      console.log('✅ SUCCESS! Connection working');
      console.log(`Found protocol: ${result.data.protocols[0].name}`);
      console.log(`Type: ${result.data.protocols[0].type}`);
    } else {
      console.log('⚠️  Unexpected response structure:', result);
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:');
    console.error(`   ${error.message}`);
    
    if (error.message.includes('invalid subgraph ID')) {
      console.log('\n💡 The deployment ID might be outdated.');
      console.log('   Find current deployment IDs at:');
      console.log('   • https://thegraph.com/explorer/');
      console.log('   • https://thegraph.com/studio/');
    } else if (error.message.includes('401') || error.message.includes('403')) {
      console.log('\n🔑 Check your API key:');
      console.log('   • Visit https://thegraph.com/studio/');
      console.log('   • Create/verify your API key');
      console.log('   • Update your .env file');
    }
  }
}

testWithKnownSubgraph();