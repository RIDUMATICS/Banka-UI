import react, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = () => {
  const questions = [
    {
      title: 'Do you charge me to use Banka?',
      content:
        "Creating an account at Banka is free and we do not charge you any kind of commission for the use of the service. Because it's fair.",
    },
    {
      title: 'How do i know if my money is safe?',
      content:
        'Your transactions are carried out through unattachable and intangible trust bank accounts, eliminating any risk of fraud. Just as safe as a bank.',
    },
    {
      title:
        'Why is it important to provide personal information to create a Banka account?',
      content:
        'For your security, it is important to validate your personal data to avoid risks of impersonation, fraud and comply with the regulations for the prevention of money laundering and terrorist financing.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className="w-full md:flex-auto md:w-36 divide-y">
      {questions.map(({ title, content }, index) => (
        <AccordionItem
          key={index}
          position={index}
          title={title}
          content={content}
          activate={(post) => setActiveIndex(post)}
          active={index === activeIndex}
        />
      ))}
    </div>
  );
};

export default Accordion;
