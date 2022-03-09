const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  let operator : string = req.query.operator;
  let num1 : number = +req.query.num1;
  let num2 : number = +req.query.num2;
  let result : number = null;

  if(operator=="dod")
    result=num1+num2;
  else if(operator=="ode")
    result=num1-num2;
  else if(operator=="mno")
    result=num1*num2;
  else if(operator=="pod")
    result=num1/num2;
  
res.send(result.toString());


})

app.listen(3000)  