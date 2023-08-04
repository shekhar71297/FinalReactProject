import React, {useState} from 'react';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import axios from 'axios';


const Questiontable = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value)
    const selectedValue = event.target.value;


    if (selectedValue) {
    axios
      .get(`http://localhost:8888/${selectedValue}`)
      .then((response) => {
        // console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        // console.error(error);
      });
  } else {
    setData([]);
  };
}
  return (
    
    <div className='mt-5 Pull-right'>
      <select  onChange={handleDropdownChange} className='float-end me-5'>
        <option >Select Exam</option>
        <option value="react">React</option>
        <option value="python">python</option>
        <option value="Php">Php</option>
      </select>
      <div>
        
    
    <CDBContainer>
      <CDBTable responsive bordered dark className='mt-5' >
        <CDBTableHeader color="primary-color"  >
          <tr>
            
            <th className='bg-primary h4'>Questions</th>
            
          </tr>
        </CDBTableHeader>
        <CDBTableBody color='primary-color...'>
        
          
        {data.map((item) => (
          
          <tr key={item.id} >
            <td height='100px'>{item.question}{item.options}</td>
          </tr>

        ))}
        <tr>
          <td height='100px' className='align-middle' >NO DATA</td>
        </tr>
        
        
        </CDBTableBody>
      </CDBTable>
    </CDBContainer>
    
     
      
  
    </div>
    </div>
  );
};
export default Questiontable;