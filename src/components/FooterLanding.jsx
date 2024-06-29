import React, { useEffect } from 'react';

const FooterLanding = () => {
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
        <footer style={footerStyle} >
            <p className="text-black flex-1">&copy; 2024 Kavitha Vinod</p>
        </footer>
    )
} 

export default FooterLanding
