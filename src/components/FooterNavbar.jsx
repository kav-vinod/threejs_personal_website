import React from 'react';

const FooterNavbar = (Navpage) => {
    var Firstmessage = Navpage.Navpage; 
    const footerStyle = {
        backgroundColor: 'linear-gradient(to bottom, #ADD8E6, #ADD8E6)', // Same blue color as the background
        position: 'fixed', // Fix the footer at the bottom
        bottom: 5,
        width: '100%',
        padding: '10px', // Adjust padding as needed
        boxSizing: 'border-box', // Ensure padding doesn't affect the width
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    return (
        <footer style={footerStyle}>
            <div className="flex-1 text-left">
                <p className="text-black px-5">&copy; 2024 Kavitha Vinod</p>
            </div>
            <div className="flex-1 text-center">
                {Firstmessage ?  <p className="text-black">Navigate with left and right arrow keys</p> : <p className="text-black">Navigate with up and down arrow keys</p> } 
            </div>
            <div className="flex-1"></div>
        </footer>
    );
}

export default FooterNavbar;