/**
 * Uniswap V3 data queries examples
 * Run with: npm run uniswap
 */

import { QuickQueries, GraphHelpers } from '../src/graph-utils.js';

async function uniswapDemo() {
  try {
    console.log('🦄 Uniswap V3 Data Demo\n');
    
    // 1. Get top pools by TVL
    console.log('📊 Top 5 Pools by TVL:');
    console.log('─'.repeat(50));
    
    const topPools = await QuickQueries.getTopUniswapPools(5);
    
    if (topPools.data && topPools.data.pools) {
      topPools.data.pools.forEach((pool, index) => {
        const tvl = parseFloat(pool.totalValueLockedUSD);
        const volume = parseFloat(pool.volumeUSD);
        
        console.log(`\n${index + 1}. ${pool.token0.symbol}/${pool.token1.symbol} (${pool.feeTier/10000}%)`);
        console.log(`   TVL: $${tvl.toLocaleString()}`);
        console.log(`   Volume: $${volume.toLocaleString()}`);
        console.log(`   Pool ID: ${pool.id.substring(0, 10)}...`);
      });
    }
    
    // 2. Get recent swaps
    console.log('\n\n💱 Recent 5 Swaps:');
    console.log('─'.repeat(50));
    
    const recentSwaps = await QuickQueries.getRecentSwaps(5);
    
    if (recentSwaps.data && recentSwaps.data.swaps) {
      recentSwaps.data.swaps.forEach((swap, index) => {
        const amountUSD = parseFloat(swap.amountUSD);
        const timestamp = new Date(swap.timestamp * 1000);
        
        console.log(`\n${index + 1}. ${swap.pool.token0.symbol} ↔ ${swap.pool.token1.symbol}`);
        console.log(`   Amount: $${amountUSD.toLocaleString()}`);
        console.log(`   Time: ${timestamp.toLocaleString()}`);
        console.log(`   TX: ${swap.transaction.id.substring(0, 10)}...`);
      });
    }
    
    // 3. Search for specific token pairs
    console.log('\n\n🔍 Finding ETH/USDC Pools:');
    console.log('─'.repeat(50));
    
    const ethUsdcPools = await GraphHelpers.findUniswapPools('ETH', 'USDC');
    
    if (ethUsdcPools.data && ethUsdcPools.data.pools) {
      ethUsdcPools.data.pools.slice(0, 3).forEach((pool, index) => {
        const tvl = parseFloat(pool.totalValueLockedUSD);
        const volume = parseFloat(pool.volumeUSD);
        
        console.log(`\n${index + 1}. ${pool.token0.symbol}/${pool.token1.symbol} (${pool.feeTier/10000}%)`);
        console.log(`   TVL: $${tvl.toLocaleString()}`);
        console.log(`   Volume: $${volume.toLocaleString()}`);
      });
    }
    
    // 4. Get trending tokens
    console.log('\n\n🔥 Trending Tokens by Volume:');
    console.log('─'.repeat(50));
    
    const trending = await GraphHelpers.getTrendingTokens(5);
    
    if (trending.data && trending.data.tokens) {
      trending.data.tokens.forEach((token, index) => {
        const volume = parseFloat(token.volumeUSD);
        const tvl = parseFloat(token.totalValueLockedUSD);
        
        console.log(`\n${index + 1}. ${token.symbol} (${token.name})`);
        console.log(`   Volume: $${volume.toLocaleString()}`);
        console.log(`   TVL: $${tvl.toLocaleString()}`);
        console.log(`   Transactions: ${token.txCount.toLocaleString()}`);
      });
    }
    
    console.log('\n✅ Uniswap demo complete!');
    console.log('\n💡 Next steps with GitHub Copilot:');
    console.log('   • Ask: "Create a function to track pool performance"');
    console.log('   • Ask: "Generate alerts for large swaps"');
    console.log('   • Ask: "Build a price monitoring dashboard"');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('429')) {
      console.error('   Rate limit reached. Try again in a few seconds.');
    }
  }
}

uniswapDemo();