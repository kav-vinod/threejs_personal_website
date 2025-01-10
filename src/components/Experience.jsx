import React, {useState} from 'react'; 

import { Tilt } from 'react-tilt'; 
import { motion } from 'framer-motion'; 
import Navbar from './Navbar.jsx'; 
import FooterStatic from './FooterStatic.jsx';

//import { fadeIn, textVariant } from '../utils/motion';

const services = [
    {
        title: "Software Engineer and Product Manager at JIFFY.ai", 
        year: "Aug 2024 - Current",
        picture: "./jiffylogo.jpg",
        description: ["Working on a fintech application."]
      },
    {
      title: "Santa Clara University ACM Board Member", 
      year: "Oct 2021 - May 2024",
      picture: "./acmlogo.jpg", 
      description: ["2023-2024: Career Development Coordinator", 
      "Spearheaded a Career Development series in Fall 2023, as well as various other technical or career oriented workshops in Winter and Spring 2024 for Santa Clara students interested in Computer Science. Events range from techinical workshops, resume/LinkedIn workshops, student and industry panels, and interviewing workshops. Ideated and worked with other board members to start the SCU ACM Mobile App Project, a club wide project to help members gain real world experience. Work with other ACM board members to organize other events and hackathons.",
       "2022-2023: Industry Liaison",
       "Raised $19,000 with my co-Industry Liaison for ACM and ACM-W's (ACM Women's Chapter) 10th annual Hack for Humanity (a social good hackathon) in 2023. 2023's Hack for Humanity was the largest one to date, with 300+ signups and $6,000 in prizes. Worked with other board members to organize and execute 2-3 events per week. Planned a career development workshop and an Open AI APIs workshop.", 
       "2021-2022: Underclassmen Representative",
       "Worked with the rest of ACM board to organize weekly events and ACM's annual Hack for Humanity. Brought an underclassman's perspective to the club."]
    }, 
    {
      title: "SWE Intern at INRIX", 
      year: "June 2023 - Sept 2023", 
      picture: "./inrixlogo.jpg",
      description: ["Upgraded legacy code in an internal module used by INRIX’s Mobility Intelligence Platform (MIP) team so that it was standardized with the rest of the modules used by the MIP team", 
      "Utilized AWS Lambda, API Gateway to create new data access pipeline for module"]
    }, 
    {
      title: "TA/Grader for Santa Clara University", 
      year: "Sept 2022 - Dec 2023", 
      picture: "./sculogo.jpg",
      description: ["Worked with ~30 students per quarter. Explained Python and coding concepts covered in lab, helped students debug code, and worked with them to ensure strong understanding of material."]
    }, 
    {
      title: "SWE Intern at Envestnet", 
      year: "June 2022 - August 2022", 
      picture: "./envestnetlogo.jpg",
      description: ["Validated the developer experience for using the React Native Sample App for Fastlink 4 (Envestnet | Yodlee’s Open Banking Widget), and prepared a user manual", 
      "Researched and designed a financial education product plan with 5 others to help Envestnet reach millennials and the underserved. Proposal presented to 70+ employees and C-Suite executives"]
    }, 
]; 

const ServiceCard = ({ title, year, picture, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
        <div className="xs:w-[250px] w-full">
                <div className="w-full p-[3px] rounded-[20px] bg-white">
                <div
                    options={{
                        max: 10,
                        scale: 1,
                        speed: 450
                    }}
                    className="bg-gradient-to-r from-black to-blue-900 bg-white rounded-[20px] py-[2.5%] px-[10%] min-h-[280px] flex justify-evenly items-center flex-col"
                >
                    <h3 className="text-white text-xl font-bold">{title}</h3>
                    <img src={picture} width='75px' height='75px' padding='5px' className="rounded-[10px]" />
                    <p className="text-white mt-4">{year}</p>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="mt-4 text-white">
                        {isExpanded ? '▲ Show Less' : '▼ Show More'}
                    </button>
                    { isExpanded && 
                    <div>
                     {description.map((point) => (
                         <p className="text-white mt-4"> {point} </p>
                     ))} 
                      </div>
                     } 
                </div>
                </div>
        </div>
    </>
    );
};


const Experience = () => {
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
            {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
            ))}
        </div>
        <FooterStatic />
        </>
    );
};

export default Experience;