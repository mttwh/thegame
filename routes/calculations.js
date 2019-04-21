const express = require('express');
const router = express.Router();

let yearlySalary;

let monthlySalary;
let monthlyBudget;

router.post('/calculate', function(req, res){
    yearlySalary = req.body.yearlySalary;
    let monthlyRent = req.body.monthlyRent;
    let monthlyExpenses = req.body.monthlyExpenses;
    let rent = parseInt(monthlyRent);
    let exp = parseInt(monthlyExpenses);
    
   



    req.checkBody('yearlySalary', 'Please enter your salary').notEmpty();
    req.checkBody('monthlyRent', 'Please enter your rent (even if its 0)').notEmpty();
    req.checkBody('monthlyExpenses', 'Please enter your expenses').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        res.render('index', {
            errors:errors
        });
    } else {
        monthlySalary = (yearlySalary / 12);
        console.log(monthlySalary + "- monthly salary");
        console.log(rent + ' - ' + exp);
        let totalMonthlyExpenses = +rent+exp;
        console.log(totalMonthlyExpenses + ' - total');
        monthlyBudget = (monthlySalary - totalMonthlyExpenses).toFixed(2);
        console.log(monthlyBudget);


        
        console.log(req.body);
        res.redirect('/calculations/budget')
    }
});

router.get('/budget', function(req, res){
    res.render('budget', {
        monthlyBudget:monthlyBudget
    });
});

module.exports = router;