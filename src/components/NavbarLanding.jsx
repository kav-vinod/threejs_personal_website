import { NavLink, useNavigate } from 'react-router-dom'
const NavbarLanding = ({text, route}) => {
    const navigate = useNavigate();
    if (route == "/") {
        var firstpage = true;
    }
    else {
        var firstpage = false;
    }
    const handleNavLinkClick = (route, stateProps) => {
        // Reload the page
        //window.location.reload();
        navigate(route, {state: stateProps});
    };
    return(
        <header className="headerhome w-full flex font-bold">
            {firstpage ? 
             <NavLink to="/start" 
                    onClick={() => handleNavLinkClick("/start")} 
                     state = {{camPosX : 0, camPosY : 0, camPosZ : 180 }} 
                     className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md" style={{ lineHeight: '1.25' }}>
                    <p className="blue-gradient_text">{text}</p>
            </NavLink>
            :
            <NavLink to="/" 
                    onClick={() => handleNavLinkClick("/")} 
                     className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                    <p className="blue-gradient_text">{text}</p>
            </NavLink>
            }
            
        </header>
    )
}

export default NavbarLanding