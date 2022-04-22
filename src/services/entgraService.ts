import {NativeModules} from 'react-native';

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
  return await EntgraServiceManager.enrollDevice();
}

export default EntgraServiceManager as IEntgraServiceManager;
