import React, { useState } from 'react';
import Faqs from '../../Components/Faqs/Faqs';
import './faq.css';

function Faq(){
  const [faqs, setFaqs] = useState([
    {
      question: 'Is there a limit to the number of files I can add subtitles to?',
      answer: 'There is no limit. You can add as many subs as you want.',
      open: false
    },
    {
      question: 'How much does it cost to "Sub" my video?',
      answer: 'It costs 0.1$ for every minute you are adding subs to.',
      open: false
    },
    {
      question: 'How much does it take for my "Sub" to be ready for use?',
      answer: 'The process is fairly fast but it mostly depends on the length of the file.',
      open: false
    },
    {
      question: 'Can I use the app with any kind of audio/video file?',
      answer: 'The process should work for any kind of audio/video file. If you encounter problems, please let us know and it return, we will let you use the app for free for a total file length of 240 minutes.',
      open:false
    },
    {
      question: 'Is the app available for mobile use aswell',
      answer: 'You can use the app on all platforms.',
      open: false
    }
  ]);

  const toggleFaq = index => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }
  return (
    <React.Fragment>
      <div className="content">
        <div className="info-container">
          <h3 className="faq-title">In this section we try to answer any questions that you may have about our services.</h3>
          <div className="faqs">
            {faqs.map((faq, i) => (
              <Faqs faq={faq} index={i} toggleFaq={toggleFaq} key={i}/>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Faq