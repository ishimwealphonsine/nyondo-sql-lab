const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

db.exec(`
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'attendant'
);
`);

const insertProduct = db.prepare(`
  INSERT INTO products (name, description, price)
  VALUES (?, ?, ?)
`);

const insertProducts = db.transaction((products) => {
  for (const product of products) {
    insertProduct.run(product);
  }
});

insertProducts([
  ['Cement (bag)', 'Portland cement 50kg bag', 35000],
  ['Iron Sheet 3m', 'Gauge 30 roofing sheet 3m long', 110000],
  ['Paint 5L', 'Exterior wall paint white 5L', 60000],
  ['Nails 1kg', 'Common wire nails 1kg pack', 12000],
  ['Timber 2x4', 'Pine timber plank 2x4 per metre', 25000],
]);

const insertUser = db.prepare(`
  INSERT INTO users (username, password, role)
  VALUES (?, ?, ?)
`);

const insertUsers = db.transaction((users) => {
  for (const user of users) {
    insertUser.run(user);
  }
});

insertUsers([
  ['admin', 'admin123', 'admin'],
  ['fatuma', 'pass456', 'attendant'],
  ['wasswa', 'pass789', 'manager'],
]);

console.log('Products:');
console.log(db.prepare('SELECT * FROM products').all());

console.log('Users:');
console.log(db.prepare('SELECT * FROM users').all());