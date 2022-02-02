package com.isentgra;

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

// Entgra SDK APIs
import io.entgra.device.mgt.sdk.api.compromise.CompromiseCheck
import io.entgra.device.mgt.sdk.api.http.Server
import io.entgra.device.mgt.sdk.common.exception.NetworkAccessException
import io.entgra.device.mgt.sdk.info.TelephoneInfo

class EntgraServiceManager(reactContext : ReactApplicationContext, context : Context) : ReactContextBaseJavaModule(reactContext) {
    // Context for Entgra Device managment sdk
    var ctx : Context = context;
    
    
    override fun getName(): String {
        return "EntgraServiceManager";
    }

    // init{
    //     setDeviceAttributes(); 
    // }

    fun setDeviceAttributes  () : WritableMap{
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

    @ReactMethod
    fun getDeviceAttributes(  successCallback : Callback, errorCallback : Callback) {
        try {
            val result = setDeviceAttributes(); 
            successCallback.invoke(result);
        } catch (e: Exception) {
            errorCallback(e.toString());
        }
    }

}


