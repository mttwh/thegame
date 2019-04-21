const express = require('express');
const router = express.Router();

let monthlySalary;
let salary;
let balance;

router.post('/calculate', function(req, res){
    monthlySalary = req.body.monthlySalary;
    let monthlyRent = req.body.monthlyRent;
    let expenses = req.body.expenses;
    console.log(monthlySalary + "- salary");
    req.checkBody('monthlySalary', 'Please enter your salary').notEmpty();
    req.checkBody('monthlyRent', 'Please enter your rent (even if its 0)').notEmpty();
    req.checkBody('expenses', 'Please enter your expenses').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        res.render('index', {
            errors:errors
        });
    } else {
        balance = (monthlySalary - (monthlyRent - expenses));
        salary = (monthlySalary * 12);
        
        console.log("Balance - " + balance);
        console.log(req.body);
        res.redirect('/calculations/budget')
    }
});

router.get('/budget', function(req, res){
    res.render('budget', {
        salary:salary,
        balance:balance
    });
});

module.exports = router;