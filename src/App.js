import './App.css';
import {useState} from "react";
import Axios from 'axios';


function App() {

  const [name,setName] = useState("");
  const [ph,setPh] = useState("");
  const [email,setEmail] = useState("");  
  const [employee_list,setEmployeeList] = useState([]);
  const [updated_name,setUpdatedName] = useState("");
  const [updated_ph,setUpdatedPh] = useState("");


  const submitMessage = ()=>{
    Axios.post('http://localhost:3001/create',{name,ph,email}).then(()=>{
      console.log("Details Stored !");
    });
  };

  const getEmployee = ()=>{
    Axios.get('http://localhost:3001/employees').then((response)=>{
        setEmployeeList(response.data);
    });
  };

  const updateMessage = (employee_email) =>{
    Axios.put('http://localhost:3001/update',{name:updated_name,ph:updated_ph,email:employee_email}).then((response)=>{
      setEmployeeList(employee_list.map((val)=>{
        return val.employee_email == employee_email ?
           {
            employee_id : val.employee_id,
            employee_name : updated_name,
            employee_ph : updated_ph  ,
            employee_email : val.employee_email
           
          }:  val;
       
      }));
    }

    );
  };

  const deleteUser = (id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
      setEmployeeList(employee_list.filter((val)=>{
        return val.employee_id != id;
      }));
    });
  };

  return (
    <div className="App">
        <div className="Information">
          <label>Name : </label>
          <input type="text" onChange = {(event)=>{
            setName(event.target.value);
          }
          }
          /><br/>
          <label>Ph. No. : </label>
          <input type="text" onChange = {(event)=>{
            setPh(event.target.value);
          }
          }
          /><br/>
          <label>Email : </label>
          <input type="text" onChange = {(event)=>{
            setEmail(event.target.value);
          }
          }
          /><br/>
          <button onClick={submitMessage}>Add Phone Details</button>
        </div>
        <hr/>
        <div>
        <button onClick={getEmployee}>Show Phone Book</button>
        {employee_list.map((val)=>{
          return (
            <div className="user_details" key={val.employee_id}>
            <span>{val.employee_name}</span>
            <span>{val.employee_ph}</span>
            <span>{val.employee_email}</span>
            <div className="update_details">
              <input type="text" placeholder="name" onChange = {(event)=>{
                      setUpdatedName(event.target.value);
                    }
                                                              }/>
              <input type="text" placeholder="ph" onChange = {(event)=>{
                      setUpdatedPh(event.target.value);
                    }
                                                            }/>
              <button onClick={()=>{updateMessage(val.employee_email);
              }
              }>Update</button>

            </div>
            <div className="delete_user">
              <button onClick={()=>{deleteUser(val.employee_id);}}>Delete</button>
            </div>
            </div>
        );
          })}  
      </div>
    </div>
  );
}

export default App;
