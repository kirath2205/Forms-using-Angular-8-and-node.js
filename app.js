var createError = require('http-errors');
var express = require('express');
var bodyParser=require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var pg=require('pg');

exports.config ={

user:'postgres',
database:'urecadata',
password:'1234',
host:'localhost',
port:5432

}

const pool = new pg.Pool(exports.config);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());
/*app.get('/getdata',function(req,res){

res.send('This is express response');

})*/


app.get('/getData',function(req,res){

    pool.connect((err,client,release)=>{

        if(err){
            return console.log(err);
        }
client.query('select * from sign',function(err,result){

release();

    if(err){
        return console.log(err);
    }

    res.send(result.rows);

});




    })

    })



    app.post('/insertData/:first/:last',function(req,res){
        var first=req.params.first;
        var last=req.params.last;

        pool.connect((err,client,release)=>{

            if(err){
                return console.log(err);
            }
    client.query(`INSERT INTO tbl_attendance (first_name , last_name)
    VALUES('${first}','${last}');`,function(err,result){

    release();

        if(err){
            return console.log(err);
        }

        res.send(result.rows);

    });




        })

        })


        app.post('/insertDataFromBody',function(req,res){
            var first=req.body.first_name;
            var last=req.body.last_name;
            var email=req.body.email;
            var password=req.body.password;
            var phone=req.body.phone;

            pool.connect((err,client,release)=>{

                if(err){
                    return console.log(err);
                }
        client.query(`INSERT INTO sign (first_name , last_name,email,password,phone)
        VALUES('${first}','${last}','${email}','${password}','${phone}');`,function(err,result){

        release();

            if(err){
                return console.log(err);
            }

            res.send(result.rows);

        });
            })

            })





            app.put('/updateData/:first_name',function(req,res){
                var first=req.params.first_name;
                var last=req.body.last_name;

                pool.connect((err,client,release)=>{

                    if(err){
                        return console.log(err);
                    }
            client.query(`Update tbl_attendance set last_name= '${last}' where first_name='${first}'`,function(err,result){

            release();

                if(err){
                    return console.log(err);
                }

                res.send(result.rows);

            });
                })

                })



                app.delete('/deleteData/:first_name',function(req,res){

                    var first=req.params.first_name;


                    pool.connect((err,client,release)=>{

                        if(err){
                            return console.log(err);
                        }
                client.query(`delete from  tbl_attendance  where first_name='${first}'`,function(err,result){

                release();

                    if(err){
                        return console.log(err);
                    }

                    res.send(result.rows);

                });
                    })

                    })


                    app.get('/showData/:email/:password',function(req,res){
                        var email=req.params.email;
                        var password=req.params.password;

                        pool.connect((err,client,release)=>{

                            if(err){
                                return console.log(err);
                            }
                    client.query(`SELECT * from sign  where email='${email}' and password='${password}'`,function(err,result){

                    release();

                        if(err){
                            return console.log(err);
                        }

                        res.send(result.rows);

                    });
                        })

                        })



                        app.get('/displaycourses/:course',function(req,res){
                            var course=req.params.course;


                            pool.connect((err,client,release)=>{

                                if(err){
                                    return console.log(err);
                                }
                        client.query(`SELECT * from code_subject  where upper(subject) LIKE upper('%${course}%') `,function(err,result){

                        release();

                            if(err){
                                return console.log(err);
                            }

                            res.send(result.rows);

                        });
                            })

                            })


app.post('/login1',function(req,res){


            var user_id=req.body.user_id;
            var password=req.body.password;

            pool.connect((err,client,release)=>{

                if(err){
                    return console.log(err);
                }
        client.query("select * from Login where user_id='"+user_id+"' and password='"+password+"'",function(err,result){

        release();

            if(err){
                return console.log(err);
            }

            res.send({status:true});

        });




            })

            })




module.exports = app;
