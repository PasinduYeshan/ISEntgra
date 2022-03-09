package com.isentgra.entgraServices;

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.provider.Settings
import android.content.Context
import android.text.style.WrapTogetherSpan 
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.Callback
import com.google.gson.JsonElement

// Entgra SDK APIs
import io.entgra.device.mgt.sdk.api.compromise.CompromiseCheck
import io.entgra.device.mgt.sdk.api.http.Server
import io.entgra.device.mgt.sdk.common.exception.NetworkAccessException
import io.entgra.device.mgt.sdk.info.TelephoneInfo
import io.entgra.device.mgt.sdk.info.DeviceInfo

class EntgraServiceManager(reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    // Context for Entgra Device managment sdk
    var ctx : Context = reactContext;
    
    
    override fun getName(): String {
        return "EntgraServiceManager";
    }

    // Get device attributes using local SDK APIs
    fun getDeviceAttributesLocally  () : WritableMap{
        var compromiseCheck = CompromiseCheck(ctx);
        var isDeviceRooted = compromiseCheck.isDeviceRooted();
        var isDevModeEnabled = compromiseCheck.isDevModeEnabled();
        var isADBEnabled = compromiseCheck.isADBEnabled();
        var resultData =  WritableNativeMap();
        resultData.putBoolean("isDeviceRooted", isDeviceRooted);
        resultData.putBoolean("isDevModeEnabled", isDevModeEnabled);
        resultData.putBoolean("isADBEnabled", isADBEnabled);
        return resultData;
    }

    
    // Get telephone info locally 
    fun getTelephoneInfoLocally  () : Set<Map.Entry<String, JsonElement?>> {
        var telephoneInfo = TelephoneInfo(ctx)
        val entrySet: Set<Map.Entry<String, JsonElement?>> = telephoneInfo.getAllProperties().entrySet();
        return entrySet;
    }

    // Get device identifier
    fun getDeviceIdentifier () : String {
        var deviceInfo = DeviceInfo(ctx)
        var deviceId = deviceInfo.getDeviceId()
        return deviceId;
    }

    @ReactMethod
    fun getDeviceAttributes(  successCallback : Callback, errorCallback : Callback) {
        try {
            val result = getDeviceAttributesLocally(); 
            successCallback(result);
        } catch (e: Exception) {
            errorCallback(e.toString());
        }
    }

    @ReactMethod
    fun getDeviceID(  successCallback : Callback, errorCallback : Callback) {
        try {
            val result = getDeviceIdentifier(); 
            successCallback(result);
        } catch (e: Exception) {
            errorCallback(e.toString());
        }
    }

}


