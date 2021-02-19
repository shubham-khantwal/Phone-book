import './App.css';
import {useState} from "react";
function App() {

  const [name,setName] = useState("");
  const [ph,setPh] = useState("");
  const [email,setEmail] = useState("");  

  const submitMessage = ()=>{
    console.log("Details fetched !");
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
    </div>
  );
}

export default App;
