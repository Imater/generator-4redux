import React from 'react';
import { shallow } from 'enzyme';
import <%= Case.pascal(componentName) %> from '.';

describe('@component <%= Case.pascal(componentName) %>', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<<%= Case.pascal(componentName) %> />)).to.have.length(1);
  });
  it('should render normal with children content', () => {
    expect(shallow(<<%= Case.pascal(componentName) %>><%= Case.pascal(componentName) %><<%= Case.pascal(componentName) %> />)).to.have.length(1);
  });
});

