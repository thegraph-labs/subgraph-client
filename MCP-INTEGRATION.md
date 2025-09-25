# 🎭 Playwright MCP Server Integration

This directory demonstrates how to integrate **The Graph Client** with **Playwright MCP Server** for comprehensive browser automation and testing.

## 🌟 What's Inside

### 📱 Web Demo Interface (`demo/`)
- **`index.html`** - Interactive web interface showcasing The Graph client
- **`server.js`** - Simple HTTP server for serving the demo locally

### 🤖 MCP Integration (`examples/playwright-mcp-demo.js`)
- Demonstrates how to use Playwright MCP server functions
- Shows automated browser testing patterns
- Includes both simulated and real MCP server examples

## 🚀 Quick Start

### 1. Start the Demo Server
```bash
npm run demo-server
```
Server runs at: http://localhost:3000

### 2. Run MCP Integration Demo
```bash
npm run playwright-demo
```

### 3. Use Real MCP Server (with proper Playwright installation)
```javascript
// Navigate to demo page
await mcp_microsoft_pla_browser_navigate({
  url: 'http://localhost:3000'
});

// Take page snapshot
const snapshot = await mcp_microsoft_pla_browser_snapshot();

// Click test button
await mcp_microsoft_pla_browser_click({
  element: 'Test Connection button',
  ref: '#testBtn'
});

// Wait for results
await mcp_microsoft_pla_browser_wait_for({
  text: 'Connection successful'
});

// Take screenshot
await mcp_microsoft_pla_browser_take_screenshot({
  filename: 'thegraph-demo-results.png'
});
```

## 🎯 MCP Integration Benefits

### ✅ **Automated Testing**
- End-to-end browser automation
- Visual regression testing
- Cross-browser compatibility checks
- Screenshot-based verification

### 🔍 **Real User Simulation**
- Actual browser interactions
- Form filling and submission
- Button clicking and navigation
- Network request monitoring

### 📊 **Data Verification**
- Visual confirmation of API responses
- UI state validation
- Performance monitoring
- Error handling testing

## 🛠️ Available MCP Functions

### Navigation & Control
- `mcp_microsoft_pla_browser_navigate(url)`
- `mcp_microsoft_pla_browser_navigate_back()`
- `mcp_microsoft_pla_browser_close()`
- `mcp_microsoft_pla_browser_resize(width, height)`

### Interaction
- `mcp_microsoft_pla_browser_click(element, ref)`
- `mcp_microsoft_pla_browser_type(element, ref, text)`
- `mcp_microsoft_pla_browser_hover(element, ref)`
- `mcp_microsoft_pla_browser_press_key(key)`

### Data Collection
- `mcp_microsoft_pla_browser_snapshot()` - Get page accessibility tree
- `mcp_microsoft_pla_browser_take_screenshot(options)`
- `mcp_microsoft_pla_browser_network_requests()`
- `mcp_microsoft_pla_browser_console_messages()`

### Waiting & Verification
- `mcp_microsoft_pla_browser_wait_for(conditions)`
- `mcp_microsoft_pla_browser_evaluate(function)`

## 🎮 Demo Features

### 🔗 **Connection Testing**
Tests both authentication patterns:
- Subgraph ID with API key in URL
- Deployment ID with Bearer token

### 📊 **Live Data Queries**
- Top Uniswap V3 pools by TVL
- Recent swap transactions
- Custom GraphQL queries

### 🎯 **Interactive Elements**
- Real-time query builder
- Dynamic results display
- Statistics dashboard
- Error handling demos

## 📝 Example Use Cases

### 1. **GitHub Copilot Testing**
```javascript
// Ask Copilot: "Test the connection button on the demo page"
await mcp_microsoft_pla_browser_click({
  element: 'Test Connection button',
  ref: '#testBtn'
});
await mcp_microsoft_pla_browser_wait_for({
  text: 'Connection successful'
});
```

### 2. **Custom Query Testing**
```javascript
// Ask Copilot: "Fill in a custom query and test it"
await mcp_microsoft_pla_browser_type({
  element: 'Custom query field',
  ref: '#customQuery', 
  text: `{
    pools(first: 5) {
      id
      totalValueLockedUSD
    }
  }`
});
```

### 3. **Visual Regression**
```javascript
// Take before/after screenshots for comparison
await mcp_microsoft_pla_browser_take_screenshot({
  filename: 'before-query.png'
});
await runQuery();
await mcp_microsoft_pla_browser_take_screenshot({
  filename: 'after-query.png'
});
```

## 🔧 Setup Requirements

### For Demo Only
```bash
npm install  # Already included in main package
```

### For Full MCP Integration
```bash
# Install Playwright (system-dependent)
npx playwright install chrome

# Or use existing MCP server setup
# MCP servers are typically configured in Claude Desktop or VS Code
```

## 🌟 Pro Tips

1. **Always take snapshots** before interactions to see page state
2. **Use specific selectors** (`#id` or `[data-testid]`) for reliability
3. **Wait for elements** to load before interacting
4. **Screenshot everything** for debugging and documentation
5. **Combine with API tests** for comprehensive validation

## 🤝 GitHub Copilot Integration

This demo is optimized for GitHub Copilot assistance:

### Natural Language Prompts
- "Test the connection button and verify the results"
- "Fill in a custom query for pool data"
- "Take screenshots of the demo in action"
- "Automate clicking through all the demo features"

### Code Generation
Copilot can generate MCP server calls based on:
- Element descriptions
- User interaction goals  
- Testing requirements
- Screenshot needs

---

🎉 **Ready to automate The Graph client testing with MCP servers!**