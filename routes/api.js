'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;

      if (!puzzle || !coordinate || !value) {
        res.json({ error: 'Required field(s) missing' })
        return
      }
      
     if (puzzle.length != 81) {
       res.json({ error: 'Expected puzzle to be 81 characters long' })
       return 
     }

     if (/[^1-9.]/g.test(puzzle)) {
       res.json({ error: 'Invalid characters in puzzle' })
       return 
     }

     console.log(coordinate)

     let row = coordinate[0]
     let column = coordinate[1]

     if( coordinate.length !== 2 || !/[a-i]/i.test(row) || !/[1-9]/i.test(column)) {
      res.json({ error: 'Invalid coordinate'})
      return 
     }

     if(value.length != 1 || !/[1-9]/i.test(value)) {
      res.json({ error: 'Invalid value'})
      return
     }

     let conflictArray = []
     let validRow = solver.checkRowPlacement(puzzle, row, column, value)
     let validCol = solver.checkColPlacement(puzzle, row, column, value)
     let validBox = solver.checkRegionPlacement(puzzle, row, column, value)
     let validSquare = solver.checkSquarePlacement(puzzle, row, column, value)
     console.log(validSquare);

     if (!validRow) conflictArray.push('row');
     if (!validCol) conflictArray.push('column');
     if (!validBox) conflictArray.push('region');   


     return validRow && validCol && validBox ? res.json({valid: true}) : validSquare ? res.json({valid: true}) : res.json({valid: false, conflict: conflictArray})

  })

  app.route('/api/solve')
 
    .post((req, res) => {
      let puzzle = req.body.puzzle;

      if (!puzzle) {
         res.json({ error: 'Required field missing' })
         return
      }
      if (puzzle.length != 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return 
      }
      if (/[^1-9.]/g.test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' })
        return 
      }
      
      let solved = solver.solve(puzzle)
      if (solved) {
        console.log(solved)
        res.json({solution: solved})
      }
      else {
        res.json({ error: 'Puzzle cannot be solved' })
      }

    });
};
