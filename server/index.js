const keys = require('./keys');

// Express app setup
const express = require('express');
const bodyParser = require('bodyParser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PG client setup
const { Pool } = require('pg');
const pgClient = new Pool({
   user: keys.pgUser,
   host: keys.pgHost,
   database: keys.pgDatabase,
   password: keys.pgPassword,
   port: keys.pgPort
});

pgClient.on("connect", (client) => {
        client
            .query("CREATE TABLE IF NOT EXIST values (number INT)")
            .catch(err => console.log(err));
});

// Express route handlers
app.get('/', (req, res) => {
    res.send('Hi');
});

// Redis client setup

const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

app.get('/values/all', async (req, res) => {
   const values = await pgClient.query('SELECT * FROM values');
   res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redis.client.hgetall('values', (err, rvalues) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
   const index = parseInt(req.body.index);

   if (index > 40) {
       res.status(422).send('only indexes less than 40 are supported');

       redisClient.hset('values', index, 'Nothing yet!');
       redisPublisher.publish('insert', index);
       pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

       res.send({ working: true });
   }
});

app.listen(5000, err => {
    console.log('listening');
})

