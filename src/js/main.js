
const submitButton = document.getElementById('submit');
const output = document.getElementById('output');

const obj = document.getElementById('obj');
const pc1 = document.getElementById('pc1');
const pc2 = document.getElementById('pc2');

const c1c1 = document.getElementById('c1c1');
const c1c2 = document.getElementById('c1c2');
const rhs1 = document.getElementById('rhs1');

const c2c1 = document.getElementById('c2c1');
const c2c2 = document.getElementById('c2c2');
const rhs2 = document.getElementById('rhs2');

const c3c1 = document.getElementById('c3c1');
const c3c2 = document.getElementById('c3c2');
const rhs3 = document.getElementById('rhs3');

const c4c1 = document.getElementById('c4c1');
const c4c2 = document.getElementById('c4c2');
const rhs4 = document.getElementById('rhs4');

const c5c1 = document.getElementById('c5c1');
const c5c2 = document.getElementById('c5c2');
const rhs5 = document.getElementById('rhs5');

const axios = require('axios');
const api = axios.create({
    baseURL: "http://localhost:4001/api/"
});

submitButton.onclick = function() {submitForm()};

function submitForm() {
    var constInput = [[c1c1.value, c1c2.value, rhs1.value],[c2c1.value, c2c2.value, rhs2.value],[c3c1.value, c3c2.value, rhs3.value],[c4c1.value, c4c2.value, rhs4.value],[c5c1.value, c5c2.value, rhs5.value]]
    var constInfo = []
    for(var i = 0; i < 5; i++) {
        if(constInput[i][0]&&constInput[i][1]&&constInput[i][2]) constInfo.push(constInput[i]);
    }

    checkProblem(Number(pc1.value), Number(pc2.value), obj.value, constInfo);
}

function constraintsToObjective(infoArray){
    var outArray = []
    for(var i=0; i < infoArray.length; i++) {
        var constObj = {};
        constObj.coeff1 = Number(infoArray[i][0]);
        constObj.coeff2 = Number(infoArray[i][1]);
        constObj.rhs = Number(infoArray[i][2]);
        outArray.push(constObj);
    }
    return outArray;
}

function checkProblem(coeff1, coeff2, objective, constInfo) {
    api.get(`problems?where={"coeff1":"${coeff1}","coeff2":"${coeff2}", "objective":"${objective}"}`)
    .then((value)=>{
        checkConstraints(coeff1, coeff2, objective, constInfo);
    })
    .catch((err)=>{
        api.post(`/problems`,{
            "coeff1": coeff1,
            "coeff2": coeff2,
            "objective" : objective,
            "constraints": constraintsToObjective(constInfo)
        })
        .then(()=>{
            output.innerHTML = "The solution to this problem has not been obtained yet.";
        })
    })
}

function checkConstraints(coeff1, coeff2, objective, constInfo) {
    var constraints = constraintsToObjective(constInfo);
    var promises = [];
    
    for(var i=0 ; i<constraints.length; i++) {
        promises.push(api.get(`constraints?where={"coeff1":${constraints[i].coeff1},"coeff2":${constraints[i].coeff2}, "rhs":${constraints[i].rhs}}`))
        // .then((value)=>{
        //     promises.push(api.get(`constraints?where={"coeff1":${constraints[i].coeff1},"coeff2":${constraints[i].coeff2}, "rhs":${constraints[i].rhs}}`));
        // })
        // .catch((err)=>{
        //     notFoundFlag = true;
        //     promises.push(Promise.resolve());
        // })
        
    }

    var notFoundFlag = false;
    Promise.allSettled(promises)
    .then((checked)=>{
        checked.forEach((c) => {
            if(c.status == 'rejected') notFoundFlag = true;
        });
        if(notFoundFlag) {
            api.post(`/problems`,{
                "coeff1": coeff1,
                "coeff2": coeff2,
                "objective" : objective,
                "constraints": constraints
            })
            .then(()=>{
                output.innerHTML = "The solution to this problem has not been obtained yet.";
            })
        }
        else {
            api.get(`problems?where={"coeff1":"${coeff1}","coeff2":"${coeff2}", "objective":"${objective}"}`)
            .then((foundProblem)=>{
                var solution = foundProblem.data.data[0].solution
                output.innerHTML = `This problem has already been solved. The solution (x1,x2,Z) is : ${solution}`;
            })
        }
    })
}