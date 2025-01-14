import React, { useRef, useEffect, useState } from 'react';

// Styled components for consistent styling across app
import {
  Section,
  SectionHeading,
  SectionH2,
  Links,
  Footer,
  FormMain,
  FormWrapper,
  FormStyle,
  FormInput,
  FormButton
} from '../styles/styles';

// Import components
import Header from '../components/home/Header';

// Import global components
import ScrollIndicator from '../components/global/ScrollIndicator';

const Contact = () => {
  // Reference for scroll percentage calculations
  const contactRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Scroll listener to calculate scroll percentage for contact section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const contactScrollPercentage = ((scrollTop - contactRef.current.offsetTop) / contactRef.current.offsetHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, contactScrollPercentage)));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to validate email format using a regex
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    form.submit();
  };

  return (
    <>
      <Header />
      <main className={FormMain}>
        <section id='contact' className={Section} ref={contactRef}>
          <div className={SectionHeading}>
            <h2 className={SectionH2}>Contact</h2>
            <ScrollIndicator scrollPercentages={scrollPercentage.toFixed(2)} />
          </div>

          {/* Contact form */}
          <div className={FormWrapper}>
            <form
              action="https://formspree.io/f/xrbzvzdb" 
              method="POST"
              onSubmit={handleSubmit}
              className={FormStyle}
            >
              <label className="block">
                <span className="text-slate-200">Your Name</span>
                <input
                  type="text"
                  name="name"
                  className={FormInput}
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label className="block">
                <span className="text-slate-200">Your Email</span>
                <input
                  type="email"
                  name="email"
                  className={FormInput}
                  placeholder="Enter your email"
                  required
                />
              </label>
              <label className="block">
                <span className="text-slate-200">Your Message</span>
                <textarea
                  name="message"
                  rows="4"
                  className={FormInput}
                  placeholder="Enter your message"
                  required
                />
              </label>

              {/* Hidden input for bot protection */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} />
              <button
                type="submit"
                className={FormButton}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer Section */}
        <section className={Section}>
          <footer className={Footer}>
            <p>
              Connect with me on 
              <a className={Links} href='https://www.linkedin.com/in/alanl193/' target='_blank' rel='noreferrer'> LinkedIn </a>
              or 
              <a className={Links} href='https://github.com/Alan0893' target='_blank' rel='noreferrer'> GitHub </a>

              <br /><br />
              <span>
                <span className="inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M12,6 C12.5128358,6 12.9355072,6.38604019 12.9932723,6.88337887 L13,7 L13,11.5857864 L14.7071068,13.2928932 C15.0976311,13.6834175 15.0976311,14.3165825 14.7071068,14.7071068 C14.3466228,15.0675907 13.7793918,15.0953203 13.3871006,14.7902954 L13.2928932,14.7071068 L11.2928932,12.7071068 C11.1366129,12.5508265 11.0374017,12.3481451 11.0086724,12.131444 L11,12 L11,7 C11,6.44771525 11.4477153,6 12,6 Z" />
                  </svg>
                </span>
              </span>
              2024
            </p>
          </footer>
        </section>
        
      </main>
    </>
  );
};

export default Contact;
