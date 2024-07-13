import logo from './logo.svg';
import './App.css';
import NameTag from './components/NameTag';
import Home from './components/Home';
import HomeStart from './components/HomeStart';
import AboutMe from './components/AboutMe';
import Navbar from './components/Navbar';
import Experience from './components/Experience'; 
import Projects from './components/Projects'; 
//import Email from './components/Email'; 
import Email from './components/EmailAddOn'; 
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
//import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/start" element={<HomeStart/>} />
        </Routes>
        <Routes>
          <Route path="/experience" element={<Experience/>} />
        </Routes>
        <Routes>
          <Route path="/projects" element={<Projects/>} />
        </Routes>
        <Routes>
          <Route path="/aboutme" element={<AboutMe/>} />
        </Routes>
        <Routes>
          <Route path="/email" element={<Email/>} />
        </Routes>
      </Router>
    </div>
    //<MainPage/>
  );
}

export default App;
