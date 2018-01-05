/**
 * Created by austin on 7/14/2017.
 */

import sinon from 'sinon';
import chai from 'chai'
import assert from 'assert';
import * as defaults from "../app";

import request from 'express';
import {describe, it} from "mocha";

describe('GET /order/:id', () => {
    it('returns an order', () => {

        const id = '9E83D29D94';
        let kon_result = {};

        // Set options for GET
        const options = {
            method: 'GET',
            uri: 'https://api.konnektive.com/transactions/query/',
            qs: {
                loginId: defaults.konnektive_user,
                password: defaults.konnektive_pass,
                orderId: id,
            },
            json: true, // Automatically parses the JSON string in the response
        };
        request(options)
            .then((response) => {
                kon_result = response;
            });

        request.get('/order/' + id)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.eql(kon_result);
                done(err);
            });


    })

});