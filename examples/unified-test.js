/**
 * Unified Client Test - Both Subgraph IDs and Deployment IDs
 * Shows the consolidated functionality of TheGraphGateway
 */

import { TheGraphGateway } from '../src/simple-client.js';

const client = new TheGraphGateway();

// Test with different ID types
const subgraphId = 'HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1'; // Your provided subgraph ID
const deploymentId = 'QmeB7YfNvLbM9AnSVeh5JvsfUwm1KVCtUDwaDLh5oxupGh'; // Your provided deployment ID

async function testUnifiedClient() {
  console.log('🧪 Testing Unified TheGraphGateway Client\n');

  try {
    // Test 1: Query using subgraph ID (API key in URL)
    console.log('📊 Test 1: Query using subgraph ID');
    const subgraphResult = await client.query(subgraphId, `{
      factories(first: 2) {
        id
        poolCount
        totalValueLockedUSD
      }
    }`);
    console.log('✅ Subgraph ID query successful:', subgraphResult.data.factories.length, 'factories\n');

    // Test 2: Query using deployment ID (Bearer auth)
    console.log('📊 Test 2: Query using deployment ID');
    const deploymentResult = await client.queryByDeployment(deploymentId, `{
      factories(first: 2) {
        id
        poolCount
        totalValueLockedUSD
      }
    }`);
    console.log('✅ Deployment ID query successful:', deploymentResult.data.factories.length, 'factories\n');

    // Test 3: Auto-detect ID type
    console.log('🔍 Test 3: Auto-detect ID type (subgraph)');
    const autoSubgraphResult = await client.queryAuto(subgraphId, `{
      factories(first: 1) {
        id
        poolCount
      }
    }`);
    console.log('✅ Auto-detection (subgraph) successful:', autoSubgraphResult.data.factories[0].id, '\n');

    console.log('🔍 Test 4: Auto-detect ID type (deployment)');
    const autoDeploymentResult = await client.queryAuto(deploymentId, `{
      factories(first: 1) {
        id
        poolCount
      }
    }`);
    console.log('✅ Auto-detection (deployment) successful:', autoDeploymentResult.data.factories[0].id, '\n');

    // Test 5: Get available entity types
    console.log('📋 Test 5: Get entity types');
    const entityTypes = await client.getEntityTypes(subgraphId);
    console.log('✅ Found', entityTypes.length, 'entity types:');
    entityTypes.slice(0, 5).forEach(type => {
      console.log(`  - ${type.name}`);
    });
    console.log('\n');

    // Test 6: Test connection
    console.log('🔗 Test 6: Test connection');
    const connectionResult = await client.testConnection(subgraphId);
    console.log('✅ Connection test successful:', connectionResult.data.__schema.queryType.name, '\n');

    console.log('🎉 All unified client tests passed!');
    console.log('\n💡 Auth patterns confirmed:');
    console.log('  - Subgraph ID: API key in URL path');
    console.log('  - Deployment ID: Bearer token in header');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    // Show what we tried to query
    console.log('\n🔍 Debug info:');
    console.log('- Subgraph ID:', subgraphId);
    console.log('- Deployment ID:', deploymentId);
    console.log('- Using gateway.thegraph.com');
    console.log('- API key present:', !!process.env.GATEWAY_API_KEY);
  }
}

testUnifiedClient();