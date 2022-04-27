import {NativeModules} from 'react-native';
import {storeString} from "../utils/Storage";
// Get Entgra Services from Native Modules and export
const {EntgraServiceManager} = NativeModules;

interface IEntgraServiceManager {
  getDeviceAttributes(): Promise<any>;
  getDeviceID(): Promise<string>;
  enrollDevice(): Promise<string>;
}

/**
 * This method returns a Promise that resolves with the device attributes,
 * fetched form the native module
 * @example
 * ```
 * getDeviceAttributes().then((response) => {
 *     console.log(response);
 * }).catch((error) => {
 *     console.error(error);
 * });
 * ```
 */
export async function getDeviceAttributes(): Promise<any> {
  return await EntgraServiceManager.getDeviceAttributes();
}

/**
 * This method returns a Promise that resolves with the device identifier,
 * fetched form the native module
 * @example
 * ```
 * getDeviceID().then((response) => {
 *     console.log(response);
 * }).catch((error) => {
 *     console.error(error);
 * });
 * ```
 */
export async function getDeviceID(): Promise<string> {
  return await EntgraServiceManager.getDeviceID();
}

/**
 * This method returns a Promise that resolves with the success message
 * @example
 * ```
 * enrollDevice().then((response) => {
 *     console.log(response);
 * }).catch((error) => {
 *     console.error(error);
 * });
 * ```
 */
export async function enrollDevice(): Promise<string> {
  try {
    await EntgraServiceManager.enrollDevice();
    await storeString('enrolledState', 'true');
    return "Successfully enrolled device";
  } catch (error) {
    console.error(error);
    return "Device enrollment failed";
  }
}

export default EntgraServiceManager as IEntgraServiceManager;
