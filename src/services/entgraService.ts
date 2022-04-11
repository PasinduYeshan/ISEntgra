import {NativeModules} from 'react-native';

// Get Entgra Services from Native Modules and export
const {EntgraServiceManager} = NativeModules;

interface IEntgraServiceManager {
  getDeviceAttributes(): Promise<any>;
  getDeviceID(): Promise<string>;
}

// Get Device Attributes from Native Entgra Module
export async function getDeviceAttributes(): Promise<any> {
  return await EntgraServiceManager.getDeviceAttributes();
}

// Get DeviceID from Native Entgra Module
export async function getDeviceID(): Promise<string> {
  return await EntgraServiceManager.getDeviceID();
}

export default EntgraServiceManager as IEntgraServiceManager;
