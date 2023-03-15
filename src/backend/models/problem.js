var mongoose = require('mongoose');
mongoose.set('debug', true);

var ProblemSchema = new mongoose.Schema({
    coeff1: {
        type: Number,
        default: 0
    },

    coeff2: {
        type: Number,
        default: 0
    },
    
    objective: {
        type: String,
        default: "Max"
    },

    constraints: {
        type: [Object],
        default: []
    },

    solution: {
        type: [Number],
        default: [0,0,0]
    }
});

module.exports = mongoose.model('Problem', ProblemSchema);
