import React from 'react';

function Faqs({faq, index, toggleFaq}) {
  return (
    <div 
      className={"faq " + (faq.open ? 'open': '')}
      key={index}
      onClick={() => toggleFaq(index)}
    >
      <div className="faq-question">
        <span className="faq-text">{faq.question}</span>
      </div>
      <div className="faq-answer">
        <span className="faq-text">{faq.answer}</span>
      </div>
    </div>
  )
}

export default Faqs;