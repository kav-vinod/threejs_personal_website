import React from 'react'; 
import EmailEvent from './EmailForm.js';
import Navbar from './Navbar.jsx'; 
import FooterStatic from './FooterStatic.jsx';

const EmailMobile = () => {
    return (
        <>
        <Navbar/>
        <style>
                {`
                    body {
                        background: linear-gradient(to bottom, #ffffff, hsl(210, 60%, 40%));
                        min-height: 100vh;
                        margin: 0;
                        padding: 0;
                    }
                `}
        </style>
        <EmailEvent isMobile={true}/>
        <FooterStatic />
        </>
    );
};

export default EmailMobile;