var express = require('express');
var router = express.Router();

router.get('/insertToDB', function(req, res) {
    var db = req.db;
    var collection = db.get('pordactcolection');

    var document = {
        name: "para",
        img: "/images/para.jpg",
        price: 70,
        stock: 100
    };

    collection.insert(document, function(err, doc) {
        if (err === null) {
            res.send(doc._id);
        }
    });
});

router.get('/getProdacts', function(req, res) {
    var db = req.db;
    var collection = db.get('pordactcolection');

    collection.find({}, function(err, doc) {
        if (err === null) {
                res.send(doc);
        } else {
            res.send(err);
        }
    });
});

module.exports = router;