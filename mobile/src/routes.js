import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    Profile,
  })
);
