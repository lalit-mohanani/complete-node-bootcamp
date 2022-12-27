const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requested : req.requestTime,
        result: tours.length,
        data: {
            tours
        }
    });
};
exports.getTour = (req, res) => {
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
exports.addTour = (req, res)=>{
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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