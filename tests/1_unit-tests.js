const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
const solvedString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
const invalidString = 'A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
const invalidLength = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..8088135'
const cantSolve = '.99..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..8088135'

suite('Unit Tests', () => {
    suite('Solve tests', () => {
        //Logic handles a valid puzzle string of 81 characters
        test('handles a valid puzzle string of 81 characters', done => {
            assert.equal(solver.solve(puzzleString), solvedString)
            done();
        })
        //Logic handles a puzzle string with invalid characters (not 1-9 or .)
        test('handles a puzzle string with invalid characters (not 1-9 or .)', done => {
            assert.equal(solver.solve(invalidString), false)
            done();
        })
        //Logic handles a puzzle string that is not 81 characters in length
        test('handles a puzzle string that is not 81 characters in length', done => {
            assert.equal(solver.solve(invalidLength), false)
            done();
        })
        //Logic handles a valid row placement
        test('handles a valid row placement', done => {
            assert.equal(solver.checkRowPlacement(puzzleString, 'A', 1, '7'), true)
            done();
        })
        //Logic handles an invalid row placement
        test('handles an invalid row placement', done => {
            assert.equal(solver.checkRowPlacement(puzzleString, 'A', 1, '5'), false)
            done();
        })
        //Logic handles a valid column placement
        test('handles a valid column placement', done => {
            assert.equal(solver.checkRowPlacement(puzzleString, 'A', 1, '7'), true)
            done();
        })
        //Logic handles an invalid column placement
        test('handles an invalid column placement', done => {
            assert.equal(solver.checkRowPlacement(puzzleString, 'A', 1, '1'), false)
            done();
        })
        //Logic handles a valid region (3x3 grid) placement
        test('handles a valid region (3x3 grid) placement', done => {
            assert.equal(solver.checkRegionPlacement(puzzleString, 'A', 1, '7'), true)
            done();
        })
        //Logic handles an invalid region (3x3 grid) placement
        test('handles an invalid region (3x3 grid) placement', done => {
            assert.equal(solver.checkRegionPlacement(puzzleString, 'A', 1, '9'), false)
            done();
        })
        //Valid puzzle strings pass the solver
        test('Valid puzzle strings pass the solver', done => {
            assert.equal(solver.solve(puzzleString), solvedString)
            done();
        })
        //Invalid puzzle strings fail the solver
        test('Invalid puzzle strings fail the solver', done => {
            assert.equal(solver.solve(invalidString), false)
            done();
        })
        //Solver returns the expected solution for an incomplete puzzle
        test('Solver returns the expected solution for an incomplete puzzle', done => {
            assert.equal(solver.solve(cantSolve), false)
            done();
        })
    
        
    })


});
