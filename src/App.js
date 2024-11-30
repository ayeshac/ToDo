import React,{useState}  from 'react'
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

function App() {

  const [data, setData] = useState([])
  const [textItem, setTextItem] = useState('')
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editText, setEditText] = useState('');


  const addItems = (e) => {
    setData([...data, textItem])
    console.log(data)
  }

  const deleteItem = (index) => {
    let newData = [...data]
    newData.splice(index,1)
    setData(newData)
  }
  const editItem = (index) => {
    setEditingIndex(index); // Set the index of the task being edited
    setEditText(data[index]); // Set the current text of the task into the edit field
  };

  const saveEdit = () => {
    let updatedData = [...data];
    updatedData[editingIndex] = editText; // Update the task at the editing index
    setData(updatedData);
    setEditingIndex(null); // Reset the editing index
  };

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <div><h2>Please enter your tasks below and then add then to the list.</h2>
        <input type="text" onChange={(e) => setTextItem(e.target.value)} style={{ marginRight: "15px" }} /><button type='submit' onClick={(e) => addItems(e)}>Add</button>

      </div>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <TableContainer component={Paper} sx={{ maxWidth: 750, alignContent: 'center' }}> 
          <Table sx={{ maxWidth: 750 }} size='small' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row,index) => (
                <TableRow
                  key={row}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{display:"flex",justifyContent:"space-between"}}>
                   {editingIndex === index ?  <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={saveEdit} // Save on blur (when focus is lost)
                        autoFocus
                      /> : row } 
                    <span>
                    <span style={{marginTop:'5px',marginLeft:'auto',cursor:"pointer"}} onClick={() => {editItem(index)}}><EditIcon/></span>
                    <span style={{marginTop:'5px',marginLeft:'auto',cursor:"pointer"}} onClick={() => {deleteItem(index)}}><CloseIcon/></span>
                      </span>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  );
}

export default App;
