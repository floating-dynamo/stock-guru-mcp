import yahooFinance from 'yahoo-finance2';
import Groq from 'groq-sdk';
import fs from 'fs';

/**
 * Analyze a stock using Yahoo Finance and Groq LLM.
 * @param {string} ticker - Stock ticker symbol.
 * @param {Object} [options] - Optional parameters.
 * @param {string|Date} [options.period1] - Start date for historical data (default: 1 year ago).
 * @param {string|Date} [options.period2] - End date for historical data (default: today).
 */
export async function analyzeStock(ticker, options = {}) {
  try {
    // Calculate default period1 (1 year ago) and period2 (today)
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const period1 = options.period1 || oneYearAgo.toISOString().split('T')[0];
    const period2 = options.period2 || today.toISOString().split('T')[0];

    const quote = await yahooFinance.quote(ticker);
    const history = await yahooFinance.historical(ticker, {
      period1,
      period2,
    });

    const dataSummary = `
    Symbol: ${quote.symbol}
    Name: ${quote.shortName}
    Current Price: $${quote.regularMarketPrice}
    52 Week High: $${quote.fiftyTwoWeekHigh}
    52 Week Low: $${quote.fiftyTwoWeekLow}
    Market Cap: ${quote.marketCap}
    PE Ratio: ${quote.trailingPE}

    Historical Close Prices (Recent):
    ${history
      .slice(-5)
      .map((h) => `${h.date.toISOString().split('T')[0]}: $${h.close}`)
      .join('\n')}
    `;

    const systemPrompt = fs.readFileSync('./prompts/system.txt', 'utf8');

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY | '',
    });

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Here is the stock data:\n\n${dataSummary}\n\nProvide your investment analysis:`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    return response.choices[0]?.message?.content;
  } catch (err) {
    return `Error fetching data for ${ticker}: ${err.message}`;
  }
}
