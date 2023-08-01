import '@testing-library/jest-native/extend-expect';
import { NativeModules } from 'react-native';

// Mocking react-navigation modules
NativeModules.RNDeviceInfo = {
  getSystemName: () => 'Android', // or 'iOS' depending on your target platform
};
