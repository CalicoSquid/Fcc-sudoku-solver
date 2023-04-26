const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
const solvedString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
const invalidString = 'A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
const invalidLength = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..8088135'
const cantSolve = '.99..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'


chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('/api/solve Functional tests', () => {
        //Solve a puzzle with valid puzzle string: POST request to /api/solve
        test('Solve a puzzle with valid puzzle string', done => {
            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle: puzzleString})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.solution, solvedString)
                done();
            })
        })
        //Solve a puzzle with missing puzzle string: POST request to /api/solve
        test('Solve a puzzle with missing puzzle string', done => {
            chai
            .request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field missing')
                done();
            })
        })
        //Solve a puzzle with invalid characters: POST request to /api/solve
        test('Solve a puzzle with invalid characters', done => {
            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle: invalidString})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle')
                done();
            })
        })
        //Solve a puzzle with incorrect length: POST request to /api/solve
        test('Solve a puzzle with incorrect length', done => {
            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle: invalidLength})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
                done();
            })
        })
        //Solve a puzzle that cannot be solved: POST request to /api/solve
        test('Solve a puzzle that cannot be solved', done => {
            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle: cantSolve})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved')
                done();
            })
        })
    })

    suite('/api/check Functional tests', done => {
        //Check a puzzle placement with all fields: POST request to /api/check
        test('Check a puzzle placement with all fields', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: puzzleString, coordinate: 'A1', value: '7'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, true)
                done();
            })
        })
        //Check a puzzle placement with single placement conflict: POST request to /api/check
        test('Check a puzzle placement with single placement conflict', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: puzzleString, coordinate: 'A1', value: '2'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false)
                assert.equal(res.body.conflict.length, 1 )
                done();
            })
        })
        //Check a puzzle placement with multiple placement conflicts: POST request to /api/check
        test('Check a puzzle placement with multiple placement conflicts', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: puzzleString, coordinate: 'A1', value: '5'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false)
                assert.equal(res.body.conflict.length, 3 )
                done();
            })
        })
        //Check a puzzle placement with all placement conflicts: POST request to /api/check
        test('Check a puzzle placement with multiple placement conflicts', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: puzzleString, coordinate: 'A1', value: '5'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false)
                assert.equal(res.body.conflict.length, 3 )
                done();
            })
        })
        //Check a puzzle placement with missing required fields: POST request to /api/check
        test('Check a puzzle placement with multiple placement conflicts', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: puzzleString, coordinate: 'A1'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field(s) missing')
                done();
            })
        })
        //Check a puzzle placement with invalid characters: POST request to /api/check
        test('Check a puzzle placement with invalid characters', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: invalidString, coordinate: 'A1', value: '7'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle')
                done();
            })
        })
        //Check a puzzle placement with incorrect length: POST request to /api/check
        test('Check a puzzle placement with invalid characters', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: invalidLength, coordinate: 'A1', value: '7'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
                done();
            })
        })
        //Check a puzzle placement with invalid placement coordinate: POST request to /api/check
        test('Check a puzzle placement with invalid characters', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: puzzleString, coordinate: 'Z1', value: '7'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid coordinate')
                done();
            })
        })
        //Check a puzzle placement with invalid placement value: POST request to /api/check
        test('Check a puzzle placement with invalid characters', done => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: puzzleString, coordinate: 'A1', value: 'A'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value')
                done();
            })
        })
    })
});

