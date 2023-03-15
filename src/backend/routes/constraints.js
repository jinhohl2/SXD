var Problem = require('../models/problem.js');
var Constraint = require('../models/constraint.js');
const { useResolvedPath } = require('react-router-dom');

module.exports = function (router) {

    var constraintRoute = router.route('/constraints');

    constraintRoute.get((req, res) => {
        var w = "";
        if("where" in req.query && req.query.where != undefined) w = JSON.parse(req.query.where);
        
        Constraint.find()
        .where(w)
        .then((value)=> {
            console.log(value);
            console.log(value.dtype)
            if(value.length != 0) {
                console.log("here");
                return res.status(200).send({
                    message: 'Matching Constraint Retrieved',
                    data: value
                });
            }
            else {
                return res.status(404).send({
                    message: 'Matching Constraint Not Found',
                    data: value
                });
            }
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
    });

    constraintRoute.post((req,res) => {
        const constraint = new Constraint();
        if("coeff1" in req.body && req.body.coeff1 != undefined) constraint.coeff1 = req.body.coeff1;
        else constraint.coeff1 = 0;

        if("coeff2" in req.body && req.body.coeff2 != undefined) constraint.coeff2 = req.body.coeff2;
        else constraint.coeff2 = 0;

        if("rhs" in req.body && req.body.rhs!= undefined) constraint.rhs = req.body.rhs;
        else constraint.rhs = 0;

        constraint.save()
        .then((savedConstraint)=>{
            return res.status(201).send({
                message: 'New Constraint Saved',
                data: savedConstraint
            });
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        })
    });

    return router;
}