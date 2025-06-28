# Stock Analyser MCP

A powerful, AI-driven stock analysis tool that leverages real-time and historical data to provide actionable investment insights. Built with Node.js, Yahoo Finance API, and Groq LLM.

## Features
- Fetches real-time and historical stock data from Yahoo Finance
- Analyzes key financial metrics (P/E ratio, market cap, 52-week high/low, volume, etc.)
- Compares stocks to sector benchmarks
- Provides clear buy/hold/sell recommendations with step-by-step reasoning
- Highlights risks, uncertainties, and external factors
- Customizable analysis period

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stock-analyser-mcp.git
   cd stock-analyser-mcp
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up your environment variables:
   - Copy `env.template` to `.env` and add your Groq API key:
     ```bash
     cp env.template .env
     # Then edit .env and set GROQ_API_KEY=your_key_here
     ```

## Usage

You can analyze a stock by running the main script or integrating the `analyzeStock` function in your own code.

### Example (Node.js):
```js
import { analyzeStock } from './agents/stockGuruAgent.js';

const result = await analyzeStock('AAPL', { period1: '2024-01-01', period2: '2025-01-01' });
console.log(result);
```

## Project Structure
```
├── agents/
│   └── stockGuruAgent.js   # Main analysis logic
├── prompts/
│   └── system.txt          # System prompt for LLM
├── env.template            # Environment variable template
├── package.json            # Project metadata and scripts
```

## Configuration
- **GROQ_API_KEY**: Your API key for Groq LLM (required)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Disclaimer
This tool is for informational purposes only and does not constitute financial advice. Always do your own research before making investment decisions.
