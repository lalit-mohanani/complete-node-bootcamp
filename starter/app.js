const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
// app.get('/', (req, res) => {
//     res
//     .status(200)
//     .json({
//         message: "Hello, world!",
//         app: "Natours!"
//     });
// });

// app.post('/', (req, res) => {
//     res.send("time paas")
// });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });
});

app.post('/api/v1/tours', (req, res)=>{
    // console.log(req.body);
    const newId = tours[tours.length - 1].id +1;
    const newTours = Object.assign({id: newId},req.body);
    tours.push(newTours);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
        res.status(201).json({
            status: 'success',
            data: {
                tours:newTours
            }
        });
    });
    res.send("done");
});
const port = 3000;
app.listen(port,()=> {
    console.log(`listening on port ${port}`);
});

