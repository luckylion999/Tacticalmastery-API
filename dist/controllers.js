'use strict';

/**
 * Creates Leads in Konnektive
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
var createLead = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        body = {};
                        console.log('Received POST /lead');

                        body.emailAddress = (0, _xss2.default)(req.body.emailAddress);
                        body.firstName = (0, _xss2.default)(req.body.firstName);
                        body.lastName = (0, _xss2.default)(req.body.lastName);
                        body.phoneNumber = (0, _xss2.default)(req.body.phoneNumber);
                        body.loginId = 'konnektive_api_user';
                        body.password = _config2.default.konnektive_password;
                        body.campaignId = campaignId;

                        options = {
                            method: 'POST',
                            uri: 'https://api.konnektive.com/leads/import/',
                            qs: body,
                            json: true // Automatically parses the JSON string in the response
                        };
                        return _context.abrupt('return', (0, _requestPromise2.default)(options).then(function (response) {
                            // Respond with error from Konnektive
                            if (response.result === 'ERROR') {
                                console.log('error', response.message);
                                logger.crit('KONNEKTIVE ERROR ' + response.message);
                                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE' });
                            } else {
                                // Send Konnektive response and OrderId back to user
                                res.status(200).send({
                                    message: response.result,
                                    orderId: response.message.orderId
                                });
                            }
                        }).catch(function (err) {
                            console.log('error', err.message);
                            logger.crit('ERROR ' + err.message);
                            res.status(500).send({ error: err.message, referrer: 'TM' });
                        }));

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function createLead(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// TODO store orderId


var createOrder = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var options;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('Received POST /order');

                        body = {};
                        body.address1 = (0, _xss2.default)(req.body.address1);
                        body.address2 = (0, _xss2.default)(req.body.address2);
                        body.cardMonth = (0, _xss2.default)(req.body.cardMonth);
                        body.cardNumber = (0, _xss2.default)(req.body.cardNumber).replace(/\s/g, '');
                        body.cardYear = (0, _xss2.default)(req.body.cardYear);
                        body.city = (0, _xss2.default)(req.body.city);
                        body.emailAddress = (0, _xss2.default)(req.body.emailAddress);
                        body.firstName = (0, _xss2.default)(req.body.firstName);
                        body.lastName = (0, _xss2.default)(req.body.lastName);
                        body.orderId = (0, _xss2.default)(req.body.orderId);
                        body.phoneNumber = (0, _xss2.default)(req.body.phoneNumber);
                        body.postalCode = (0, _xss2.default)(req.body.postalCode);
                        body.productId = (0, _xss2.default)(req.body.productId);
                        body.state = (0, _xss2.default)(req.body.state);
                        body.country = country;
                        body.billShipSame = billShipSame;
                        body.campaignId = campaignId;
                        body.paySource = paySource;
                        body.product1_qty = req.body.productQty;
                        body.product1_id = req.body.productId;
                        body.loginId = 'konnektive_api_user';
                        body.password = _config2.default.konnektive_password;

                        // Enable test cards
                        if (body.cardNumber === '0000000000000000') {
                            body.cardSecurityCode = '100';
                        }

                        options = {
                            method: 'POST',
                            uri: 'https://api.konnektive.com/order/import/',
                            qs: body,
                            json: true // Automatically parses the JSON string in the response
                        };
                        return _context2.abrupt('return', (0, _requestPromise2.default)(options).then(function (response) {
                            // Respond with error from Konnektive
                            if (response.result === 'ERROR') {
                                console.log('error', response.message);
                                logger.crit('KONNEKTIVE ERROR ' + response.message);
                                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE' });
                            } else {
                                // Send Konnektive response and OrderId back to user
                                res.status(200).send({
                                    message: response.result,
                                    orderId: response.message.orderId
                                });
                            }
                        }).catch(function (err) {
                            console.log('error', err.message);
                            logger.crit('ERROR ' + err.message);
                            res.status(500).send({ error: err.message, referrer: 'TM' });
                        }));

                    case 27:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function createOrder(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var updateOrder = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var options;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log('Received PUT /order');
                        body = {};
                        body.productId = (0, _xss2.default)(req.body.productId);
                        body.productQty = (0, _xss2.default)(req.body.productQty);
                        body.orderId = req.body.orderId; // TODO pull orderId

                        body.loginId = 'konnektive_api_user';
                        body.password = _config2.default.konnektive_password;

                        options = {
                            method: 'POST',
                            uri: 'https://api.konnektive.com/upsale/import/',
                            qs: body,
                            json: true // Automatically parses the JSON string in the response
                        };
                        return _context3.abrupt('return', (0, _requestPromise2.default)(options).then(function (response) {
                            // Respond with error from Konnektive
                            if (response.result === 'ERROR') {
                                console.log('error', response.message);
                                logger.crit('KONNEKTIVE ERROR ' + response.message);
                                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE' });
                            } else {
                                // Send Konnektive response and OrderId back to user
                                res.status(200).send({
                                    message: response.result,
                                    orderId: response.message.orderId
                                });
                            }
                        }).catch(function (err) {
                            console.log('error', err.message);
                            logger.crit('ERROR ' + err.message);
                            res.status(500).send({ error: err.message, referrer: 'TM' });
                        }));

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function updateOrder(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var getOrder = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var id, options;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        logger.debug('GET /order received');
                        body = {};

                        id = req.params.id;

                        if (id) {
                            _context4.next = 5;
                            break;
                        }

                        return _context4.abrupt('return', res.error('Order ID not found'));

                    case 5:
                        options = {
                            method: 'GET',
                            uri: 'https://api.konnektive.com/order/query/',
                            qs: {
                                loginId: 'konnektive_api_user',
                                password: _config2.default.konnektive_password,
                                orderId: id
                            },
                            json: true // Automatically parses the JSON string in the response
                        };
                        return _context4.abrupt('return', (0, _requestPromise2.default)(options).then(function (response) {
                            // Respond with error from Konnektive
                            if (response.result === 'ERROR') {
                                console.log('error', response.message);
                                logger.crit('KONNEKTIVE ERROR ' + response.message);
                                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE' });
                            } else {
                                // Send Konnektive response and OrderId back to user
                                res.status(200).send({
                                    message: response.message,
                                    orderId: response.message.orderId
                                });
                            }
                        }).catch(function (err) {
                            console.log('error', err.message);
                            logger.crit('ERROR ' + err.message);
                            res.status(500).send({ error: err.message, referrer: 'TM' });
                        }));

                    case 7:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getOrder(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _le_node = require('le_node');

var _le_node2 = _interopRequireDefault(_le_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by austin on 7/17/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

// TODO handle promise rejection

var body = {};
var campaignId = 3; // Defined in Konnektive
var country = 'US';
var billShipSame = 1;
var paySource = 'CREDITCARD';

// Logging through LogEntries
var logger = new _le_node2.default({
    token: 'a1021c70-b3fe-4f55-8ed8-4e703a13665e'
});

module.exports = {
    createLead: createLead,
    createOrder: createOrder,
    updateOrder: updateOrder,
    getOrder: getOrder
};
//# sourceMappingURL=controllers.js.map