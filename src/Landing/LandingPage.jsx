import { useState, useEffect, useContext } from "react"
import { v4 as uuid } from "uuid";
import "./LandingPage.css"
import { DataContext } from "../context/context"
import { useNavigate } from "react-router-dom"

export const LandingPage = () => {
    const {state, dispatch} = useContext(DataContext)
    const [openModal, setOpenModal] = useState(false)
    const [habitName, setHabitName] = useState('');
    const [habitGoal, setHabitGoal] = useState('');
    const [habitFrequency, setHabitFrequency] = useState('daily');
    const [startDate, setStartDate] = useState('');
    const navigate = useNavigate()

     
    useEffect(() => {
        console.log(state); 
      }, [state]);   

    const handleSave = () => {
        
        if (habitName === '') {
          alert('Please enter the Name of the habit.');
          return;
        }

        
       
        console.log(habitName)
        

        dispatch({type: "FETCH_DATA", payload: {
            _id: uuid(),
            name: habitName,
            goal: habitGoal,
            frequency: habitFrequency,
            date: startDate,
            inArchive: false
        }});

        
      
        
        console.log(state)
       setOpenModal(false);
       
      };

      const goToPage = (i) => {
        console.log(i)
        navigate(`/${i}`)
      }

    return(
        <div className="landingPage">
            <h1>Habit Tracker</h1><button onClick={() => navigate("/archives")}>Go to archives</button>
            
            <div className="allHabitsContainer">
            
            <div className="image-container">
      <img src="https://clickup.com/blog/wp-content/uploads/2021/09/work-habits.png" alt= " " className="image" />
      <div onClick={() => setOpenModal(!openModal)} className="text-overlay">
      <h3 className="text">
      Add New Habit</h3>
      </div>
    </div>
{
  state.filteredData.filter(item => item.inArchive === false).map((item) => (
    <div key={item._id} onClick={() => goToPage(item._id)} className="image-container">
      <img src="https://clickup.com/blog/wp-content/uploads/2021/09/work-habits.png" alt= " " className="image" />
      <div className="text-overlay">
      <h3 className="text">
      {item.name}</h3>
      </div>
    </div>
    
  ))
}

</div>

            {
                openModal && 
                (
                    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setOpenModal(!openModal)}>
          &times;
        </span>

        <h2>Add a New Habit</h2>

        <div className="input-container">
          <label className="inputHeadings">NAME</label>
          <div><input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            required
          /></div>
          
        </div>
        <div className="input-container">
          <label className="inputHeadings">GOAL</label>
          <input
            type="text"
            value={habitGoal}
            onChange={(e) => setHabitGoal(e.target.value)}
          />
        </div>


        <div className="input-container">
          <label className="inputHeadings">REPEAT</label>
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
            <label className="inputHeadings">Custom Frequency:</label>
            <input
              type="text"
              value={habitFrequency}
              onChange={(e) => setHabitFrequency(e.target.value)}
            />
          </div>
        )}
        <div className="input-container">
          <label className="inputHeadings">START</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="btn-container">
          
          <button className="discard-btn" onClick={() => setOpenModal(!openModal)}>
            Discard
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
                )
            }







        </div>
        
    )
}


