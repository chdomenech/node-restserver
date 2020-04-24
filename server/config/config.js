// =======================
//  Puerto
// =======================
process.env.PORT = process.env.PORT || 3001;

// =======================
//  Entorno
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// =======================
//  Fecha de vencimiento
// =======================
process.env.CADUCIDAD_TOKEN = Math.floor(Date.now() / 1000) + 60 * 60;

// =======================
//  Seed
// =======================
process.env.SEED = process.env.SEED || "QUITO-PICHINCHA";

// =======================
//  Base de datos
// =======================
let urlDB;
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
