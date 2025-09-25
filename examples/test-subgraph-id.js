import('./src/simple-client.js').then(async ({ TheGraphGateway }) => {
  const client = new TheGraphGateway();
  const deploymentId = process.env.THEGRAPH_DEPLOYMENT_ID;
  
  console.log('🧪 Testing deployment:', deploymentId.substring(0, 20) + '...');
  
  // Test 1: Schema introspection
  console.log('📋 Testing schema access...');
  try {
    const schemaResult = await client.query(deploymentId, '{ __schema { queryType { name } } }');
    console.log('✅ Schema access works!');
    
    // Test 2: Get available entity types
    console.log('🔍 Getting entity types...');
    const typesResult = await client.query(deploymentId, `
      { __schema { 
          types(filter: { kind: OBJECT, name_not_in: ["Query", "Subscription"] }) { 
            name 
          } 
        } 
      }
    `);
    
    const entityTypes = typesResult.data.__schema.types.slice(0, 5);
    console.log('📊 Available entities:', entityTypes.map(t => t.name).join(', '));
    
    console.log('\\n🎉 Deployment is working! You can query:', deploymentId);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.message.includes('subgraph not found')) {
      console.log('💡 This deployment ID is not valid/active');
    }
  }
});
