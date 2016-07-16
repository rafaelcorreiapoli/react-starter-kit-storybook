import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Counter from '../Counter';

storiesOf('Counter', module)
  .add('contador normal', () => (
    <Counter estado={'normal'} />
  ))
  .add('contador invertido', () => (
    <Counter estado={'invertido'} />
  ));
