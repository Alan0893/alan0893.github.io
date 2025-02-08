import React from 'react';
import { Link } from 'react-router-dom';

// Styled components for consistent styling across app
import {
  Spacing,
  Container,
  DivStyles,
  Subhead,
  Info,
  SectionH3,
  H3Container,
  H3Span,
  LinkSvg,
  InfoP,
  LinkWrapper,
  LinkText,
  RightArrowSvg
} from '../../styles/styles';

const About = () => {
  return (
    <div>
      {/* Description */ }
      <p className={Spacing}>
        I am currently interested in software engineering, data science, and machine learning. 
        During my free time, I spend time learning new technologies and frequently working on 
        new projects or adding onto previous projects.
      </p>

      {/* Education */ }
      <ol>
        {/* Boston University */}
        <li className={Spacing}>
          <div className={Container}>
            <div className={DivStyles} />
            <header className={Subhead}>Sept 2022 - May 2026</header>
            <div className={Info}>
              <h3 className={SectionH3}>
                <div>
                  <a className={H3Container} href='https://www.bu.edu/' target='_blank' rel='noreferrer'>
                    <span className={H3Span} />
                    <span>
                      <img
                        className='mr-2 h-6 w-6 inline'
                        src='https://upload.wikimedia.org/wikipedia/commons/f/f5/Boston_University_seal.svg'
                        alt='Boston University Logo'
                      />
                      Boston University
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={LinkSvg}>
                        <path fillRule='evenodd' d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z' clipRule='evenodd' />
                      </svg>
                    </span>
                  </a>
                </div>
                <div className='text-slate-500'>Bachelor of Arts - BA, Computer Science</div>
              </h3>
              <p className={InfoP}>
                <b>Courses: </b> 
                  Applied Machine Learning, Mobile App Development, Data Science Tools & Applications, Distributed Systems, Database Systems, Software Engineering, Web Application Development, Analysis of Algorithms,
                  Functional Programming, Statistics, Computer Systems, Linear Algebra,
                  Discrete Math, Data Structures & OOP in Java
              </p>
            </div>
          </div>
        </li>

        {/* Relevant Courses */}
        <li id='courses' className={Spacing}>
          <div className={Container}>
            <div className={DivStyles} />
            <header className={Subhead} />
            <div className={Info}>
              <h3 className={SectionH3}>
                <div>
                  <Link className={H3Container} to='/courses' onClick={() => window.scroll(0, 0)}>
                    <span className={H3Span} />
                    <Link className={LinkWrapper} to='/courses' onClick={() => window.scroll(0, 0)}>
                      <span className='whitespace-nowrap'>
                        <span className={LinkText}>View Relevant Courses</span>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={RightArrowSvg}>
                          <path fillRule='evenodd' d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z' clipRule='evenodd' />
                        </svg>
                      </span>
                    </Link>
                  </Link>
                </div>
              </h3>
            </div>
          </div>
        </li>

        {/* Forest Hills High School */}
        <li className={Spacing}>
          <div className={Container}>
            <div className={DivStyles} />
            <header className={Subhead}>Sept 2018 - June 2022</header>
            <div className={Info}>
              <h3 className={SectionH3}>
                <div>
                  <a className={H3Container} href='https://www.foresthillshs.org/' target='_blank' rel='noreferrer'>
                    <span className={H3Span} />
                    <span>
                      <img
                        className='mr-2 h-6 w-6 inline'
                        src='https://upload.wikimedia.org/wikipedia/en/3/34/FHHS_Original_Seal.png'
                        alt='FHHS Logo'
                      />
                      Forest Hills High School
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={LinkSvg}>
                        <path fillRule='evenodd' d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z' clipRule='evenodd' />
                      </svg>
                    </span>
                  </a>
                </div>
                <div className='text-slate-500'>High School Diploma, Carl Sagan Honors Program (STEM)</div>
              </h3>
              <p className={InfoP}>
                <b>GPA:</b> 102.95 | <b>Rank:</b> 7/960 <br />
                <b>Activities: </b> Cross Country Team, Indoor Track & Field Team <br />
                <b>Diploma: </b> Regents Advanced Designation with Honor, Regents Designation with Mastery in Science, Regents Advanced Designation with Mastery in Math <br />
                <b>Awards:</b>
              </p>
              <ul className='list-disc ml-4 text-sm'>
                <li>President's Education Award for Excellence Gold Seal</li>
                <li>Outstanding Academic Excellence (GPA 100+)</li>
                <li>United States Marine Scholastic Excellence Award</li>
                <li>Forest Hills High School Scholar Athlete</li>
              </ul>
            </div>
          </div>
        </li>

      </ol>
      
    </div>
  );
};

export default About;
