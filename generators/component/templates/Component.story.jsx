import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import <%= Case.pascal(componentName) %> from '.';

storiesOf('<%= Case.pascal(componentName) %>')
  .addWithInfo('Default without props', () => (
    <<%= Case.pascal(componentName) %> />
  ))
  .addWithInfo('Default with children', () => (
    <<%= Case.pascal(componentName) %>><%= Case.pascal(componentName) %></<%= Case.pascal(componentName) %>>
  ));

