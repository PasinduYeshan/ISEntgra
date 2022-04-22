import {NativeModules} from 'react-native';

// Get Entgra Services from Native Modules and export
const {EntgraServiceManager} = NativeModules;

interface IEntgraServiceManager {
  getDeviceAttributes(): Promise<any>;
  getDeviceID(): Promise<string>;
  enrollDevice(): Promise<void>;
}

// Get Device Attributes from Native Entgra Module
export async function getDeviceAttributes(): Promise<any> {
  return await EntgraServiceManager.getDeviceAttributes();
}

// Get DeviceID from Native Entgra Module
export async function getDeviceID(): Promise<string> {
  return await EntgraServiceManager.getDeviceID();
}

export async function enrollDevice(): Promise<void> {
  return await EntgraServiceManager.enrollDevice();
}

export default EntgraServiceManager as IEntgraServiceManager;
