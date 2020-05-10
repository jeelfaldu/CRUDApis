var express = require('express');
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();
var db = mongojs("mongodb+srv://jeel:6809@studentdata-tm21t.mongodb.net/student?retryWrites=true&w=majority");
//var db = mongojs('student', ['student']);

//Defult path

router.get('/', (req, res, next) => {
    res.write("Hailu");
    res.end();
});
router.post('/addnew', (req, res, next) => {
   console.log(req.body);
    db.student.save({
        "name": req.body,        
    }, (err, data) => {
        if (!err) {
            res.status(200).json({
                msg: "successfully added"
            })
        } else {
            res.status(500).json({
                msg: err
            });
        }
    });
});
//get all record
router.get('/display', (req, res, next) => {

    db.student.find({}, (err, data) => {
        if (!err) {
            res.status(200).json({
                msg: data
            });
        } else {
            res.status(500).json({
                msg: err
            });
        }
    });
});

//add new records
router.post('/addstud', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var pswd = req.body.pswd;

    db.student.save({
        "name": name,
        "email" : email,
        "pswd": pswd
    }, (err, data) => {
        if (!err) {
            res.status(200).json({
                msg: "successfully added"
            })
        } else {
            res.status(500).json({
                msg: err
            });
        }
    });
});

//update record
router.put('/update', (req, res) => {
    db.student.update({
        _id: ObjectId(req.body._id)       
        
    }, {
        $set: {
                name: req.body.name,
                email : req.body.email,
                pswd : req.body.pswd
        }
    }, (err, data) => {

        if (!err) {
            res.status(200).json({
                "msg": data
            });
        } else {
            res.status(200).json({
                "msg": err
            });
        }
    });
})
//delete record
router.delete('/delstud/:id', (req, res) => {
    var t = req.params.id.toString();
    db.student.remove({
        _id: ObjectId(t)
    }, (err, msg) => {
        if (!err) {
            res.status(200).json({
                msg: msg
            });
        } else {
            res.status(500).json({
                msg: err
            });
        }
    })
})
module.exports = router;
