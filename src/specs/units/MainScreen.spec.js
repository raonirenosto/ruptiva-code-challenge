import 'react-native';
import React from 'react';
import jest from 'jest';
import MainScreen from '../../app/screens/MainScreen';

import renderer from 'react-test-renderer';

it('should render MainScreen', async () => {
  const tree = await renderer.create(
    <MainScreen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});