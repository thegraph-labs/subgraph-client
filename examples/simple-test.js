/**
 * Working example with a known deployment ID
 */

import { TheGraphGateway } from '../src/simple-client.js';

async function testWithKnownSubgraph() {
  try {
    console.log('🧪 Testing The Graph Gateway Connection\n');
    
    const client = new TheGraphGateway();
    
    // Test with both ID types
    const subgraphId = 'HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1';
    const deploymentId = 'QmeB7YfNvLbM9AnSVeh5JvsfUwm1KVCtUDwaDLh5oxupGh';
    
    // Simple test query - use factories which we know exist in this subgraph
    const query = `{
      factories(first: 1) {
        id
        poolCount
        totalValueLockedUSD
      }
    }`;
    
    // Test 1: Subgraph ID (API key in URL)
    console.log('📊 Test 1: Query using subgraph ID');
    console.log(`   ID: ${subgraphId.substring(0, 20)}...`);
    const subgraphResult = await client.query(subgraphId, query);
    
    if (subgraphResult.data && subgraphResult.data.factories) {
      console.log('✅ Subgraph ID query SUCCESS!');
      console.log(`   Factory: ${subgraphResult.data.factories[0].id.substring(0, 20)}...`);
      console.log(`   Pool count: ${subgraphResult.data.factories[0].poolCount}`);
      console.log(`   TVL: $${parseFloat(subgraphResult.data.factories[0].totalValueLockedUSD).toLocaleString()}\n`);
    }

    // Test 2: Deployment ID (Bearer auth)
    console.log('📊 Test 2: Query using deployment ID');  
    console.log(`   ID: ${deploymentId.substring(0, 20)}...`);
    const deploymentResult = await client.queryByDeployment(deploymentId, query);
    
    if (deploymentResult.data && deploymentResult.data.factories) {
      console.log('✅ Deployment ID query SUCCESS!');
      console.log(`   Factory: ${deploymentResult.data.factories[0].id.substring(0, 20)}...`);
      console.log(`   Pool count: ${deploymentResult.data.factories[0].poolCount}`);
      console.log(`   TVL: $${parseFloat(deploymentResult.data.factories[0].totalValueLockedUSD).toLocaleString()}\n`);
    }

    console.log('🎉 Both authentication patterns working correctly!');
    
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