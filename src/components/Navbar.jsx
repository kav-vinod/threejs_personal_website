import { NavLink, useNavigate } from 'react-router-dom'
import HomeStart from './HomeStart.js'
const Navbar = () => {
    const navigate = useNavigate();

    const handleNavLinkClick = (route, stateProps) => {
        // Reload the page
        //window.location.reload();
        navigate(route, {state: stateProps});
    };
    return(
        <header className="header">
            <nav className="flex text-lg gap-5 font-bold">
                <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                    <p className="blue-gradient_text">KV</p>
                </NavLink>
                <NavLink to="/start" 
                        onClick={() => handleNavLinkClick("/start", {camPosX : 0, camPosY : 0, camPosZ : 180 })} 
                        state = {{camPosX : 0, camPosY : 0, camPosZ : 180 }}
                        className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                        <p className="blue-gradient_text">Navbar</p>
                </NavLink>
            </nav>
            <nav className="flex text-lg gap-5 font-bold">
                <NavLink to="/experience" 
                    onClick={() => handleNavLinkClick} 
                    className={({ isActive }) => `text-black hover:text-blue-500 ${isActive ? 'text-blue-500' : ''}`}>
                    <p > Experience</p>
                </NavLink>
                <NavLink to="/projects" 
                    onClick={() => handleNavLinkClick} 
                     className={({ isActive }) => `text-black hover:text-blue-500 ${isActive ? 'text-blue-500' : ''}`}>
                    <p >Projects</p>
                </NavLink>
                <NavLink to="/aboutme" 
                    onClick={() => handleNavLinkClick } 
                    className={({ isActive }) => `text-black hover:text-blue-500 ${isActive ? 'text-blue-500' : ''}`}>
                     <p >About Me!</p>
                </NavLink>
            </nav>  
            
        </header>
    )
}

export default Navbar