import express from 'express';
import { analyzeStock } from './agents/stockGuruAgent.js';

const app = express();
const port = process.env.PORT || '3000';
app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { ticker } = req.body;

  if (!ticker) {
    return res.status(400).json({ error: 'Ticker is required.' });
  }

  console.log(`📈 Analyzing stock: ${ticker}`);
  const analysis = await analyzeStock(ticker.toUpperCase());
  res.json({ ticker, analysis });
});

app.listen(port, () => {
  console.log(`✅ MCP Stock Guru running at ${port}`);
});
