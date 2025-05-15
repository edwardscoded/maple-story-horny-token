import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for holders data
  app.get('/api/holders', async (req, res) => {
    try {
      const holders = await storage.getTopHolders();
      return res.json(holders);
    } catch (error) {
      console.error('Error fetching holders:', error);
      return res.status(500).json({ message: 'Failed to fetch holders data' });
    }
  });

  // API route for current price
  app.get('/api/price', async (req, res) => {
    try {
      const price = await storage.getCurrentPrice();
      return res.json(price);
    } catch (error) {
      console.error('Error fetching price:', error);
      return res.status(500).json({ message: 'Failed to fetch price data' });
    }
  });

  // API route for price history
  app.get('/api/price/history', async (req, res) => {
    try {
      const history = await storage.getPriceHistory();
      return res.json(history);
    } catch (error) {
      console.error('Error fetching price history:', error);
      return res.status(500).json({ message: 'Failed to fetch price history' });
    }
  });

  // API routes for memes
  app.get('/api/memes', async (req, res) => {
    try {
      const memes = await storage.getMemes();
      return res.json(memes);
    } catch (error) {
      console.error('Error fetching memes:', error);
      return res.status(500).json({ message: 'Failed to fetch memes' });
    }
  });

  // Add a new meme (this would require authentication in production)
  app.post('/api/memes', async (req, res) => {
    try {
      const newMeme = req.body;
      const meme = await storage.addMeme(newMeme);
      return res.status(201).json(meme);
    } catch (error) {
      console.error('Error adding meme:', error);
      return res.status(500).json({ message: 'Failed to add meme' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
