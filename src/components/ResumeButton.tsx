'use client';

import React from 'react';

const ResumeButton = () => {
  return (
    <a 
      href="/images/Reyes, Sven.pdf" 
      target="_blank"
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#8B4513',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        marginBottom: '2rem',
        marginLeft: '-.35rem',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6B3410'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8B4513'}
    >
      View Resume
    </a>
  );
};

export default ResumeButton; 