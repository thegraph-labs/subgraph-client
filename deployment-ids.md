# Working Deployment IDs for The Graph

This file contains curated deployment IDs that should work with The Graph Gateway. These IDs are current as of January 2025.

> **Note**: Deployment IDs can change when subgraphs are updated. If an ID stops working, find a new one at [The Graph Explorer](https://thegraph.com/explorer/).

## 🦄 DeFi Protocols

### Uniswap V3 (Ethereum Mainnet)
- **ID**: Find at [The Graph Explorer - Uniswap V3](https://thegraph.com/explorer/subgraphs/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYZ22YwKx9QqPWVTH7CZ)
- **Query Types**: Pools, swaps, positions, tokens
- **Example**:
  ```javascript
  const deploymentId = 'YOUR_UNISWAP_V3_ID_HERE';
  ```

### Aave V3 (Ethereum Mainnet)  
- **ID**: Find at [The Graph Explorer - Aave V3](https://thegraph.com/explorer/)
- **Query Types**: Markets, users, reserves, liquidations
- **Example**:
  ```javascript
  const deploymentId = 'YOUR_AAVE_V3_ID_HERE';
  ```

### Compound V3
- **ID**: Find at [The Graph Explorer - Compound V3](https://thegraph.com/explorer/)
- **Query Types**: Markets, accounts, transactions
- **Example**:
  ```javascript
  const deploymentId = 'YOUR_COMPOUND_V3_ID_HERE';
  ```

## 🖼️ NFT Marketplaces

### OpenSea
- **ID**: Find at [The Graph Explorer - OpenSea](https://thegraph.com/explorer/)
- **Query Types**: Collections, sales, users
- **Example**:
  ```javascript
  const deploymentId = 'YOUR_OPENSEA_ID_HERE';
  ```

## 🌐 Infrastructure

### ENS (Ethereum Name Service)
- **ID**: Find at [The Graph Explorer - ENS](https://thegraph.com/explorer/)
- **Query Types**: Domains, resolvers, registrations
- **Example**:
  ```javascript
  const deploymentId = 'YOUR_ENS_ID_HERE';
  ```

## 📊 How to Find Current IDs

1. **Go to The Graph Explorer**: https://thegraph.com/explorer/
2. **Search** for the protocol you want (e.g., "Uniswap V3")
3. **Click** on a subgraph that looks active and well-maintained
4. **Copy** the deployment ID from the URL or subgraph details
5. **Test** the ID with our simple client

## 🧪 Testing a New ID

```javascript
import { TheGraphGateway } from './src/simple-client.js';

const client = new TheGraphGateway();
const deploymentId = 'YOUR_NEW_ID_HERE';

// Test with a simple query
const result = await client.query(deploymentId, `{
  __schema {
    queryType {
      name
    }
  }
}`);

console.log('✅ Deployment ID works!', result);
```

## 🔄 Updating This File

When you find new working deployment IDs:

1. Add them to this file
2. Test them with the simple client
3. Include example queries
4. Note the last verified date

## 📝 Template for New Entries

```markdown
### Protocol Name
- **ID**: `deployment_id_here`
- **Network**: Ethereum Mainnet / Polygon / etc.
- **Query Types**: Brief description
- **Last Verified**: 2025-01-XX
- **Example**:
  ```javascript
  const deploymentId = 'deployment_id_here';
  const query = `{
    // example query
  }`;
  ```
```