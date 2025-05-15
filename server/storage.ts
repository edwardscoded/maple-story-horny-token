import { 
  holders, type Holder, type InsertHolder,
  priceHistory, type PriceHistory, type InsertPriceHistory,
  memes, type Meme, type InsertMeme,
  users, type User, type InsertUser
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

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

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // Holder methods
  async getTopHolders(): Promise<Holder[]> {
    return await db.select().from(holders).orderBy(asc(holders.rank));
  }

  async addHolder(holder: InsertHolder): Promise<Holder> {
    const [newHolder] = await db.insert(holders).values(holder).returning();
    return newHolder;
  }

  // Price methods
  async getCurrentPrice(): Promise<PriceHistory | undefined> {
    const [latestPrice] = await db
      .select()
      .from(priceHistory)
      .orderBy(desc(priceHistory.timestamp))
      .limit(1);
    return latestPrice;
  }

  async getPriceHistory(): Promise<PriceHistory[]> {
    return await db
      .select()
      .from(priceHistory)
      .orderBy(asc(priceHistory.timestamp));
  }

  async addPricePoint(price: InsertPriceHistory): Promise<PriceHistory> {
    const [newPrice] = await db
      .insert(priceHistory)
      .values({ ...price, timestamp: new Date() })
      .returning();
    return newPrice;
  }

  // Meme methods
  async getMemes(): Promise<Meme[]> {
    return await db
      .select()
      .from(memes)
      .where(eq(memes.approved, true))
      .orderBy(desc(memes.createdAt));
  }

  async addMeme(meme: InsertMeme): Promise<Meme> {
    const [newMeme] = await db
      .insert(memes)
      .values({ ...meme, approved: true, createdAt: new Date() })
      .returning();
    return newMeme;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
}

// Initialize the database with initial data
async function seedDatabase() {
  const holderCount = await db.select().from(holders).execute();
  
  // Only seed if the database is empty
  if (holderCount.length === 0) {
    // Add initial holders (top 20)
    await db.insert(holders).values([
      {
        wallet: "0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922",
        amount: "69,420,000",
        rank: 1,
        status: "Mushroom King"
      },
      {
        wallet: "0xABCD1234ABCD1234ABCD1234ABCD1234",
        amount: "42,069,000",
        rank: 2,
        status: "Elder Shroom"
      },
      {
        wallet: "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
        amount: "8,008,135",
        rank: 3,
        status: "Horny Degen"
      },
      {
        wallet: "0x1111222233334444555566667777888",
        amount: "6,942,069",
        rank: 4,
        status: "Mushroom Knight"
      },
      {
        wallet: "0x8888777766665555444433332222111",
        amount: "4,200,690",
        rank: 5,
        status: "Mushroom Knight"
      },
      {
        wallet: "0xAAAABBBBCCCCDDDDEEEEFFFF123456",
        amount: "3,141,592",
        rank: 6,
        status: "Horny Degen"
      },
      {
        wallet: "0x654321FEEEDDDCCCBBBAAA9876543",
        amount: "2,718,281",
        rank: 7,
        status: "Horny Degen"
      },
      {
        wallet: "0xAVAX1AVAX2AVAX3AVAX4AVAX5AVAX6",
        amount: "1,618,033",
        rank: 8,
        status: "Spore Guardian"
      },
      {
        wallet: "0xMAKER1MAKER2MAKER3MAKER4MAKER5",
        amount: "1,414,213",
        rank: 9,
        status: "Spore Guardian"
      },
      {
        wallet: "0xHORNY1HORNY2HORNY3HORNY4HORNY5",
        amount: "1,234,567",
        rank: 10,
        status: "Spore Guardian"
      },
      {
        wallet: "0xMEME1MEME2MEME3MEME4MEME5MEME6",
        amount: "1,111,111",
        rank: 11,
        status: "Fungus Friend"
      },
      {
        wallet: "0xCOIN1COIN2COIN3COIN4COIN5COIN6",
        amount: "1,010,101",
        rank: 12,
        status: "Fungus Friend"
      },
      {
        wallet: "0xTOKEN1TOKEN2TOKEN3TOKEN4TOKEN5",
        amount: "987,654",
        rank: 13,
        status: "Fungus Friend"
      },
      {
        wallet: "0xAVAX888AVAX888AVAX888AVAX888",
        amount: "867,530",
        rank: 14,
        status: "Fungus Friend"
      },
      {
        wallet: "0xDEGEN777DEGEN777DEGEN777DEGEN",
        amount: "789,456",
        rank: 15,
        status: "Mycelium Member"
      },
      {
        wallet: "0xFUNGI666FUNGI666FUNGI666FUNGI",
        amount: "753,159",
        rank: 16,
        status: "Mycelium Member"
      },
      {
        wallet: "0xMAPLE555MAPLE555MAPLE555MAPLE",
        amount: "666,666",
        rank: 17,
        status: "Mycelium Member"
      },
      {
        wallet: "0xSHROOM444SHROOM444SHROOM444",
        amount: "424,242",
        rank: 18,
        status: "Mycelium Member"
      },
      {
        wallet: "0xSPORE333SPORE333SPORE333SPORE",
        amount: "333,333",
        rank: 19,
        status: "Mycelium Member"
      },
      {
        wallet: "0xFOREST222FOREST222FOREST222",
        amount: "222,222",
        rank: 20,
        status: "Mycelium Member"
      }
    ]);
    
    // Add initial price point
    await db.insert(priceHistory).values({
      price: "0.0000042069",
      percentChange: "+69",
      timestamp: new Date()
    });
    
    // Add initial memes
    await db.insert(memes).values([
      {
        imageUrl: "https://pixabay.com/get/gbce1c3cec4e31c8dd733bea3d1076dde33c400146d0afbb9b86e44781087fb40cf9226ee69c0e3cc38b842af1de609692781db0736f09cca32e8b13c52b308c1_1280.jpg",
        title: "Trading Mushrooms",
        creatorWallet: "0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922",
        approved: true,
        createdAt: new Date()
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        title: "Surprised Mushroom",
        creatorWallet: "0xABCD...1234",
        approved: true,
        createdAt: new Date()
      }
    ]);
  }
}

// Seed the database and export a singleton instance
seedDatabase().catch(console.error);
export const storage = new DatabaseStorage();
