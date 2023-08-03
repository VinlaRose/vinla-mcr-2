import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "../context/context";
import "../Landing/LandingPage.css"
import "./EachHabit.css"

export const EachHabit = () => {
    const {habitIndex} = useParams();
    const {state, dispatch} = useContext(DataContext);
    const requiredHabit = state.filteredData.find(item => item._id == habitIndex);
    const [openModal, setOpenModal] = useState(false)
    const [habitName, setHabitName] = useState(requiredHabit?.name);
    const [habitGoal, setHabitGoal] = useState(requiredHabit?.goal);
    const [habitFrequency, setHabitFrequency] = useState(requiredHabit?.frequency);
    const [startDate, setStartDate] = useState(requiredHabit?.date);
    const navigate = useNavigate()


    const handleSave = () => {
        
        if (habitName === '') {
          alert('Please enter the Name of the habit.');
          return;
        }

        
       
        console.log(habitName);

        const updateHabitData = state.filteredData.map(item => item._id == habitIndex ? {...item,     name:habitName,goal: habitGoal,frequency: habitFrequency,date: startDate} : item)
        

        dispatch({type: "UPDATE", payload: updateHabitData});

        
      
        
       
       setOpenModal(false);
       
      };

   
   const deleteHabit = () => {
    const remainingHabits = state.filteredData.filter(item => item._id !== habitIndex);
    dispatch({type: "UPDATE" , payload : remainingHabits});
    navigate("/")
    
   }

   const archiveHabit = () => {
    const updatedHabits = state.filteredData.map(item =>
      item._id === habitIndex ? { ...item, inArchive: true } : item
    );
    dispatch({type: "ARCHIVE" , payload : updatedHabits})
  };

  const unArchiveHabit = () => {
    const updatedHabits = state.filteredData.map(item =>
      item._id === habitIndex ? { ...item, inArchive: false } : item
    );
    dispatch({type: "UNARCHIVE" , payload : updatedHabits})
  };
  
  
    return(
        <div className="eachHabitContainer">
            <h1>{requiredHabit?.name}</h1>
            
            <button className="delete" onClick={deleteHabit}>Delete</button>
{requiredHabit?.inArchive ? (
  <button className="unarchive" onClick={unArchiveHabit}>Unarchive</button>
) : (
  <button className="archive" onClick={archiveHabit}>Archive</button>
)}
<button className="edit" onClick={() => setOpenModal(true)}>Edit</button>



            {
                openModal && 
                (
                    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setOpenModal(!openModal)}>
          &times;
        </span>
        <h2>Edit Habit</h2>
        <div className="input-container">
          <label>Name of the Habit:</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Goal of the Habit:</label>
          <input
            type="text"
            value={habitGoal}
            onChange={(e) => setHabitGoal(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>How often do you want to perform the habit:</label>
          <select
            value={habitFrequency}
            onChange={(e) => setHabitFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="alternate-days">Alternate Days</option>
            <option value="custom">Set Your Own</option>
          </select>
        </div>
        {habitFrequency === 'custom' && (
          <div className="input-container">
            <label>Custom Frequency:</label>
            <input
              type="text"
              value={habitFrequency}
              onChange={(e) => setHabitFrequency(e.target.value)}
            />
          </div>
        )}
        <div className="input-container">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="discard-btn" onClick={() => setOpenModal(!openModal)}>
            Discard
          </button>
        </div>
      </div>
    </div>
                )
            }

            
            <div className="habit-details-container">
      <h2 className="habit-name">{requiredHabit?.name}</h2>
      <p className="habit-goal">Goal: {requiredHabit?.goal}</p>
      <p className="habit-frequency">Frequency: {requiredHabit?.frequency}</p>
      <p className="habit-date">Date: {requiredHabit?.date}</p>
    </div>

        </div>
    )
}