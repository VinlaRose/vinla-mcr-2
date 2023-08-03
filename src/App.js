
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LandingPage } from './Landing/LandingPage';
import { EachHabit } from './EchHabit/EachHabit';
import { Archives } from './archive/archive';

function App() {
  return (
    <div className="App">
    
      
      <Routes>
        
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/:habitIndex" element={<EachHabit/>}/>
        <Route path="/archives" element={<Archives/>}/>
      </Routes>
    </div>
  );
}

export default App;
