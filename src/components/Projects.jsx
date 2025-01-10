import React, { useState }from 'react'; 

import { Tilt } from 'react-tilt'; 
import { motion } from 'framer-motion'; 
import Navbar from './Navbar.jsx'; 
import FooterStatic from './FooterStatic.jsx';

//import { fadeIn, textVariant } from '../utils/motion';

const services = [
    {
      title: "This website!",
      tagline: "Personal Website turned Art Website with a lot of Three.js", 
      description: ["I enjoy art, and the idea of a personal website that allowed me to express myself artistically was something that I was drawn to. I used Three.js due to being captivated by 3D web portfolios I've seen online, and had a sky blue themed website because it's my favorite color. :)",
      "As I learned more about Three.js, I really started to enjoy making artistic pieces. What started as a personal website started to become more of an art website!",
      "My overall goal was for the less content centered pages of this website to provide a visual experience that I felt represented me in some way. The most time taking parts were the first landing page and making sure that the motion aspect of the website had no bugs. I'm happy I spent that time, and I'm super proud of how this project turned out!"], 
      technologies: ["React.js", "Three.js", "CSS Tailwind", "GLSL", "Web Development"], 
      link: "https://github.com/kav-vinod/threejs_personal_website"
    }, 
    {
      title: "Music Visualizer",
      tagline: "Get custom images for any song you want!",
      description: ["Built an application in Python, React.js, and Flask utilizing 3 APIs (2 from Open AI) to produce a custom image for each verse of a song that a user inputs, and presents images on a website."],
      technologies: ["Flask", "React.js", "Python", "APIs", "Web Development"], 
      link: "https://github.com/kav-vinod/Music-Visualizer"
    }, 
    {
      title: "SafeWalk", 
      tagline: "Determine safest walking route for pedestrians",
      description: ["This project used APIs to obtain different routes from a user's current location to their destination, and cross referenced them with SFPD crime data to find which routes had higher crime rates near it. Routes were then ranked from the safest to least safe according to how many crime incidents the route was near.", " I worked on calling INRIX’s Route API to obtain different paths to a destination, and selecting 25-30 points on each path to run safety analysis on. I worked on a team of 6 for this project for SCU's INRIX Hackathon in 2021!" ],
      technologies: ["Javascript", "HTML/CSS", "APIs", "Web Development"],
      link: "https://devpost.com/software/safewalk-0yf4ue"
    }, 
]; 

const ServiceCard = ({ title, tagline, description, technologies, link }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    //console.log(link); 
    return (
        <>
        <div className="xs:w-[250px] w-full">
            <div
                className= "w-full p-[3px] rounded-[20px] bg-white"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div
                    options={{
                        max: 10,
                        scale: 1,
                        speed: 450
                    }}
                    className="bg-gradient-to-r from-black to-blue-900 rounded-[20px] py-[5%] px-[10%] min-h-[280px] flex justify-evenly items-center flex-col"
                >
                    <h3 className="text-white text-xl font-bold">{title}</h3>
                    <p className="text-white text-l font-bold">{tagline}</p>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="mt-4 text-white">
                        {isExpanded ? '▲ Show Less' : '▼ Show More'}
                    </button>
                    {isExpanded && 
                        <div> 
                            {description.map((point) => (
                         <p className="text-white mt-4"> {point} </p>
                     ))} 
                             {technologies.map((tech) => (
                         <button className="bg-white text-blue-900 rounded-full px-5 py-2 text-sm font-bold mx-2 my-4"> {tech} </button>
                     ))}
                            <div>
                            <button onClick={() => window.open(link)} className="bg-white text-blue-900 rounded-full px-5 py-2 text-sm font-bold mx-2 my-4">See Project</button>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    </>
    );
};


const Projects = () => {
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
        <div className="px-[5%] py-[2%] mt-20 flex flex-wrap gap-10">
            {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
            ))}
        </div>
        <FooterStatic />
        </>
    );
};

export default Projects;