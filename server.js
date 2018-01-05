/**
 * Created by Austin Jones on 7/5/2017.
 */
import 'babel-polyfill'; // Required for transpiling ES6
import jwks from 'jwks-rsa';
import jwt from 'express-jwt';
import express from 'express';
import Logger from 'le_node';
import bodyParser from 'body-parser';
import * as listeners from './controllers';
import config from './config.json';

const app = express();

const port = process.env.PORT || 3000;

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://starlightgroup.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://api.tacticalmastery.com',
    issuer: "https://starlightgroup.auth0.com/",
    algorithms: ['RS256']
});

// Enable the use of the jwtCheck middleware in all of our routes
app.use(jwtCheck);

// Logging through LogEntries
const logger = new Logger({
    token: 'a1021c70-b3fe-4f55-8ed8-4e703a13665e'
});

// If we do not get the correct credentials, we’ll return an appropriate message
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError' && req.path !== '/health') {
        logger.err("Invalid API token received");
        res.status(401).json({ message: 'Missing or invalid token' });
    }
    // Return 200 if health check
    else if(err.name === 'UnauthorizedError' && req.path === '/health') {
        res.status(200).send();
    }
});

// Konnektive API credentials
const konnektive_api_user = 'konnektive_api_user';
const konnektive_password = config.konnektive_password;
const campaignId = 3;
const country = 'US';
const billShipSame = 1;
const paySource = 'CREDITCARD';
const product1_qty = 1;

const guard = (req, res, next) => {
    if(req.path === '/health') {
        res.status(200).send();
        next();
    }
    const permissions = ['frontend'];
    for (let i = 0; i < permissions.length; i++) {
        if (req.user.scope.includes(permissions[i])) {
            next();
        } else {
            logger.debug('Forbidden request received from ' + request.headers['x-forwarded-for']);
            res.status(403).send({message: 'Forbidden'});
        }
    }
};

app.use(guard);
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(port, "0.0.0.0", () => {
    logger.info('Server started on port ' + port);
    console.log('API listening on port ' + port);
});

module.exports = {
    campaignId,
    country,
    billShipSame,
    paySource,
    product1_qty,
    konnektive_api_user,
    konnektive_password,
    app,
};

// Return health check for AWS
app.get('/health', () => {
    // do nothing, status already sent
});

// Create lead
app.post('/lead', listeners.createLead);

// Create order
app.post('/order', listeners.createOrder);

// Update order (upsell)
app.put('/order', listeners.updateOrder);

// Get order data
app.get('/order/:id', listeners.getOrder);