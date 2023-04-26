class SudokuSolver {

  validate(puzzleString) {
    // The validate function should take
    // a given puzzle string and check it 
    // to see if it has 81 valid characters for the input.
    let checkPuzzleString = new RegExp(/^[1-9.]{81}/g)
    let result = checkPuzzleString.test(puzzleString)
    if (result) {
      console.log(result)
      return true;
    } else {
      console.log('Error ' + puzzleString.length)
      if (puzzleString.length !== 81) {
        return 'invalid length'
      } else {
        return 'invalid'
      }
    } 
  }


  checkRowPlacement(puzzleString, row, column, value) {
    // The check functions should be validating against the current state of the board.
    let rowsArray = setArrays(puzzleString)[0]
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    let currentRow = rowsArray[letters.indexOf(row.toUpperCase())]
    let square = rowsArray[letters.indexOf(row.toUpperCase())][column - 1]

    console.log("the square is: " + row + column + ". It contains: " + square)
    if (square === '.') {
      if(currentRow.includes(value)) {
        return {type: "row", valid: false}
      } else {
        return {type: "row", valid: true}
      }
    } else {
      if (square === value) {
        return {type: "square", valid: true}
      } else {
        return {type: "square", valid: false}
      }
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    // The check functions should be validating against the current state of the board.
    let colsArray = setArrays(puzzleString)[1]

    let currentCol = colsArray[column-1]
    if(currentCol.includes(value)) {
      return {type: "column", valid: false}
    } else {
      return {type: "column", valid: true}
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // The check functions should be validating against the current state of the board.
    let boxArray = setArrays(puzzleString)[2]
    row = row.toUpperCase()
    let currentBox = []
    boxArray.map(item => {
      if (row === 'A' || row === 'B' || row === 'C') {
        column <=3 ? currentBox = boxArray[0] : column <=6 ? currentBox = boxArray[1] : currentBox = boxArray[2] 
      } else if (row === 'D' || row === 'E' || row === 'F') {
        column <=3 ? currentBox = boxArray[3] : column <=6 ? currentBox = boxArray[4] : currentBox = boxArray[5]
      } else {
        column <=3 ? currentBox = boxArray[6] : column <=6 ? currentBox = boxArray[7] : currentBox = boxArray[8]
      }
    })
    console.log(currentBox)

    if(currentBox.includes(value)) {
      return {type: "region", valid: false}
    } else {
      return {type: "region", valid: true}
    }
  }


  solve(puzzleString) {
      let isSolved = !puzzleString.split('').includes('.');
      let numbers = ['1','2','3','4','5','6','7','8','9'];
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      let indexCounter = -1;
      let arrays = setArrays(puzzleString);
      if (!arrays)  return false
      let rows = arrays[0];
      let columns = arrays[1];
      let boxes = arrays[2];
    
      if (!isSolved) {

        rows.map((row, index1) => {
          let possibleRowNumbers = []
          numbers.map(number => {
            if (!row.includes(number)) {
              possibleRowNumbers.push(number)
            }
          })
          row.map((number, index) => {

            indexCounter ++
            let possibleRowColNumbers = possibleRowNumbers
            if (number == '.') {
              columns[index].map(number => {
                possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                  return number !== e
                })
              })
              let letter = letters[index1]
              // Add box logic here
              if (letter === 'A' || letter === 'B' || letter === 'C') {
                if (index < 3) {
                  boxes[0].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                } else if (index  < 6) {
                  boxes[1].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                } else {
                  boxes[2].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                }
              } else if (letter === 'D' || letter === 'E' || letter === 'F') {
                if (index < 3) {
                  boxes[3].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                } else if (index  < 6) {
                  boxes[4].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                } else {
                  boxes[5].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                }
              } else {
                if (index < 3) {
                  boxes[6].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                } else if (index  < 6) {
                  boxes[7].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                } else {
                  boxes[8].map(number => {
                    possibleRowColNumbers = possibleRowColNumbers.filter(e => {
                      return number !== e
                    })
                  })
                }
              }
              //Add solve logic here
              if (possibleRowColNumbers.length === 1) {
                let answer = puzzleString.split('')
                answer[indexCounter] = possibleRowColNumbers[0]
                puzzleString = answer.join('')
              } 
            }
          })  
        })
          return this.solve(puzzleString)          
      }  
      return puzzleString
    }  
}

const setArrays = (puzzleString) => {
  let rowsArray = []
  let colsArray = [ [],[],[],[],[],[],[],[],[] ]
  let boxArray = [ [],[],[],[],[],[],[],[],[] ]
  let tempArray = []
  let count = 1
  let isDuplicate = false;
  // Populate nested arrays of 9 rows
  puzzleString.split('').map((item, index) => {
      tempArray.push(item)
        if (count % 9 === 0) {
          if (index != 0) {
          rowsArray.push(tempArray);
          tempArray = []
          }      
        }
    count++
    })

  // Populate nested array or 9 columns
  rowsArray.map(item => {
    item.map((item, index) => {
      colsArray[index].push(item)
    })
  });

  // Populate nested array or 9 boxes
  rowsArray.map((item, index) => {
    if (index < 3) {
      item.map((item, index) => {
        index < 3 ?
        boxArray[0].push(item) :
        index > 5 ? boxArray[2].push(item) :
        boxArray[1].push(item)
      })
    } else if (index > 5) {
      item.map((item, index) => {
        index < 3 ? 
        boxArray[6].push(item) : 
        index > 5 ? boxArray[8].push(item) : 
        boxArray[7].push(item)
      })
    } else {
      item.map((item, index) => {
        index < 3 ? 
        boxArray[3].push(item) : 
        index > 5 ? boxArray[5].push(item) : 
        boxArray[4].push(item)
      })
    }
  })

  // Make sure puzzleString is valid by checking rows for duplicates
  rowsArray.map(row => {
    let checkArray = []
    row.map(num => { 
      if(!checkArray.includes(num) || num === '.') {
        checkArray.push(num)
      } else {
        isDuplicate = true;
        return;
      }
    })
  })
  // Make sure puzzleString is valid by checking columns for duplicates
  colsArray.map(col => {
    let checkArray = []
    col.map(num => { 
      if(!checkArray.includes(num) || num === '.') {
        checkArray.push(num)
      } else {
        isDuplicate = true;
        return;
      }
    })
  })
  // Make sure puzzleString is valid by checking boxes for duplicates
  boxArray.map(box => {
    let checkArray = []
    box.map(num => { 
      if(!checkArray.includes(num) || num === '.') {
        checkArray.push(num)
      } else {
        isDuplicate = true;
        return;
      }
    })
  })

  
  if (isDuplicate) return false
  return [rowsArray, colsArray, boxArray]
}


module.exports = SudokuSolver;

