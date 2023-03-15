var mongoose = require('mongoose');
mongoose.set('debug', true);

var ConstraintSchema = new mongoose.Schema({
    coeff1: {
        type: Number,
        default: 0
    },

    coeff2: {
        type: Number,
        default: 0
    },
    
    rhs: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Constraint', ConstraintSchema);
