const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

console.log('Query A: Get every column of every product');
console.log(db.prepare('SELECT * FROM products').all());

console.log('\nQuery B: Get only the name and price of all products');
console.log(db.prepare('SELECT name, price FROM products').all());

console.log('\nQuery C: Get full details of product with id = 3');
console.log(db.prepare('SELECT * FROM products WHERE id = ?').get(3));

console.log("\nQuery D: Find all products whose name contains 'sheet'");
console.log(db.prepare("SELECT * FROM products WHERE name LIKE ?").all('%sheet%'));

console.log('\nQuery E: Get all products sorted by price, highest first');
console.log(db.prepare('SELECT * FROM products ORDER BY price DESC').all());

console.log('\nQuery F: Get only the 2 most expensive products');
console.log(db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all());

console.log('\nQuery G: Update Cement price to 38,000 and confirm');
db.prepare('UPDATE products SET price = ? WHERE id = ?').run(38000, 1);
console.log(db.prepare('SELECT * FROM products WHERE id = ?').get(1));
console.log('\nAll products after update:');
console.log(db.prepare('SELECT * FROM products').all());