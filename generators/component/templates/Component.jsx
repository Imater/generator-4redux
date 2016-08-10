import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';

import styles from './<%= Case.pascal(componentName) %>.styl';

export default class <%= Case.pascal(componentName) %> extends Component {
  static propTypes = {
    mode: pt.oneOf([]),
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }
  static defaultProps = {
    mode: 'h5'
  }
  render() {
    const { mode, children } = this.props;
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], {
          })
        }
      >
        {children}
      </div>
    );
  }
}
