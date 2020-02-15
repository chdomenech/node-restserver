// =======================
//  Puerto
// =======================
process.env.PORT = process.env.PORT || 3001;

// =======================
//  Entorno
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
//  Base de datos
// =======================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://root_mongodb:LJWUzgTAXzjNSYWj@cluster0-liv4w.mongodb.net/cafe'
}

process.env.URLDB = urlDB;