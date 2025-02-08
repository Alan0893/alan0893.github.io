import React from 'react';
import {
  Spacing,
  Info,
  H3Container,
  H3Span,
  LinkSvg,
  InfoP,
  ChipWrapper,
  Chip,
  ProjWrapper,
  ProjDiv,
  Time,
  SingleBlockContainer,
	Timeline,
	TimelineDot,
	TimelineDot2,
	Details,
	List
} from '../../styles/styles';

const Experience = () => {  
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className={Timeline} />

			{/* Experience blocks */}
      <ul className={`${SingleBlockContainer} space-y-12`}>

				{/* Experience 2 */}
        <li className={`${Spacing} relative pl-12`}>
          <div className={`${TimelineDot} bg-green-500/90`} />
          
          <div className={ProjWrapper}>
            <div className={ProjDiv} />
            <div className={`${Time} mb-4`}>
              <span className={TimelineDot2}>
                Jan 2025 - PRESENT
              </span>
            </div>

            <div className={`${Info} ${Details}`}>
              <h3>
                <a className={H3Container} href='https://www.bu.edu/spark/' target='_blank' rel='noreferrer'>
                  <span className={H3Span} />
                  <span>
                    BU Spark!
                    <span className='inline-block'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={LinkSvg}>
                        <path fillRule='evenodd' d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z' clipRule='evenodd' />
                      </svg>
                    </span>
                  </span>
                </a>
              </h3>

              <ul className={List}>
                <li>TBD</li>
              </ul>
              <ul className={ChipWrapper}>
                {[].map((skill) => (
                  <li key={skill} className='mr-1.5 mt-2'>
                    <div className={Chip}>{skill}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>

        {/* Experience 2 */}
        <li className={`${Spacing} relative pl-12`}>
          <div className={`${TimelineDot} bg-blue-500/90`} />
          
          <div className={ProjWrapper}>
            <div className={ProjDiv} />
            <div className={`${Time} mb-4`}>
              <span className={TimelineDot2}>
                Sep 2024 - Dec 2024
              </span>
            </div>

            <div className={`${Info} ${Details}`}>
              <h3>
                <a className={H3Container} href='https://github.com/Alan0893/Boston-Budget-Analysis' target='_blank' rel='noreferrer'>
                  <span className={H3Span} />
                  <span>
                    City of Boston : Data Analyst
                    <span className='inline-block'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={LinkSvg}>
                        <path fillRule='evenodd' d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z' clipRule='evenodd' />
                      </svg>
                    </span>
                  </span>
                </a>
              </h3>

              <ul className={List}>
                <li>Engineered Flask web application analyzing $4.7B+ municipal budget data, implementing RESTful APIs and pandas data pipelines for real-time financial analytics visualization</li>
                <li>Implemented linear regression analysis using scikit-learn to correlate per capita income with municipal spending across Boston neighborhoods, processing 4 years (FY22-FY25) of finanical data</li>
                <li>Built interactive choropleth maps using Folium and GeoPandas to visualize $4.7B+ budget allocation across Boston neighborhoods, highlighting geographic spending patterns and socioeconomic disparties</li>
              </ul>
              <ul className={ChipWrapper}>
                {['Data Analysis', 'Linear Regression', 'Flask', 'Python'].map((skill) => (
                  <li key={skill} className='mr-1.5 mt-2'>
                    <div className={Chip}>{skill}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>

        {/* Experience 1 */}
        <li className={`${Spacing} relative pl-12`}>
          {/* Timeline dot */}
          <div className={`${TimelineDot} bg-purple-500/90`}/>
          
          <div className={ProjWrapper}>
            <div className={ProjDiv} />
            <div className={`${Time} mb-4`}>
              <span className={TimelineDot2}>
                Nov 2022
              </span>
            </div>

            <div className={`${Info} ${Details}`}>
              <h3>
                <a className={H3Container} href='https://bostonhacks.org/' target='_blank' rel='noreferrer'>
                  <span className={H3Span} />
                  <span>
                    BostonHacks 2022 - Hackathon : Developer
                    <span className='inline-block'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={LinkSvg}>
                        <path fillRule='evenodd' d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z' clipRule='evenodd' />
                      </svg>
                    </span>
                  </span>
                </a>
              </h3>

              <ul className={List}>
                <li>Co-developed a stock prediction tool for Dow Jones Companies, enhancing investment decision-making capabilities and achieving an 85% prediction accuracy rate</li>
                <li>Employed the yfinance library to extract and analyze 5 years of historical stock data for 20 Dow Jones Companies, enabling comprehensive data analysis</li>
                <li>Applied Plotly to craft interactive data visualizations, increasing user engagement by 20$</li>
                <li>Implemented automated data pipelines using yfinance API</li>
              </ul>
              <ul className={ChipWrapper}>
                {['Python', 'Streamlit', 'Data Visualization'].map((skill) => (
                  <li key={skill} className='mr-1.5 mt-2'>
                    <div className={Chip}>{skill}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      </ul>

    </div>
  )
}

export default Experience;
