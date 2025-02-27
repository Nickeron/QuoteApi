const express = require("express");

const { quotes } = require("./data").default;
const { getRandomElement } = require("./utils");
const quotesRouter = express.Router();

quotesRouter.get("/random", (request, response, next) => {
  const quote = getRandomElement(quotes);
  response.status(200).send({ quote: quote });
});

quotesRouter.get("/", (request, response, next) => {
  const { person } = request.query;
  if (person) {
    const quotesByPerson = quotes.filter((quote) => quote.person === person);
    response.send({ quotes: quotesByPerson });
  } else {
    response.send({ quotes: quotes });
  }
});

quotesRouter.post("/", (request, response, next) => {
  if (request.query.person && request.query.quote) {
    const newQuote = {
      quote: request.query.quote,
      person: request.query.person,
    };
    quotes.push(newQuote);
    response.status(201).send({ quote: newQuote });
  } else {
    response.status(400).send();
  }
});

quotesRouter.delete("/:quoteId", (request, response, next) => {
  const quoteId = Number(request.params.quoteId);
  const quoteIndex = quotes.findIndex((quote) => quote.id === quoteId);
  if (quoteIndex !== -1) {
    quotes.splice(quoteIndex, 1);
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

quotesRouter.put("/:quoteId", (request, response, next) => {
  const quoteId = Number(request.params.quoteId);
  const quoteIndex = quotes.findIndex((quote) => quote.id === quoteId);
  if (quoteIndex !== -1) {
    const updatedQuote = {
      id: quoteId,
      quote: request.query.quote,
      person: request.query.person,
    };
    quotes.splice(quoteIndex, 1, updatedQuote);
    response.send({ quote: updatedQuote });
  } else {
    response.status(404).send();
  }
});

module.exports = quotesRouter;
