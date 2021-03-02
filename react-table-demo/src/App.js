 
import './App.css';
import StudentList from './components/StudentList';
import React from 'react'
 
function App() {
   const data = [{
        firstName: 'Nguyen Van',
        lastName: 'A',
        age: 26,
        
      }, {
        firstName: 'Dao Thi ',
        lastName: 'B',
        age: 22,
         
      }, {
        firstName: 'Tran Duc ',
        lastName: 'C',
        age: 25,
        
      }, {
        firstName: 'Le Tien ',
        lastName: 'N',
        age: 27,
       
      }, {
        firstName: 'Pham Hoang ',
        lastName: 'M',
        age: 26,
        
      }, {
        firstName: 'Duong Van L',
        lastName: 'L',
        age: 23,
       
      }];
      const columns = [{
        Header: 'Name',
        columns: [
          {
            Header: 'FirstName',
            accessor: 'firstName' // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
          },{
            Header: 'LastName',
            accessor: 'lastName'
          }
          
        ]
      },{
        Header:"Info",
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          } 
        ]
       }];
  return (
    <div className="App">
       <StudentList columns={columns} data={data} />
    </div>
  );
}

export default App;
