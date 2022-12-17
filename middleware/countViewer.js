const mongoose = require('mongoose');
const tourSchema = require('../schema/tourSchema');
// eslint-disable-next-line new-cap
const Tour = new mongoose.model('Tour', tourSchema);
const countViewer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Tour.findOneAndUpdate(
            { _id: id },
            {
                $inc: { count: 1 },
                // eslint-disable-next-line prettier/prettier
            },
        );
        res.status(200).json({
            result: data,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = countViewer;
