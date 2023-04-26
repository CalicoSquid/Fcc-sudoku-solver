'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  

  app.route('/api/check')
    .post((req, res) => {
      
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      let row = coordinate[0]
      let column = coordinate[1]

      if (!puzzle || !coordinate || !value) return res.json({ error: 'Required field(s) missing' })
      
      if (puzzle.length != 81) return res.json({ error: 'Expected puzzle to be 81 characters long' })

      if (/[^1-9.]/g.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' })

      if ( coordinate.length !== 2 || !/[a-i]/i.test(row) || !/[1-9]/i.test(column)) return res.json({ error: 'Invalid coordinate'})

      if (value.length != 1 || !/[1-9]/i.test(value)) return res.json({ error: 'Invalid value'})


      let conflictArray = []
      let validRow = solver.checkRowPlacement(puzzle, row, column, value)
      let validCol = solver.checkColPlacement(puzzle, row, column, value)
      let validBox = solver.checkRegionPlacement(puzzle, row, column, value)
      let validSquare = solver.checkSquarePlacement(puzzle, row, column, value)
   

     if (!validRow) conflictArray.push('row');
     if (!validCol) conflictArray.push('column');
     if (!validBox) conflictArray.push('region');   


     return validRow && validCol && validBox ?
      res.json({valid: true}) :
       validSquare ?
        res.json({valid: true}) :
         res.json({valid: false, conflict: conflictArray})

  })

  app.route('/api/solve')
 
    .post((req, res) => {

      let puzzle = req.body.puzzle;
      let solved = solver.solve(puzzle)

      if (!puzzle) return res.json({ error: 'Required field missing' })

      if (puzzle.length != 81) return res.json({ error: 'Expected puzzle to be 81 characters long' })

      if (/[^1-9.]/g.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' })     
      
      solved ? res.json({solution: solved}) : res.json({ error: 'Puzzle cannot be solved' })      

    });
};
