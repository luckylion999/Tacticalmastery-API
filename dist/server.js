'use strict';

require('babel-polyfill');

var _jwksRsa = require('jwks-rsa');

var _jwksRsa2 = _interopRequireDefault(_jwksRsa);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _le_node = require('le_node');

var _le_node2 = _interopRequireDefault(_le_node);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _controllers = require('./controllers');

var listeners = _interopRequireWildcard(_controllers);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Austin Jones on 7/5/2017.
 */
var app = (0, _express2.default)(); // Required for transpiling ES6


var port = process.env.PORT || 3000;

var jwtCheck = (0, _expressJwt2.default)({
    secret: _jwksRsa2.default.expressJwtSecret({
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
var logger = new _le_node2.default({
    token: 'a1021c70-b3fe-4f55-8ed8-4e703a13665e'
});

// If we do not get the correct credentials, we’ll return an appropriate message
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError' && req.path !== '/health') {
        logger.err("Invalid API token received");
        res.status(401).json({ message: 'Missing or invalid token' });
    }
    // Return 200 if health check
    else if (err.name === 'UnauthorizedError' && req.path === '/health') {
            res.status(200).send();
        }
});

// Konnektive API credentials
var konnektive_api_user = 'konnektive_api_user';
var konnektive_password = _config2.default.konnektive_password;
var campaignId = 3;
var country = 'US';
var billShipSame = 1;
var paySource = 'CREDITCARD';
var product1_qty = 1;

var guard = function guard(req, res, next) {
    if (req.path === '/health') {
        res.status(200).send();
        next();
    }
    var permissions = ['frontend'];
    for (var i = 0; i < permissions.length; i++) {
        if (req.user.scope.includes(permissions[i])) {
            next();
        } else {
            logger.debug('Forbidden request received from ' + request.headers['x-forwarded-for']);
            res.status(403).send({ message: 'Forbidden' });
        }
    }
};

app.use(guard);
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var server = app.listen(port, "0.0.0.0", function () {
    logger.info('Server started on port ' + port);
    console.log('API listening on port ' + port);
});

module.exports = {
    campaignId: campaignId,
    country: country,
    billShipSame: billShipSame,
    paySource: paySource,
    product1_qty: product1_qty,
    konnektive_api_user: konnektive_api_user,
    konnektive_password: konnektive_password,
    app: app
};

// Return health check for AWS
app.get('/health', function () {
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
//# sourceMappingURL=server.js.map