// pages/index.tsx
"use client";

import React, { useState } from 'react';
import ResumeButton from '@/components/ResumeButton';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';


const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), { ssr: false });


const Home: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const projects = [
    {
      title: "Patchy robot | ATMAE-2023 Robotics Competition",
      description: "Robot for depalletization, the removing of boxes from pallets utilizing computer vision."
    },
    {
      title: "Budget App",
      description: "A simple command-line application that allows you to manage your budget by creating and managing different spending categories."
    },
    {
      title: "fit checker",
      description: "coming soon"
    },
  ];

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="about" style={{ marginTop: '2rem', textAlign: 'left', minHeight: '100vh', paddingLeft: '10%' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold',
          marginBottom: '0.5rem'  
        }}>
          Sven Reyes
        </h1>
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: '#8B4513',
          fontWeight: 'normal',
          marginBottom: '2rem'
        }}>
          Full Stack Developer & Creative Designer
        </h2>
        <p style={{ marginBottom: '2rem', color: '#8B4513' }}>
        I'm Sven Reyes, i have a passion for technology, 
        problem-solving, and creativity. With experience as a intern, 
        hands-on work in cybersecurity and hackathons, and skills across various fields from 
        AI to media production, I aim to make a meaningful impact in tech. I'm driven by the 
        thrill of learning, and innovation. Explore my projects below!
        </p>
        <ResumeButton />
      </section>

      <section id="projects" style={{ marginTop: '4rem', textAlign: 'center', minHeight: '100vh' }}>
        <h2>Projects</h2>
        <p style={{ margin: '2rem 0', color: '#8B4513' }}>Here's a showcase of some recent projects I've worked on.</p>
        <div>
          <h3>{projects[currentProjectIndex].title}</h3>
          <p>{projects[currentProjectIndex].description}</p>
          {currentProjectIndex === 0 && (
            <a href="https://github.com/ECU-ATMAE-ROBOTICS/ATMAE-2023" target="_blank" rel="noopener noreferrer">
              <button style={{ marginTop: '10px' }}>View GitHub Repository</button>
            </a>
          )}
          {currentProjectIndex === 1 && (
            <a href="https://github.com/svenreyes/budget-app" target="_blank" rel="noopener noreferrer">
              <button style={{ marginTop: '10px' }}>View GitHub Repository</button>
            </a>
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button onClick={prevProject} disabled={currentProjectIndex === 0}>
            Previous Project
          </button>
          <button onClick={nextProject} style={{ marginLeft: '10px' }}>
            Next Project
          </button>
        </div>
      </section>

      <section id="contact" className="container">
        <h2>Contact Me</h2>
        <div className="contact-container">
          <div className="contact-box">
            <a href="https://linkedin.com/in/svenreyes" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/images/lockedinfr.png"
                alt="LinkedIn"
                width={40}
                height={40}
              />
            </a>
          </div>
          
          <div className="contact-box">
            <a href="mailto:sven.s.reyes@gmail.com">
              <Image 
                src="/images/gmailfr.png"
                alt="Email"
                width={40}
                height={40}
              />
            </a>
          </div>
          
          <div className="contact-box">
            <a href="https://github.com/svenreyes" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/images/githubfr.png"
                alt="GitHub"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;