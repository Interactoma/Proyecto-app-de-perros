import React from 'react';
import Card from './card';

export default function Cards(props) {
  return (
  <div>
    {props.map((c) => (
      <Card
        name = {c.name}
        image = {c.image}
      />
    ))}
  </div>
  )
};
