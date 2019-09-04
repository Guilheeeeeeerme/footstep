var MongoClient = require('mongodb').MongoClient;
var express = require('express');
const assert = require('assert');
var app = express();

const dbHost = '94.237.88.211';
const dbPort = 27017;
const dbName = 'footstep';
const url = `mongodb://${dbHost}:${dbPort}/`;

app.get('/add/:nome', function (req, res) {

    const nome = req.params.nome;

    // Create a new MongoClient
    const client = new MongoClient(url);

    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        const clientId = `${nome}`;
        const email = `${nome}@footstep.com.br`;


        // Criar user (com password = senha):
        // > db.users.insert({ "email" : "email@sitedomain.com.br", "password" : "$1$gaHlzvZS$6Y9w0.GwD5kH3rOSmnYoh/" });
        // Registrar um client_id no mongo:
        // > db.clients.insert({ "client_id" : "id-unico-para-site", "name" : "Nome do Site" });
        // > db.users.update({email: "email@sitedomain.com.br"}, {$addToSet: {client_id: 'id-unico-para-site'}});

        db.collection('users').insertOne({ "email": email, "password": "$1$gaHlzvZS$6Y9w0.GwD5kH3rOSmnYoh/" }, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);

            db.collection('clients').insertOne({ "client_id": clientId, "name": "Footstep Jobs" }, function (err, r) {
                assert.equal(null, err);
                assert.equal(1, r.insertedCount);

                db.collection('users').updateOne({ email: email }, { $addToSet: { client_id: clientId } }, function (err, r) {
                    assert.equal(null, err);
                    // assert.equal(1, r.modifiedCount);

                    res.send(r);

                });

            });

        });

    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});