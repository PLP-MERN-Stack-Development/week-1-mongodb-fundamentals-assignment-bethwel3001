# 📚 PLP Bookstore - MongoDB Implementation

![MongoDB Logo](https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png)

A complete implementation of a bookstore database using MongoDB, featuring CRUD operations, advanced queries, aggregation pipelines, and indexing optimization.

## 📦 Project Structure
```bash
plp_bookstore/
├── .gitignore
├── package.json
├── package-lock.json
├── insert_books.js # Database population script
├── queries.js # All MongoDB query implementations
└── README.md # This documentation
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (v6.0+)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (Optional GUI)

### Installation

1. **Clone the repository**:
   ```bash
   git https://github.com/PLP-MERN-Stack-Development/week-1-mongodb-fundamentals-assignment-bethwel3001
   cd plp_bookstore
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB service:
   - On macOS/Linux:
   ```bash
   mongod --dbpath=/data/db
   ```
   - windows as an admin
   ```bash
   net start MongoDB
   ```
## 🛠️ Usage
1. Populate the Database
Run the insertion script to create the plp_bookstore database and books collection
```bash
node insert_books.js
```
This will:
- Create a new MongoDB database
- Insert 12 sample book documents
- Display the inserted books in the console

2. Execute Queries
Run all the implemented MongoDB queries:
```bash
node queries.js
```
## 📋 Implemented Features
Task 1: MongoDB Setup
Database creation: plp_bookstore

Collection creation: books

Document insertion with proper schema

Task 2: Basic CRUD Operations
✅ Find all books in specific genre

✅ Find books published after certain year

✅ Find books by specific author

✅ Update price of specific book

✅ Delete book by title

Task 3: Advanced Queries
✅ Combined filters (in stock + published after 2010)

✅ Field projection (title, author, price only)

✅ Sorting (price ascending/descending)

✅ Pagination (limit + skip)

Task 4: Aggregation Pipeline
✅ Average price by genre

✅ Most prolific author

✅ Books count by publication decade

Task 5: Indexing
✅ Single index on title field

✅ Compound index on author and published_year

✅ Performance comparison using explain()

