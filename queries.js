const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Task 2: Basic CRUD Operations
    console.log("\n=== Task 2: Basic CRUD Operations ===");
    
    // Find all books in a specific genre
    const fictionBooks = await collection.find({ genre: "Fiction" }).toArray();
    console.log("\nFiction books:", fictionBooks.map(b => b.title));
    
    // Find books published after a certain year
    const booksAfter1950 = await collection.find({ published_year: { $gt: 1950 } }).toArray();
    console.log("\nBooks published after 1950:", booksAfter1950.map(b => b.title));
    
    // Find books by a specific author
    const orwellBooks = await collection.find({ author: "George Orwell" }).toArray();
    console.log("\nBooks by George Orwell:", orwellBooks.map(b => b.title));
    
    // Update the price of a specific book
    const updateResult = await collection.updateOne(
      { title: "1984" },
      { $set: { price: 11.99 } }
    );
    console.log("\nUpdated 1984 price:", updateResult.modifiedCount, "document modified");
    
    // Delete a book by its title
    const deleteResult = await collection.deleteOne({ title: "Animal Farm" });
    console.log("\nDeleted Animal Farm:", deleteResult.deletedCount, "document deleted");

    // Task 3: Advanced Queries
    console.log("\n=== Task 3: Advanced Queries ===");
    
    // Books in stock and published after 2010
    const inStockRecent = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log("\nIn stock and published after 2010:", inStockRecent.map(b => b.title));
    
    // Projection example
    const projectedBooks = await collection.find(
      { genre: "Fantasy" },
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log("\nFantasy books with projection:", projectedBooks);
    
    // Sorting
    const priceAsc = await collection.find().sort({ price: 1 }).toArray();
    console.log("\nBooks by price (ascending):", priceAsc.map(b => `${b.title} ($${b.price})`));
    
    const priceDesc = await collection.find().sort({ price: -1 }).toArray();
    console.log("\nBooks by price (descending):", priceDesc.map(b => `${b.title} ($${b.price})`));
    
    // Pagination (page 2 with 5 books per page)
    const page2 = await collection.find()
      .skip(5)
      .limit(5)
      .toArray();
    console.log("\nPage 2 results:", page2.map(b => b.title));

    // Task 4: Aggregation Pipeline
    console.log("\n=== Task 4: Aggregation Pipeline ===");
    
    // Average price by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { 
        _id: "$genre", 
        avgPrice: { $avg: "$price" },
        count: { $sum: 1 }
      }},
      { $sort: { avgPrice: -1 } }
    ]).toArray();
    console.log("\nAverage price by genre:", avgPriceByGenre);
    
    // Author with most books
    const prolificAuthor = await collection.aggregate([
      { $group: { 
        _id: "$author", 
        bookCount: { $sum: 1 } 
      }},
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\nAuthor with most books:", prolificAuthor);
    
    // Books by publication decade
    const booksByDecade = await collection.aggregate([
      { $project: {
        decade: { 
          $subtract: [
            "$published_year", 
            { $mod: ["$published_year", 10] }
          ] 
        }
      }},
      { $group: {
        _id: "$decade",
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("\nBooks by decade:", booksByDecade);

    // Task 5: Indexing
    console.log("\n=== Task 5: Indexing ===");
    
    // Create indexes
    await collection.createIndex({ title: 1 });
    await collection.createIndex({ author: 1, published_year: 1 });
    console.log("\nIndexes created successfully");
    
    // Demonstrate performance improvement
    const explainWithoutIndex = await collection.find(
      { author: "J.R.R. Tolkien" }
    ).explain("executionStats");
    
    const explainWithIndex = await collection.find(
      { author: "J.R.R. Tolkien", published_year: 1954 }
    ).explain("executionStats");
    
    console.log("\nQuery without compound index (totalDocsExamined):", 
      explainWithoutIndex.executionStats.totalDocsExamined);
    console.log("Query with compound index (totalDocsExamined):", 
      explainWithIndex.executionStats.totalDocsExamined);

  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await client.close();
  }
}

runQueries().catch(console.error);