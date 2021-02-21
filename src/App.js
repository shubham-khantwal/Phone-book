import './App.css';
import {useState} from "react";
import Axios from 'axios';
import ReactPaginate from 'react-paginate';


function App() {

  const [name,setName] = useState("");
  const [ph,setPh] = useState("");
  const [email,setEmail] = useState("");  
  const [employee_list,setEmployeeList] = useState([]);
  const [updated_name,setUpdatedName] = useState("");
  const [updated_ph,setUpdatedPh] = useState("");
  const [pageNumber,setPageNumber] = useState(0);
  const [searchTerm , setSearchTerm] = useState("");


  const usersPerPage = 2;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(employee_list.length / usersPerPage);
  const changePage = ({selected})=>{
      setPageNumber(selected);
  };

  const displayUsers = employee_list.slice(pageVisited,pageVisited+usersPerPage)
    .map((val)=>{
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
      
  )
      }
      );

  
  const submitMessage = ()=>{
    Axios.post('http://localhost:3001/create',{name:name,ph:ph,email:email}).then(()=>{
//      setEmployeeList([...employee_list,{name:name,ph:ph,email:email}]);
console.log("Added!");
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
        {displayUsers} 
        {
          <div className="Search">
          <input type="search" placeholder="Search..." onChange={(event)=>{
            setSearchTerm(event.target.value);
          }}/>
          {
            employee_list.filter((val)=>{
              if(searchTerm  == ""){
                return val
              }else if ( val.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) || val.employee_email.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
              }
            }).map((val,key)=>{
              return (
                <div className="user" key={key}>
                    <span>{val.employee_name}</span>
                    <span>{val.employee_ph}</span>
                    <span>{val.employee_email}</span>
                </div>
              );
            })
          }
      </div>
        }
            <ReactPaginate
            previousLabel = {"Prev"}
            nextLabel = {"Next"}
            pageCount = {pageCount}
            onPageChange = {changePage}
            containerClassName = {"paginationBtn"}
            previousLinkClassName = {"previousBtn"}
            nextLinkClassName = {"nextBtn"}
            disabledClassName = {"paginationDisabled"}
            activeClassName = {"paginationActive"}

            />
      </div>
    
    </div>
  );
}

export default App;
