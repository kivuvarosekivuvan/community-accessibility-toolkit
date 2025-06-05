import React from 'react';

const facts = [
  "1 in 5 people in the world live with a disability.",
  "Accessibility can improve usability for all users.",
  "Color blindness affects approximately 1 in 12 men and 1 in 200 women.",
];

const CuriosityCorner = () => {
  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  return (
    <section>
      <h2>Curiosity Corner</h2>
      <p>{randomFact}</p>
    </section>
  );
};

export default CuriosityCorner;