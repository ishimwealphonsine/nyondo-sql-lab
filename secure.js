const Database = require('better-sqlite3');

const db = new Database('nyondo_stock.db');

function validateName(name) {
  if (typeof name !== 'string') {
    console.log('Error: name must be a string');
    return false;
  }

  if (name.length < 2) {
    console.log('Error: name must be at least 2 characters');
    return false;
  }

  if (name.includes('<') || name.includes('>') || name.includes(';')) {
    console.log('Error: name cannot contain < > or ; characters');
    return false;
  }

  return true;
}

function validateUsername(username) {
  if (typeof username !== 'string') {
    console.log('Error: username must be a string');
    return false;
  }

  if (username.length === 0) {
    console.log('Error: username cannot be empty');
    return false;
  }

  if (username.includes(' ')) {
    console.log('Error: username cannot contain spaces');
    return false;
  }

  return true;
}

function validatePassword(password) {
  if (typeof password !== 'string') {
    console.log('Error: password must be a string');
    return false;
  }

  if (password.length < 6) {
    console.log('Error: password must be at least 6 characters');
    return false;
  }

  return true;
}

function searchProductSafe(name) {
  if (!validateName(name)) {
    return null;
  }

  const query = 'SELECT * FROM products WHERE name LIKE ?';
  return db.prepare(query).all(`%${name}%`);
}

function loginSafe(username, password) {
  if (!validateUsername(username) || !validatePassword(password)) {
    return null;
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  return db.prepare(query).get(username, password);
}

console.log('SQL Injection Protection Tests');
console.log('Test 1:', searchProductSafe("' OR 1=1--"));
console.log('Test 2:', searchProductSafe("' UNION SELECT id,username,password,role FROM users--"));
console.log('Test 3:', loginSafe("admin'--", 'anything'));
console.log('Test 4:', loginSafe("' OR '1'='1", "' OR '1'='1"));

console.log('\nInput Validation Tests');
console.log("searchProductSafe('cement'):", searchProductSafe('cement'));
console.log("searchProductSafe(''):", searchProductSafe(''));
console.log("searchProductSafe('<script>'):", searchProductSafe('<script>'));
console.log("loginSafe('admin', 'admin123'):", loginSafe('admin', 'admin123'));
console.log("loginSafe('admin', 'ab'):", loginSafe('admin', 'ab'));
console.log("loginSafe('ad min', 'pass123'):", loginSafe('ad min', 'pass123'));