import React from 'react';
import { Link } from 'react-router-dom';

import {
  PageContainer as Container,
  Section,
  SectionHeading,
  SectionH2,
  SectionH3,
  InfoP,
  LinkWrapper,
  LinkText,
  LeftArrowSvg,
  RightArrowSvg,
  AssignmentCard
} from '../styles/styles';

const assignments = [
  {
    title: 'Assignment 0: Adding Two Numbers',
    description: 'Wrote a python script that adds two numbers and prints their sum to the command line.',
    repoLink: 'https://github.com/Alan0893/alanl193-assignment-0'
  },
  {
    title: 'Assignment 1: Elevator Data Collection',
    description: 'calculated the average walking distance to the next elevator arrival for both the training and test data, comparing the results between the naive waiting position and the smart waiting position.',
    repoLink: 'https://github.com/Alan0893/alanl193-assignment-1'
  }
];

const Assignments = () => {
  return (
    <>
      <main id='content' className={Container}>

        <Link className={LinkWrapper} to={{ pathname: '/' }}>
          <span>
            <span className='whitespace-nowrap'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={LeftArrowSvg}>
                <path fillRule='evenodd' d='M17 10a.75.75 0 01-.75.75H5.612l4.108 3.96a.75.75 0 01-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 011.04 1.08L5.862 9.25H16.25A.75.75 0 0117 10z' clipRule='evenodd' />
              </svg>
              <span className={LinkText}> Home</span>
            </span>
          </span>
        </Link>

        <section id='assignments' className={Section}>
          <div className={SectionHeading}>
            <h2 className={SectionH2}>Assignments</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {assignments.map((assignment, index) => (
              <div key={index} className={AssignmentCard}>
                <h3 className={SectionH3}>{assignment.title}</h3>
                <p className={InfoP}>{assignment.description}</p>
                <a href={assignment.repoLink} target='_blank' rel='noopener noreferrer' className={LinkWrapper}>
                  <span className={LinkText}>Github Link</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={RightArrowSvg}>
                    <path fillRule="evenodd" d="M12 10H3m9-4l4 4m0 0l-4 4m4-4H9" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

export default Assignments;