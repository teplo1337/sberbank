const express         = require('express'),
      app             = express(),
      mongodb         = require('mongodb'),
      mongoClient     = mongodb.MongoClient,
      bodyParser      = require('body-parser'),
      parseJson       = bodyParser.json(),
      dbUri           = 'mongodb://root:1@ds046667.mlab.com:46667/room-reservation';
      
/* date */

let date = {
    now: () => {
        let date = new Date();
        let now = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return now;
    } 
}

/* router */

let router = (app, db) => {
    
    const collection = db.collection('days');
 
    /* rest api */

    /* get day data */

    app.get('/api/', (req, res) => {       
        console.log(req.query.day) 
        collection.find(
            {
                "day": req.query.day
            }        
        ).toArray(function(err, result) {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });

    /* insert new day */

    app.post('/api/', parseJson, (req, res) => {
        const day = {
            "day": req.body.day,
            "title": req.body.title,
            "room_id": req.body.room_id,
            "who": req.body.who,
            "start_time": req.body.start_time,
            "end_time": req.body.end_time
        };
        collection.insert(day, function(err, result) {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });

    /*  insert new data in day
        or edit old data       */

    app.put('/api/', parseJson, (req, res) => {
        collection.update(
            {
                _id: new mongodb.ObjectID(req.params.id)
            },
            { $set: 
                { 
                    "day": req.body.day,
                    "title": req.body.title,
                    "room_id": req.body.room_id,
                    "who": req.body.who,
                    "start_time": req.body.start_time,
                    "end_time": req.body.end_time
                    
                }
            }
          ,(err, result) => {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
          });
    });
    
    app.delete('/api/:id', (req, res) => {
        collection.remove({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });
}

/* db connect */

mongoClient.connect(dbUri, (err, db) => {
    router(app, db);
});

/* start server */

app.listen(8890, function () {
    console.log('listen 8890'+ ' at ' + date.now());

});