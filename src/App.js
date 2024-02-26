import "./App.css";
import { useState,useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { title: "todo", task: "hello priyanshu" },
  ]);
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [showUpper2, setShowUpper2] = useState(false);
  const [tempTasks, setTempTasks] = useState([]);
  const [completedTasks,setCompletedTasks] = useState([]) 

  const handleSubmit = () => {
    if (data.trim() !== "") {
      const newTask = { title: title, task: data };
      setTasks([...tasks, newTask]);
      clearData();
    } else {
      alert("Enter data");
    }
  };

  const handleSubmit2 = () => {
    const newTask =  {task: data };
    setCompletedTasks([...completedTasks, newTask]);
    clearData()
  };

  const handleSubmit1 = (index) => () => {
    const updatedTempTasks = [...tempTasks];
    const newTask = { task: updatedTempTasks[index].task };
    setCompletedTasks([...completedTasks, newTask]);
    updatedTempTasks.splice(index, 1);
    setTempTasks(updatedTempTasks);
  };
  const handleSubmit3 = (index) => () => {
    const updatedCompletedTasks = [...completedTasks];
    const newTask = { task: updatedCompletedTasks[index].task };
    setTempTasks([...tempTasks, newTask]);
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  };
  

  const clearData = () => {
    setData("");
  };

  const clearData1 = (index) => {
    const updatedTempTasks = [...tempTasks];
    updatedTempTasks.splice(index, 1);
    setTempTasks(updatedTempTasks);
  };
  const clearData2 = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  };

  const handleInputChange = (e) => {
    setData(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowUpper2(true);
    } else {
      setShowUpper2(false);
    }
  };

  const handleInputChange1 = (index, e) => {
    const updatedTempTasks = [...tempTasks];
    updatedTempTasks[index].task = e.target.value;
    setTempTasks(updatedTempTasks);
  };
  const handleInputChange2 = (index, e) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index].task = e.target.value;
    setCompletedTasks(updatedCompletedTasks);
  };

  const handleUpper2Click = () => {
    if (data.trim() !== "") {
      const newTask = { title: title, task: data };
      setTempTasks([...tempTasks, newTask]);
      clearData();
    }
    setShowUpper2(false);
  };

  const handleAll = () => {
    handleSubmit()
    setTasks([...tasks, ...tempTasks]);
    setTempTasks([]);
    setTitle("")
    setShowUpper2(false);
  };

  useEffect(()=>{
    if(data.length == 0){
      setShowUpper2(false)
    }
  },[data])

  return (
    <>
      <div className="input">
        <input
          className="title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="temp">
          {tempTasks.map((task, index) => (
            <div key={index} className="data">
              <input
                className="checkBox"
                type="checkbox"
                checked={false}
                onClick={handleSubmit1(index)}
              />
              <input
                type="text"
                value={task.task}
                onChange={(e) => handleInputChange1(index, e)}
                placeholder="List item"
              />

              <button onClick={() => clearData1(index)}>✖</button>
            </div>
          ))}
        </div>
        <div id="upper" className="upper1">
          <div className="data">
            <input
              className="checkBox"
              type="checkbox"
              checked={false}
              onClick={handleSubmit2}
            />

            <input
              type="text"
              value={data}
              onChange={handleInputChange}
              placeholder="List item"
            />
            <button onClick={clearData}>✖</button>
          </div>
        </div>
        {showUpper2 && (
          <div className="upper2">
            <div className="data">
              <input
                className="checkBox"
                type="checkbox"
                checked={false}
              />
              <input
                type="text"
                placeholder="List item"
                onClick={handleUpper2Click}
              />
              <button>✖</button>
            </div>
          </div>
        )}

       { completedTasks.length > 0 && <div className="temp">
            <p>Completed</p>
          {completedTasks.map((task, index) => (
            <div key={index} className="data">
              <input
                className="checkBox"
                type="checkbox"
                checked
                onClick={handleSubmit3(index)}
              />
              <input
                type="text"
                value={task.task}
                onChange={(e) => handleInputChange2(index, e)}
                placeholder="List item"
              />

              <button onClick={() => clearData2(index)}>✖</button>
            </div>
          ))}
        </div>}
        <button type="submit" onClick={handleAll}>
          Submit
        </button>
      </div>
      <div className="output">
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <div className="heading">{task.title}</div>
            <div className="text">{task.task}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
