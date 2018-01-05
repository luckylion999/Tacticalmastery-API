/**
 * Created by austin on 7/17/2017.
 */

// TODO handle promise rejection

import xss from 'xss';
import request from 'request-promise';
import config from './config.json';
import Logger from 'le_node';

let body = {};
const campaignId = 3; // Defined in Konnektive
const country = 'US';
const billShipSame = 1;
const paySource = 'CREDITCARD';

// Logging through LogEntries
const logger = new Logger({
    token: 'a1021c70-b3fe-4f55-8ed8-4e703a13665e'
});

/**
 * Creates Leads in Konnektive
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
async function createLead(req, res)
{
    body = {};
    console.log('Received POST /lead');

    body.emailAddress = xss(req.body.emailAddress);
    body.firstName = xss(req.body.firstName);
    body.lastName = xss(req.body.lastName);
    body.phoneNumber = xss(req.body.phoneNumber);
    body.loginId = 'konnektive_api_user';
    body.password = config.konnektive_password;
    body.campaignId = campaignId;

    const options = {
        method: 'POST',
        uri: 'https://api.konnektive.com/leads/import/',
        qs: body,
        json: true, // Automatically parses the JSON string in the response
    };

    return request(options)
        .then((response) => {
            // Respond with error from Konnektive
            if (response.result === 'ERROR') {
                console.log('error', response.message);
                logger.crit('KONNEKTIVE ERROR ' + response.message);
                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE' });
            }
            else {
                // Send Konnektive response and OrderId back to user
                res.status(200).send({
                    message: response.result,
                    orderId: response.message.orderId,
                })
            }
        })
        .catch((err) => {
            console.log('error', err.message);
            logger.crit('ERROR ' + err.message);
            res.status(500).send({ error: err.message, referrer: 'TM'});
        });
}

// TODO store orderId
async function createOrder(req, res)
{
    console.log('Received POST /order');

    body = {};
    body.address1 = xss(req.body.address1);
    body.address2 = xss(req.body.address2);
    body.cardMonth = xss(req.body.cardMonth);
    body.cardNumber = xss(req.body.cardNumber).replace(/\s/g, '');
    body.cardYear = xss(req.body.cardYear);
    body.city = xss(req.body.city);
    body.emailAddress = xss(req.body.emailAddress);
    body.firstName = xss(req.body.firstName);
    body.lastName = xss(req.body.lastName);
    body.orderId = xss(req.body.orderId);
    body.phoneNumber = xss(req.body.phoneNumber);
    body.postalCode = xss(req.body.postalCode);
    body.productId = xss(req.body.productId);
    body.state = xss(req.body.state);
    body.country = country;
    body.billShipSame = billShipSame;
    body.campaignId = campaignId;
    body.paySource = paySource;
    body.product1_qty = req.body.productQty;
    body.product1_id = req.body.productId;
    body.loginId = 'konnektive_api_user';
    body.password = config.konnektive_password;

    // Enable test cards
    if(body.cardNumber === '0000000000000000')
    {
        body.cardSecurityCode = '100';
    }

    const options = {
        method: 'POST',
        uri: 'https://api.konnektive.com/order/import/',
        qs: body,
        json: true, // Automatically parses the JSON string in the response
    };

    return request(options)
        .then((response) => {
            // Respond with error from Konnektive
            if (response.result === 'ERROR') {
                console.log('error', response.message);
                logger.crit('KONNEKTIVE ERROR ' + response.message);
                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE'});
            }
            else {
                // Send Konnektive response and OrderId back to user
                res.status(200).send({
                    message: response.result,
                    orderId: response.message.orderId,
                })
            }
        })
        .catch((err) => {
            console.log('error', err.message);
            logger.crit('ERROR ' + err.message);
            res.status(500).send({ error: err.message, referrer: 'TM'});
        });
}

async function updateOrder(req, res)
{
    console.log('Received PUT /order');
    body = {};
    body.productId = xss(req.body.productId);
    body.productQty = xss(req.body.productQty);
    body.orderId = req.body.orderId; // TODO pull orderId

    body.loginId = 'konnektive_api_user';
    body.password = config.konnektive_password;

    const options = {
        method: 'POST',
        uri: 'https://api.konnektive.com/upsale/import/',
        qs: body,
        json: true, // Automatically parses the JSON string in the response
    };

    return request(options)
        .then((response) => {
            // Respond with error from Konnektive
            if (response.result === 'ERROR') {
                console.log('error', response.message);
                logger.crit('KONNEKTIVE ERROR ' + response.message);
                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE'});
            }
            else {
                // Send Konnektive response and OrderId back to user
                res.status(200).send({
                    message: response.result,
                    orderId: response.message.orderId,
                })
            }
        })
        .catch((err) => {
            console.log('error', err.message);
            logger.crit('ERROR ' + err.message);
            res.status(500).send({ error: err.message, referrer: 'TM'});
        });
}

async function getOrder(req, res)
{
    logger.debug('GET /order received');
    body = {};

    const id = req.params.id;

    if (!id) {
        return res.error('Order ID not found');
    }
    const options = {
        method: 'GET',
        uri: 'https://api.konnektive.com/order/query/',
        qs: {
            loginId: 'konnektive_api_user',
            password: config.konnektive_password,
            orderId: id,
        },
        json: true, // Automatically parses the JSON string in the response
    };
    return request(options)
        .then((response) => {
            // Respond with error from Konnektive
            if (response.result === 'ERROR') {
                console.log('error', response.message);
                logger.crit('KONNEKTIVE ERROR ' + response.message);
                res.status(200).send({ error: response.message, referrer: 'KONNEKTIVE'});
            }
            else {
                // Send Konnektive response and OrderId back to user
                res.status(200).send({
                    message: response.message,
                    orderId: response.message.orderId,
                })
            }
        })
        .catch((err) => {
            console.log('error', err.message);
            logger.crit('ERROR ' + err.message);
            res.status(500).send({ error: err.message, referrer: 'TM'});
        });
}

module.exports = {
    createLead,
    createOrder,
    updateOrder,
    getOrder
};
