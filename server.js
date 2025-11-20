const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const name = req.query.name || "world";

  // VULNÉRABILITÉ XSS : on injecte la valeur de 'name' sans échappement
  res.send(`
    <html>
      <head><title>DAST Lab App</title></head>
      <body>
        <h1>DAST Lab App</h1>
        <p>Bonjour ${name}</p>
        <p>Essayez un payload XSS dans le paramètre <code>?name=</code>.</p>
      </body>
    </html>
  `);
});

app.get("/search", (req, res) => {
  const q = req.query.q || "";
  // Encore une réponse non échappée
  res.send(`<p>Résultats de recherche pour : ${q}</p>`);
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
