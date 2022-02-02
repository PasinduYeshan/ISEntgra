package com.isentgra;

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.provider.Settings
import android.content.Context 

// Entgra SDK APIs
import io.entgra.device.mgt.sdk.api.compromise.CompromiseCheck
import io.entgra.device.mgt.sdk.api.http.Server
import io.entgra.device.mgt.sdk.common.exception.NetworkAccessException
import io.entgra.device.mgt.sdk.info.TelephoneInfo

class EntgraServiceManager(reactContext : ReactApplicationContext, context : Context) : ReactContextBaseJavaModule(reactContext) {

    var c : Context = context;
    var isDeviceRooted : String = ""
    var isDevModeEnabled: String = ""
    var isADBEnabled : String = ""
    

    override fun getName(): String {
        return "EntgraServiceManager";
    }

    fun setDeviceAttributes() {
        var compromiseCheck = CompromiseCheck(c);
        isDeviceRooted = compromiseCheck.isDeviceRooted().toString()
        isDevModeEnabled = compromiseCheck.isDevModeEnabled().toString()
        isADBEnabled = compromiseCheck.isDeviceRooted().toString()
        
    }

    @ReactMethod
    fun getDeviceAttributes(response : Promise) {
        try {
            setDeviceAttributes(); 
            response.resolve(isDeviceRooted);
        } catch (e: Exception) {
            response.reject("Error", e)
        }
    }

    // companion object {
    //     private lateinit var context: Context
    //     private var deviceAttributes: DeviceAttributes = DeviceAttributes();

    //     fun setContext(con: Context) {
    //         // context=con
            
    //     }
    // }

}


