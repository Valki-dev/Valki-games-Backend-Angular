// const fs = require("fs");
// const csv = require("fast-csv");
// const { log } = require("console");
const { Videogame } = require("../models/Videogame")

// const fileUpload =  (req, res) => {
//     let videogames = [];

//     fs.createReadStream(`${__dirname}/../../files/${req.file.filename}`)
//         .pipe(csv.parse({ headers: true, ignoreEmpty: true, delimiter: ";", quote: '"' }))
//         .on('error', (err) => {
//             console.log(err);
//             res.status(500).send({status: false});
//         })
//         .on('data', async (row) => {
//             videogames.push(row);
//             console.log(videogames);
//             await Videogame.bulkCreate(videogames);
//         })
//         .on("end", () => {
//             videogames = [...videogames];
//             res.status(200).send({status: true});
//         });
// }

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
      console.log(err);
      res.status(500).send({});
    })
    .on('data', (chunk) => {
      // Aca esta iterando y añadiendo cada fila del csv al array
      videogames.push(chunk);

    })
    .on('end', async () => {
      // Hacemos un spread del array asi obtenmos la data en un solo array;, para no enviar datos repetidos
      videogames = [...videogames];
      console.log(videogames);
      await Videogame.bulkCreate(videogames);
      res.status(200).send(videogames);
    });
};

module.exports = { fileUpload }