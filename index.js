const express = require('express');
const bodyParser = require('body-parser');
var createsend = require('createsend-node');
const hbs = require('hbs');



const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;



var auth = { apiKey: 'rRqs0ZRCR5SpvpBcEihc/MH9y3zI+htzXcOLnkWraOHM6c9qR6RL/jDpYepA73jmHvxxPD4H2E7ypjmjW4VGxWnRIq2V1ekMqWY5P52VHYvHZGcoNQV6SFsUdradTbGrFj9aJPSKt2pnK4S/WbEGiQ==' };
var api = new createsend(auth);
var listId = 'dabb329b9c92c5f5262377d0c5441659' // The ID of the list
var testList = '6be75a3c3c4cedfe89cc85b742bed429'


app.get("/send-user/:name/:email", (req, res) => {
    var user = {
        EmailAddress: req.params.email,
        Name: req.params.name,
        CustomFields: [
            { Key: 'asesoria', Value: 1 }
        ]
    };
    api.subscribers.addSubscriber(listId, user, (err, response) => {
        if (err) {
            res.send(err)
        }
        else {
            res.render('send-user', { email: user.EmailAddress,name:user.Name });
        }
    });

})

app.post("/thank-you", (req, res) => {
    var user = {
        EmailAddress: req.body.email,
        Name: req.body.name,
        CustomFields: [
            { Key: 'company', Value: req.body.company },
            { Key: 'phone', Value: req.body.phone },
            { Key: 'descripcionAsesoria', Value: req.body.descripcionAsesoria }
        ]
    };
    api.subscribers.addSubscriber(listId, user, (err, response) => {
        if (err) {
            res.send(err)
        }
        else {
            res.render('thank-you');
        }
    });
})


app.listen(port, () => {
    console.log("Servidor inicilizado en ", port)
});