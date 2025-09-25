#!/bin/bash

# Setup script for The Graph API Client (GitHub Copilot compatible)

echo "🚀 Setting up The Graph API Client for GitHub Copilot..."
echo

# Check Node.js installation
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

# Check if VS Code is available
if command -v code &> /dev/null; then
    echo "✅ VS Code found"
else
    echo "ℹ️  VS Code not found in PATH (this is optional)"
fi

# Check for GitHub Copilot
echo "ℹ️  Make sure you have GitHub Copilot extension installed in VS Code"

echo
echo "📋 Next steps:"
echo "1. Get your Gateway API key from Subgraph Studio: https://thegraph.com/studio/"
echo "2. Create a .env file with your API key:"
echo "   echo 'GATEWAY_API_KEY=your_api_key_here' > .env"
echo "3. Install dependencies:"
echo "   npm install"
echo "4. Test the connection:"
echo "   npm run test-connection"
echo "5. Try the examples:"
echo "   npm run search"
echo "   npm run uniswap"
echo "6. Use the playground for experiments:"
echo "   npm run dev"
echo
echo "🎯 GitHub Copilot Integration:"
echo "   • Open any .js file and start typing queries"
echo "   • Ask Copilot to generate GraphQL queries"
echo "   • Use autocomplete for The Graph API functions"
echo "   • Try: 'Generate a query for top DeFi protocols'"
echo
echo "� Project structure:"
echo "   src/           - API client and utilities"
echo "   examples/      - Demo scripts and examples"
echo "   .env           - Your API key (create this)"
echo
echo "🎉 Setup complete! Happy coding with The Graph!"