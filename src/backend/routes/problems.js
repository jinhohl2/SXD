var Problem = require('../models/problem.js');
var Constraint = require('../models/constraint.js');
const { useResolvedPath } = require('react-router-dom');

module.exports = function (router) {

    var problemRoute = router.route('/problems');

    problemRoute.get((req, res) => {
        var w = "";
        if("where" in req.query && req.query.where != undefined) w = JSON.parse(req.query.where);
        Problem.find()
        .where(w)
        .then((value)=> {
            console.log(value.length);
            if(value.length!=0) {
                console.log("here");
                return res.status(200).send({
                    message: 'Matching Problem Retrieved',
                    data: value
                }); 
            }
            else {
                return res.status(404).send({
                    message: 'Matching Problem Not found',
                    data: value
                });
            }
            
        })
        .catch((err)=>{
            console.log("here3");
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
    });

    problemRoute.post((req,res) => {
        const problem = new Problem();
        if("coeff1" in req.body && req.body.coeff1 != undefined) problem.coeff1 = req.body.coeff1;
        else problem.coeff1 = 0;

        if("coeff2" in req.body && req.body.coeff2 != undefined) problem.coeff2 = req.body.coeff2;
        else problem.coeff2 = 0;

        if("objective" in req.body && req.body.objective!= undefined) problem.objective = req.body.objective;
        else problem.objective = "Max";

        if("constraints" in req.body && req.body.constraints != undefined) problem.constraints = req.body.constraints;
        else problem.constraints = [];

        if("solution" in req.body && req.body.solution != undefined) problem.solution = req.body.solution;
        else problem.solution = [0,0,0];

        var check = [];
        problem.constraints.forEach((c)=> {
            check.push(Constraint.findOne({"coeff1":c.coeff1,"coeff2":c.coeff2,"rhs":c.rhs}).exec());
        });
        Promise.all(check)
        .then((checked)=>{
            var x = 0;
            var newConstIdx = [];
            checked.forEach((c)=>{
                if(c==null) newConstIdx.push(x);
                x++;
            })
            console.log(newConstIdx);
            var promiseArr = [];
            for(var i = 0; i < checked.length; i++) {
                if(newConstIdx.includes(i)) {
                    var newConst = new Constraint();
                    newConst.coeff1 = problem.constraints[i].coeff1;
                    newConst.coeff2 = problem.constraints[i].coeff2;
                    newConst.rhs = problem.constraints[i].rhs;
                    newConst.save()
                    .then((nc)=>{
                        promiseArr.push(nc);
                    })
                    .catch((err)=>{
                        return res.status(500).send({
                            message: 'Server Error',
                            data: []
                        });
                    })
                }
            }
            Promise.all(promiseArr)
            .then(()=>{
                console.log(problem);
                problem.save()
                .then((savedProblem)=>{
                    return res.status(201).send({
                        message: 'New Problem Saved',
                        data: savedProblem
                    });
                })
                .catch((err)=>{
                    console.log("here");
                    return res.status(500).send({
                        message: 'Server Error',
                        data: []
                    });
                })
            })
        })
    });

    return router;
}