export const solve = (puzzleString) => {
  let x;
  
  let isSolved = !puzzleString.split('').includes('.');

  if (!isSolved) {
    let numbers = ['1','2','3','4','5','6','7','8','9'];
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  let indexCounter = -1;
    console.log('xxx')
    let arrays = setArrays(puzzleString);
    let rows = arrays[0];
    let columns = arrays[1];
    let boxes = arrays[2];
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
            //console.log(letter, index + 1)
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
            //console.log(letter, index + 1)
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
            //console.log(letter, index + 1)
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

      return solve(puzzleString)    

  } 
  
  console.log("dqwedf" + x)
  return puzzleString
} 


const setArrays = (puzzleString) => {
  let rowsArray = []
  let colsArray = [ [],[],[],[],[],[],[],[],[] ]
  let boxArray = [ [],[],[],[],[],[],[],[],[] ]
  let tempArray = []
  let count = 1
  let x = puzzleString
  console.log(puzzleString)
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
  return [rowsArray, colsArray, boxArray, x]
}



