const express = require('express');
const mongoose = require('mongoose');
const countViewer = require('../middleware/countViewer');

const router = express.Router();
const tourSchema = require('../schema/tourSchema');

// eslint-disable-next-line new-cap
const Tour = new mongoose.model('Tour', tourSchema);

// paginated tour
router.get('/', async (req, res) => {
    try {
        const { page } = req.query;
        const data = await Tour.find()
            .select({
                _id: 0,
            })
            .sort({ count: -1 })
            .skip(page * 2)
            .limit(2);
        res.status(200).json({
            message: 'Below the all tours',
            result: data,
        });
    } catch {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});
// trending tour
router.get('/trending', async (req, res) => {
    try {
        const data = await Tour.find({})
            .sort({
                count: -1,
            })
            .limit(3);
        res.status(200).json({
            result: data,
        });
    } catch (err) {
        console.log(err);
    }
});

// cheapest tours
router.get('/cheapest', async (req, res) => {
    try {
        const data = await Tour.find({})
            .sort({
                price: 1,
            })
            .limit(3);
        res.status(200).json({
            result: data,
        });
    } catch (err) {
        console.log(err);
    }
});

// search tour by name or price
router.get('/search', async (req, res) => {
    try {
        const data = await Tour.find({
            $or: [{ tourName: req.query.name }, { price: req.query.price }],
        });
        res.status(200).json({
            result: data,
        });
    } catch (err) {
        res.status(500).json({
            error: console.log(err),
        });
    }
});

// viewer Count
router.get('/:id', countViewer, async (req, res) => {
    try {
        const data = await Tour.find({ _id: req.params.id }).select({
            _id: 0,
        });
        res.status(200).json({
            message: 'Below the tour',
            result: data,
        });
    } catch {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

module.exports = router;
