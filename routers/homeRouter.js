const express = require('express');
const Router = express.Router();
const homeSchema = require('../models/homeSchema')
Router.get('/', (err, res) => {
    res.render('register', { title: 'Abhishek Sinha', password: '', email: '' })
})
Router.post('/register', async (req, res) => {
    try {
        const {
            name,
            number,
            email,
            password,
            cpassword

        } = req.body;

        if (password === cpassword) {

            const userData = new homeSchema({
                name,
                number,
                email,
                password
            })
            userData.save(err => {
                if (err) {
                    console.log("err")
                } else {
                    res.render('register', { title: 'SignUp completed', password: '', email: '' })
                }
            })

            const useremail = await homeSchema.findOne({ email: email });
            if (email === useremail.email) {
                res.render('register', { title: '', password: '', email: 'email already registered' })

            } else {
                crossOriginIsolated.log('err')
            }

        }
        else {
            res.render('register', { title: '', password: 'password is not matched', email: '' })
        }

    } catch (error) {
        res.render('register', { title: 'Error in code', password: '', email: '' })

    }

})

// login
Router.post('/login',(req,res)=>{
    
    const {
        email,
        password    
    } = req.body;
    homeSchema.findOne({email:email},(err,result)=>{
        if(email === result.email && password === result.password){
            res.render('dashboard', {name : result.name})
        }else{
            console.log(err)

        }
    })
})
module.exports = Router;