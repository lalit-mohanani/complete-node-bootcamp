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
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });
});

app.get('/api/v1/tours/:id?', (req, res) => {
    // console.log(req.params);
    const tour = tours.find(el => el.id === req.params.id*1);    
    // if (req.params.id*1 > tours.length){
    if (!tour){    
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    
    res.status(200).json({
        status: 'success',
        // result: tours.length,
        data: {
            tour
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
    // res.send("done");
});

app.patch('/api/v1/tours/:id', (req, res) => {
    const tour = tours.find(el => el.id === req.params.id*1);    
    if (!tour){    
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tours:'<Updated Tour>'
        }
    });
});

app.delete('/api/v1/tours/:id', (req, res) => {
    const tour = tours.find(el => el.id === req.params.id*1);    
    if (!tour){    
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});

const port = 3000;
app.listen(port,()=> {
    console.log(`listening on port ${port}`);
});

