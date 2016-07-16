import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TodoList from '../TodoList';

storiesOf('TodoList', module)
  .add('alguns checados e alguns não checados', () => (
    <TodoList items={[
        {
          name:'test',
          checked: true,
        }, {
          name: 'banana',
          checked: false
        }
      ]} />
  ))
  .add('with no items', () => (
    <TodoList items={[]} />
  ));
