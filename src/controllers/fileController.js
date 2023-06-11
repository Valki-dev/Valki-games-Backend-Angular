const { Videogame } = require("../models/Videogame");

const fs = require('fs');
const csv = require('fast-csv');

const fileUpload = (req, res) => {
  let videogames = [];

  fs.createReadStream(`${__dirname}/../../files/${req.file.filename}`, {
    encoding: 'utf-8',
  })
    .pipe(
      csv.parse({
        headers: true,
        quote: '"',
        delimiter: ';',
        encoding: 'UTF-8'
      })
    )
    .on('error', (err) => {
      res.status(500).send({});
    })
    .on('data', (chunk) => {
      videogames.push(chunk);
    })
    .on('end', async () => {
      videogames = [...videogames];
      console.log(videogames);
      await Videogame.bulkCreate(videogames);
      res.status(200).send(videogames);
    });
};

module.exports = { fileUpload }