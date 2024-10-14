import React,{useState,useEffect} from 'react'

const App = () => {
  const rows=15
  const cols=20
  const [matrix,setMatrix] = useState(Array.from({ length: rows }, () => Array(cols).fill(0)));
  const colors = ['bg-blue-900','bg-blue-800','bg-blue-700','bg-blue-600','bg-blue-500'];
  
    useEffect(()=>{
    const interval=setInterval(()=>{
      const newMatrix = matrix.map(row => [...row]);
      randomStart(newMatrix)
      moveOneIndexDown(newMatrix)
      setMatrix(newMatrix)
    },150)
    return () => clearInterval(interval)
  },[matrix])
  const randomStart=(matrix)=>{
    let noOfStarts=Math.floor(Math.random() * 2)+1
    while(noOfStarts){
      const randomCol=Math.floor(Math.random() * cols)
      const rowIndex=0
      if(canAddNewWave(matrix,randomCol,rowIndex)){
        noOfStarts--
        matrix[rowIndex][randomCol]=5
      }
      else{
        noOfStarts--
        continue
      }
    }
  }
  const canAddNewWave=(matrix,randomCol,rowIndex)=>{
    for(let i=rowIndex;i<rowIndex+5;i++){
      if(matrix[i][randomCol]!=0){
        return false
      }
    }
    return true
  }
  const canAddColor=(matrix,row,col)=>{
    for(let i=row;i<Math.min(row+5,rows);i++){
      if(matrix[i][col]!=0){
        let val= (matrix[i][col]-i+row)
        if(val>0) return val
      }
    }
    return false
  }
  const moveOneIndexDown=(matrix)=>{
    for(let i=rows-1;i>=0;i--){
      for(let j=cols-1;j>=0;j--){
        if(i==rows-1 && matrix[i][j]!=0){
          matrix[i][j]-=1
        }
        if(matrix[i][j]==5){
          matrix[i][j]=0
          matrix[i+1][j]=5
        }
      }
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <div
      className="grid border-2 border-blue"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        width:'50vh',
        height:'50vh'
      }}
    >
      {matrix.map((row, rowIndex) => (
        row.map((_, colIndex) => {
            const color=canAddColor(matrix,rowIndex,colIndex)
            let blockColor='bg-black'
            if(color){
              blockColor='bg-white'
            }
          return <div
            key={`${rowIndex}-${colIndex}`}
            className={`border border-blue   ${color?colors[color-1]:'bg-black'}`}
            style={{ aspectRatio: '1 / 1' }}  
          ></div>
        })
      ))}
      </div>
    </div>
    )
}

export default App
