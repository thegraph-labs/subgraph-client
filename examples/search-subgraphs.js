/**
 * Search subgraphs by keyword
 * Run with: npm run search
 */

import { QuickQueries, TheGraphClient } from '../src/graph-utils.js';

async function searchDemo() {
  try {
    console.log('🔍 The Graph Subgraph Search Demo\n');
    
    // Search for different types of subgraphs
    const searches = ['uniswap', 'aave', 'compound', 'opensea', 'ens'];
    
    for (const keyword of searches) {
      console.log(`\n📊 Searching for: "${keyword}"`);
      console.log('─'.repeat(40));
      
      const result = await QuickQueries.search(keyword);
      
      if (result.data && result.data.subgraphs.length > 0) {
        result.data.subgraphs.slice(0, 3).forEach((subgraph, index) => {
          console.log(`\n${index + 1}. ${subgraph.displayName}`);
          console.log(`   ID: ${subgraph.id}`);
          console.log(`   Network: ${subgraph.currentVersion?.subgraphDeployment?.network || 'Unknown'}`);
          console.log(`   Signal: ${parseFloat(subgraph.signalledTokens).toFixed(2)} GRT`);
          
          if (subgraph.description) {
            const shortDesc = subgraph.description.length > 100 
              ? subgraph.description.substring(0, 100) + '...'
              : subgraph.description;
            console.log(`   Description: ${shortDesc}`);
          }
          
          if (subgraph.website) {
            console.log(`   Website: ${subgraph.website}`);
          }
        });
      } else {
        console.log('   No results found');
      }
      
      // Small delay to be nice to the API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✅ Search demo complete!');
    console.log('\n💡 Tips for GitHub Copilot:');
    console.log('   • Use these subgraph IDs in your queries');
    console.log('   • Ask Copilot to generate GraphQL queries for these subgraphs');
    console.log('   • Try: "Generate a query for the top Uniswap pools"');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

searchDemo();