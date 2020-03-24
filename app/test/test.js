// IMPORT NODEJS MODULES
    const request = require('supertest');
    const express = require('express');
    const app = require('../app');
// IMPORTING LANG AND DEBUG
    const dotenv = require('dotenv').config();
    const langServer = `../lang/${( process.env.LANG_SERVER || 'eng' )}`;
    const lang = require(langServer);
    if (process.env.NODE_ENV_DEV || process.env.NODE_DEV_ENV_VAR)
        console.log(lang.LABEL_TEST_LANG, lang.LABEL_LANG);
// INIT TESTING
describe(lang.LABEL_TEST_API, () => {
    describe(lang.LABEL_TEST_API_GET, () => {
        describe(lang.LABEL_TEST_API_GET_PROVINCE_ALL, () => {
            it(lang.LABEL_TEST_API_PROVINCE_ALL_INFO, done =>
            {
                request(app)
                .get('/api/v1/province/all')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            }).timeout(10000);
        });

        describe(lang.LABEL_TEST_API_GET_REGION_ALL, () => {
            it(lang.LABEL_TEST_API_REGION_ALL_INFO, done =>
            {
                request(app)
                .get('/api/v1/region/all')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            }).timeout(10000);
        });

        describe(lang.LABEL_TEST_API_GET_NATIONAL_ALL, () => {
            it(lang.LABEL_TEST_API_NATIONAL_ALL_INFO, done =>
            {
                request(app)
                .get('/api/v1/national/all')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            }).timeout(10000);
        });
    });
});