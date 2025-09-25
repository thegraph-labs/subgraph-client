# The Graph API Client for GitHub Copilot

This project provides a direct API client for The Graph's decentralized network, optimized for use with GitHub Copilot in VS Code.

## 🚀 Quick Start

1. **Get your API key** from [The Graph Studio](https://thegraph.com/studio/)
2. **Create `.env` file**:
   ```bash
   echo "GATEWAY_API_KEY=your_api_key_here" > .env
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Test connection**:
   ```bash
   npm run simple-test
   ```

## 🎯 GitHub Copilot Integration

This client is designed to work seamlessly with GitHub Copilot:

1. **Auto-completion**: Import the client and get intelligent suggestions
2. **Query generation**: Ask Copilot to write GraphQL queries
3. **Examples**: Pre-built functions show Copilot how to structure queries
4. **Documentation**: Comments help Copilot understand the context

## 📊 Finding Subgraph Deployment IDs

Since The Graph moved to the decentralized network, you need current deployment IDs:

### Method 1: The Graph Explorer
1. Visit [The Graph Explorer](https://thegraph.com/explorer/)
2. Search for the protocol you want (e.g., "Uniswap V3")
3. Click on a subgraph
4. Copy the **Deployment ID** from the URL or page

### Method 2: The Graph Studio  
1. Go to [The Graph Studio](https://thegraph.com/studio/)
2. Browse published subgraphs
3. Find the deployment ID in the subgraph details

### Method 3: Popular Deployment IDs
Check our [deployment-ids.md](./deployment-ids.md) file for curated list of working deployment IDs.

## 💡 Usage with GitHub Copilot

### Basic Query
## 🚀 Quick Start

```javascript
import { TheGraphGateway } from '@thegraph-labs/subgraph-client';

const client = new TheGraphGateway('your-api-key');

// Query using subgraph ID (API key in URL)
const result = await client.query(
  'HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1', 
  `{
    factories(first: 5) {
      id
      poolCount
      totalValueLockedUSD
    }
  }`
);

// Query using deployment ID (Bearer token auth)
const deployResult = await client.queryByDeployment(
  'QmeB7YfNvLbM9AnSVeh5JvsfUwm1KVCtUDwaDLh5oxupGh',
  query
);

// Or let it auto-detect ID type and authentication
const autoResult = await client.queryAuto(id, query);
```

## 🎯 Features

- **Unified API**: Single client handles both subgraph IDs and deployment IDs
- **Auto-detection**: Automatically determines ID type and uses correct authentication
- **Dual Authentication**: 
  - Subgraph IDs: API key in URL path
  - Deployment IDs: Bearer token in header
- **Error Handling**: Comprehensive error messages with debug info
- **Zero Config**: Works with environment variables or direct API key
- **GitHub Copilot Optimized**: Clean, predictable API for AI assistance

### Natural Language Prompts for Copilot
- "Generate a query to find recent swaps in Uniswap"
- "Create a function to track token prices over time"
- "Build a portfolio tracker for DeFi positions"
- "Show me how to monitor liquidity pool performance"

## 🛠️ Available Scripts

- `npm run simple-test` - Test connection with current setup
- `npm run dev` - Interactive playground (auto-reloads)
- `npm run search` - Search for subgraphs (when working)
- `npm run uniswap` - Uniswap examples (needs valid deployment ID)

## 📁 Project Structure

```
src/
├── simple-client.js    # Main API client
├── graph-client.js     # Advanced client (needs updates)
└── graph-utils.js      # Utility functions

examples/
├── simple-test.js      # Basic connection test
├── playground.js       # Experimental space
└── deployment-guide.js # How to find deployment IDs
```

## 🔧 Troubleshooting

### "Invalid subgraph ID" Error
- The deployment ID is outdated
- Find current IDs at [thegraph.com/explorer](https://thegraph.com/explorer/)
- Check our [deployment-ids.md](./deployment-ids.md) for working examples

### Authentication Errors
- Verify your API key in `.env` file
- Get a new key from [The Graph Studio](https://thegraph.com/studio/)
- Make sure the key has proper permissions

### Connection Issues
- Check internet connectivity
- Try a different deployment ID
- Run `npm run simple-test` to debug

## 🎯 Next Steps

1. Find a working deployment ID from The Graph Explorer
2. Update `examples/simple-test.js` with that ID  
3. Run the test to verify connection
4. Start building with GitHub Copilot!

## 📚 Resources

- [The Graph Documentation](https://thegraph.com/docs/)
- [The Graph Explorer](https://thegraph.com/explorer/)
- [The Graph Studio](https://thegraph.com/studio/)
- [GraphQL Learning Resources](https://graphql.org/learn/)