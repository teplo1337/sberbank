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
        if (req.query.day) {
            collection.find(
                {
                    "day": req.query.day
                }        
            ).toArray((err, result) => {
                (err) ? res.status(500).send(err) : res.status(200).send(result);
            });
        } else {
            res.status(500).send('err');
        } 

    });

    /* insert new day */

    app.post('/api/', parseJson, (req, res) => {
        checkTimes(req.body).then((value) => { 
            if (value) {
                const day = {
                    "day": req.body.day,
                    "title": req.body.title,
                    "room_id": req.body.room_id,
                    "who": req.body.who,
                    "start_time": req.body.start_time,
                    "end_time": req.body.end_time
                };
                collection.insert(day, (err, result) => {
                    (err) ? res.status(500).send(err) : res.status(200).send(result);
                });
            } else {
                res.status(500).end();
            }
        });
    });

    /*  insert new data in day
        or edit old data       */

    app.put('/api/', parseJson, (req, res) => {
        checkTimes(req.body).then((value) => { 
            if (value) {
                collection.update(
                    {_id: new mongodb.ObjectID(req.body._id)},
                    { 
                        $set: { 
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
            } else {
                res.status(500).end();
            }
        });
   
    });

    app.get('/api/:id', (req, res) => { 
        if (req.params.id) {    
            collection.findOne(
                {
                    "rooms": req.params.id
                },        
            (err, result) => {
                (err) ? res.status(500).send(err) : res.status(200).send(result);
            });
        } else {
            res.status(500).send('error');
        }
    });
    
    app.delete('/api/:id', (req, res) => {
        if (req.params.id) {
            collection.remove({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
                (err) ? res.status(500).send(err) : res.status(200).send(result);
            });
        } else {
            res.status(500).send('error');
        }
        
    });
    
    /* check selected tiems in db  */

    let checkTimes = (body) => {        
        return new Promise ((resolve, reject) => {
            if (!body.allowedDates) {
                resolve(false);
            } else {
                let allowedDates = body.allowedDates;
                /* edit */
                if (body._id) {  
                    collection.findOne(
                        {_id: new mongodb.ObjectID(body._id)},      
                            (err, result) => {

                        for(let i = result.start_time; i <= result.end_time; i++) {
                            allowedDates[i] = true;
                        }
            
                        if (check(body, allowedDates)) {
                            resolve(true);

                        } else {
                            resolve(false);
                        }
                    });           

                } else {

                    /* create */
                    
                    if (check(body, allowedDates)) {
                        resolve(true);

                    } else {
                        resolve(false);
                    }
                }

            }          
            
        });
    }
}

let check = (body, allowedDates) => {
    let check = true;
    for(let i = body.start_time; i <= body.end_time; i++) {
        if (!allowedDates[i]) {
            check = false;
        }
    }
    return check;
}


/* db connect */

mongoClient.connect(dbUri, (err, db) => {
    router(app, db);
});

/* start server */

app.listen(8890, () => {
    console.log('listen 8890'+ ' at ' + date.now());

});
