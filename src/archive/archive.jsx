import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "../context/context";

export const Archives = () => {
    const {state, dispatch} = useContext(DataContext);
    const navigate = useNavigate();
//    const requiredHabit = state.filteredData.find(item => item._id == habitIndex);
//    const deleteHabit = () => {
//     const remainingHabits = state.filteredData.filter(item => item._id !== habitIndex);
//     dispatch({type: "UPDATE" , payload : remainingHabits})
//    }
const goToPage = (i) => {
    console.log(i)
    navigate(`/${i}`)
  }
    return(
        <div>
            <h1>Archives</h1>
            
            
            {state.filteredData.filter(item => item.inArchive).map(item => (
                <h3>{item.name}</h3>
            ))
}
{
  state.filteredData.filter(item => item.inArchive).map((item) => (
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
    )
}