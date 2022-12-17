const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const tourSchema = require('../schema/tourSchema');

// eslint-disable-next-line new-cap
const Tour = new mongoose.model('Tour', tourSchema);
// tours post method
router.post('/add', async (req, res) => {
    try {
        const newtour = await Tour(req.body);
        newtour.save();
        res.status(200).json({
            message: 'Data inserted successfully',
        });
    } catch {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

module.exports = router;
