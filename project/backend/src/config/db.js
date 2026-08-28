// db.js
// A single shared connection pool to SQL Server. Every route in server.js
// imports `poolPromise` from here rather than opening its own connection --
// connections are expensive to create, so you want one pool reused
// across all requests.

import "dotenv/config";
import sql from "mssql";

// Two ways to configure this, pick whichever matches your .env:
//
// 1) DB_CONNECTION_STRING -- paste your full SSMS/ADO.NET-style string.
//    This is the path for "I already have a connection string" -- mssql
//    understands the same format SSMS uses.
//
// 2) Individual DB_USER / DB_PASSWORD / DB_SERVER / etc -- used only if
//    no connection string is provided. This is what the Docker tutorial
//    setup used.

let poolPromise;

if (process.env.DB_CONNECTION_STRING) {
  poolPromise = sql.connect(process.env.DB_CONNECTION_STRING);
} else {
  const config = {
    user: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "YourStrong!Passw0rd",
    server: process.env.DB_SERVER || "localhost",
    database: process.env.DB_NAME || "TodoTutorial",
    options: {
      trustServerCertificate: true,
      encrypt: false,
    },
  };

  // Named instances (e.g. SQLEXPRESS) are addressed by instance name, not
  // a fixed port -- port and instanceName are mutually exclusive here.
  // Set DB_INSTANCE in .env for a named instance; otherwise DB_PORT is used.
  if (process.env.DB_INSTANCE) {
    config.options.instanceName = process.env.DB_INSTANCE;
  } else {
    config.port = Number(process.env.DB_PORT) || 1433;
  }

  poolPromise = sql.connect(config);
}

poolPromise = poolPromise
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    throw err;
  });

export { poolPromise, sql };
