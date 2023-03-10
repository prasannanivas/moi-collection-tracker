import { useState } from 'react';
import './App.css';
import { Plot } from './Plot';
import { data } from './data';

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("");
  const [relation, setRelation] = useState("");
  const [specificRelation ,setSpecificRelation] = useState("")
  const [remarks, setRemarks] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    data.push({
      name,
      side,
      amount,
      relation,
      specificRelation,
      remarks
    })

    setName("");
    setAmount("");
    setSide("");
    setRelation("");
    setRemarks("");
    setSpecificRelation("");
    console.log(data);

  }
  return (
    <div className="App">
      <nav style={{position:"absolute", top:"0", backgroundColor:"blueviolet" , color:"white", width: "100vw", height:"10vh", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"cursive", fontSize:"20px"}}>Vanakkam 🙏💑👰 </nav>
      <form onSubmit={submitHandler} style={
        {
          width: "60vw",
          height: "60vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20vh",
          marginLeft: "10vw"
        }}>
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />

        <label>Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />

        <label>Side</label>
        <select value={side} onChange={e => setSide(e.target.value)} placeholder="Side">

          <option disabled selected value=""> -- select an option -- </option>
          <option value="Bride">Bride</option>
          <option value="Groom">Groom</option>
        </select>

        <label>Relation</label>
        <select value={relation} onChange={e => setRelation(e.target.value + " - ")}>
          <option disabled selected value=""> -- select an option -- </option>
          <option value="friend">Friend</option>
          <option value="family">Family</option>
          <option value="collegemate">Collegemate</option>
          <option value="schoolmate">Schoolmate</option>
          <option value="officemate">Officemate</option>
          <option value="neighbor">Neighbour</option>
        </select>

        {relation &&
            <input value={specificRelation} onChange={e => setSpecificRelation(e.target.value)}/>
            }

        <label>Remarks</label>
        <textarea value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="remarks" />
        <button type="submit">Submit</button>
      </form>
      <Plot data={data} />
    </div>
  );
}

export default App;
