import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TodoList.css';

class TodoList extends React.Component {
  render () {
    const { items } = this.props;
    return (
      <ul className={s.root}>
      {
        items.map((item, i) => (
          <li key={i} className={s.item}>
            {item.checked && '[OK--]'}
            {item.name}
          </li>
        ))
      }
      </ul>
    )
  }
}
export default withStyles(s)(TodoList);
