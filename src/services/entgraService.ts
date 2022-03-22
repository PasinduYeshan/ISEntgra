import {NativeModules} from 'react-native';

// Get Entgra Services from Native Modules and export
const {EntgraServiceManager} = NativeModules;

interface IEntgraServiceManager {
  getDeviceAttributes(
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ): void;
  getDeviceID(
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ): void;
}

export default EntgraServiceManager as IEntgraServiceManager;
