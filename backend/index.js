import express from "express";
import cors from "cors";
import morgan from "morgan";
import Database from "better-sqlite3";

// Setup DB
const db = new Database("todo.db", {});

// Create table
const tableName = "Todos";
const tableField =
  "(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL UNIQUE)";
db.prepare(`CREATE TABLE IF NOT EXISTS ${tableName} ${tableField}`).run();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// get TODOs
app.get("/", (req, res) => {
  const todos = db.prepare(`SELECT * FROM ${tableName}`).all();
  res.json({ todos });
});

// add TODO
app.post("/", (req, res) => {
  console.log("helloooo!!!");
  console.log(req.body);
  if (!req.body.text)
    return res.status(400).json({ status: "err", reason: "missing todo text" });
  try {
    db.prepare(`INSERT INTO ${tableName} (text) VALUES (?)`).run(req.body.text);
    const todos = db.prepare(`SELECT * FROM ${tableName}`).all();
    res.json({ todos });
  } catch (e) {
    const todos = db.prepare(`SELECT * FROM ${tableName}`).all();
    res.status(400).json({ status: "err", reason: e.message, todos });
  }
});

// remove TODO
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(id);
  const todos = db.prepare(`SELECT * FROM ${tableName}`).all();
  res.json({ todos });
});

// START SERVER
app.listen(8080, () => console.log(`Listening on port 8080`));
