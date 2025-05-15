import { 
  holders, type Holder, type InsertHolder,
  priceHistory, type PriceHistory, type InsertPriceHistory,
  memes, type Meme, type InsertMeme,
  users, type User, type InsertUser
} from "@shared/schema";

// Interface for storage methods
export interface IStorage {
  // Holder methods
  getTopHolders(): Promise<Holder[]>;
  addHolder(holder: InsertHolder): Promise<Holder>;
  
  // Price methods
  getCurrentPrice(): Promise<PriceHistory | undefined>;
  getPriceHistory(): Promise<PriceHistory[]>;
  addPricePoint(price: InsertPriceHistory): Promise<PriceHistory>;
  
  // Meme methods
  getMemes(): Promise<Meme[]>;
  addMeme(meme: InsertMeme): Promise<Meme>;
  
  // User methods from template
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private _holders: Map<number, Holder>;
  private _priceHistory: Map<number, PriceHistory>;
  private _memes: Map<number, Meme>;
  private _users: Map<number, User>;
  private currentHolderId: number;
  private currentPriceId: number;
  private currentMemeId: number;
  private currentUserId: number;

  constructor() {
    this._holders = new Map();
    this._priceHistory = new Map();
    this._memes = new Map();
    this._users = new Map();
    this.currentHolderId = 1;
    this.currentPriceId = 1;
    this.currentMemeId = 1;
    this.currentUserId = 1;
    
    // Initialize with mock data
    this.initializeData();
  }

  private initializeData() {
    // Add mock holders
    this.addHolder({
      wallet: "0xDEAD...BEEF",
      amount: "69,420,000",
      rank: 1,
      status: "Mushroom King"
    });
    
    this.addHolder({
      wallet: "0xABCD...1234",
      amount: "42,069,000",
      rank: 2,
      status: "Elder Shroom"
    });
    
    this.addHolder({
      wallet: "0xMEME...COIN",
      amount: "8,008,135",
      rank: 3,
      status: "Horny Degen"
    });
    
    // Add mock price history
    this.addPricePoint({
      price: "0.0000042069",
      percentChange: "+69"
    });
    
    // Add mock memes
    this.addMeme({
      imageUrl: "https://pixabay.com/get/gbce1c3cec4e31c8dd733bea3d1076dde33c400146d0afbb9b86e44781087fb40cf9226ee69c0e3cc38b842af1de609692781db0736f09cca32e8b13c52b308c1_1280.jpg",
      title: "Trading Mushrooms",
      creatorWallet: "0xDEAD...BEEF"
    });
    
    this.addMeme({
      imageUrl: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
      title: "Surprised Mushroom",
      creatorWallet: "0xABCD...1234"
    });
  }

  // Holder methods
  async getTopHolders(): Promise<Holder[]> {
    return Array.from(this._holders.values())
      .sort((a, b) => a.rank - b.rank);
  }

  async addHolder(holder: InsertHolder): Promise<Holder> {
    const id = this.currentHolderId++;
    const newHolder = { ...holder, id };
    this._holders.set(id, newHolder);
    return newHolder;
  }

  // Price methods
  async getCurrentPrice(): Promise<PriceHistory | undefined> {
    const prices = Array.from(this._priceHistory.values());
    // Return the most recent price entry
    return prices.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
  }

  async getPriceHistory(): Promise<PriceHistory[]> {
    return Array.from(this._priceHistory.values())
      .sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
  }

  async addPricePoint(price: InsertPriceHistory): Promise<PriceHistory> {
    const id = this.currentPriceId++;
    const newPrice = { 
      ...price, 
      id, 
      timestamp: new Date() 
    };
    this._priceHistory.set(id, newPrice);
    return newPrice;
  }

  // Meme methods
  async getMemes(): Promise<Meme[]> {
    return Array.from(this._memes.values())
      .filter(meme => meme.approved)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  async addMeme(meme: InsertMeme): Promise<Meme> {
    const id = this.currentMemeId++;
    const newMeme = { 
      ...meme, 
      id, 
      approved: true, 
      createdAt: new Date() 
    };
    this._memes.set(id, newMeme);
    return newMeme;
  }

  // User methods from template
  async getUser(id: number): Promise<User | undefined> {
    return this._users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this._users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const newUser = { ...user, id };
    this._users.set(id, newUser);
    return newUser;
  }
}

// Export a singleton instance
export const storage = new MemStorage();
