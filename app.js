const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.get("/pokemon", (req, res) => {
  return res.send(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  let id = req.params.id;

  let foundPokemon = allPokemon.find((elem) => {
    if (typeof elem.id === "number") {
      return elem.id.toString() === id;
    }
    return elem.id === id;
  });

  if (foundPokemon) {
    return res.json(foundPokemon);
  } else {
    return res.json({ msg: "Pokemon not found" });
  }
});

app.get("/pokemon/search", (req, res) => {
  const queryParams = req.query;

  for (let key in queryParams) {
    const foundPokemon = allPokemon.find((elem) => {
      return elem[key].toLowerCase().includes(queryParams[key].toLowerCase());
    });
    if (foundPokemon) {
      return res.json(foundPokemon);
    } else {
      return res.json({ msg: "Contact not found." });
    }
  }
  res.json(queryParams);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
