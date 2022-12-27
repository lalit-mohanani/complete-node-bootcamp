const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });
};
const getTour = (req, res) => {
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
};
const addTour = (req, res)=>{
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
};
const updateTour = (req, res) => {
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
};
const deleteTour = (req, res) => {
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
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(addTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);    

const port = 3000;
app.listen(port,()=> {
    console.log(`listening on port ${port}`);
});

