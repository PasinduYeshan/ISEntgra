# Entgra IS React Native Sample Application

## Introduction

Nowadays, offering a mobile application for any software solution has become a modern-day necessity. Our goal is to secure the user by considering security aspects of mobile device and based on this device information we can decide to authenticate the user with minimal steps, improving the user experience or step up or even block access if the device is in an unsecured state.Entgra IS React Native Sample application demonstrate how to step up or step down authentication based on device attributes.

## Getting Started

You can experience the capabilities of Entgra IS React Native Sample Application by following this small guide which contains main sections listed below.

- [Configuring the Entgra IoT Server](https://www.notion.so/Entgra-IS-React-Native-Sample-Application-9f366458d9da4c409fd9aff64dfe6325)
- [Configuring the WSO2 Identity Server](https://www.notion.so/Entgra-IS-React-Native-Sample-Application-9f366458d9da4c409fd9aff64dfe6325)
- [Configure Just-in-Time (JIT) user provisioning](https://www.notion.so/Entgra-IS-React-Native-Sample-Application-9f366458d9da4c409fd9aff64dfe6325)
    - [Configuring the WSO2 Identity Server for JIT Provisioning](https://www.notion.so/Entgra-IS-React-Native-Sample-Application-9f366458d9da4c409fd9aff64dfe6325)
    - [Configuring the Entgra IoT Server for JIT Provisioning](https://www.notion.so/Entgra-IS-React-Native-Sample-Application-9f366458d9da4c409fd9aff64dfe6325)
- [Configuring the Sample Application](https://www.notion.so/Entgra-IS-React-Native-Sample-Application-9f366458d9da4c409fd9aff64dfe6325)

## Configuring the Entgra IoT Server

1. Register the application in Entgra IoT server by using following CURL command. For the Authorization header encode `username:password` to Base64 format and use the encoded value as `'Authorization: Basic {encodedValue}'`. Provide any name for the `applicationName` and provide the application owner’s username for the `username`. Copy the values of `client_id` and `client_secret`.
    
    ```jsx
    curl --location --request POST 'https://{mgtURL}/api-application-registration/register' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --data-raw '{ 
        "applicationName": "is_sdk1", 
        "tags": ["android","device_management"],
        "username": "admin",
        "allowedToAllDomains": false,
        "mappingAnExistingOAuthApp": false
    }
    '
    ```
    
    Response:
    
    `{"client_secret":"gBb6LATYVyxplGhvB6tcckBOvo8a","client_id":"O6lYcMOwg1wl9OfhCrUDB_QTkKwa"}`
    
2. Login to Entgra IoT management console from `https://{mgtURL}/carbon` and navigate to the **Service Providers** tab listed under the **Main** section. You will see the service provider you created above. 
3. Expand the **OAuth/OpenID Connect Configuration** section inside **Inbound Authentication Configuration** section and check if the `OAuth Client Key` is same as the `client_id` you got from the above response. 
4. Click on **Edit** button and you will be redirected to Application Settings page.  
    
    Make sure **Code** option in **Allowed Grant Types** and **Default** in **Token Issuer** are ticked. Provide a valid URL format ending with `/sdk/secure` for **Callback Url** section. 
    
    ![Screen Shot 2022-05-23 at 11 23 15 AM](https://user-images.githubusercontent.com/61885844/171582844-4ff662ea-039b-4d7f-b8d2-efa69ad7f7a2.png)

    ![Screen Shot 2022-05-23 at 11 22 28 AM](https://user-images.githubusercontent.com/61885844/171583041-cd088c67-fbb9-4d2a-a31d-b14e81855237.png)
    

## Configuring the WSO2 Identity server

1. If you haven’t downloaded WSO2 Identity server yet, please visit [https://wso2.com/identity-server/](https://wso2.com/identity-server/) and download the latest version of the Identity Server.
2. Go to [https://github.com/PasinduYeshan/identity-auth-entgra](https://github.com/PasinduYeshan/identity-auth-entgra) and follow exact steps to add Entgra connector and conditional authentication function to WSO2 Identity Server.
3. Start the WSO2 Identity server.  Login to WSO2 IS management console from [http://localhost:9443/carbon](http://localhost:9443/carbon)/ and navigate to **Service Providers** tab listed under the Identity section.
4. Click Add to add a new service provider.
5. Provide a name for the service provider (ex:- ISEntgra) and click **Register**. Now you will be redirected to the **Edit Service Provider** page.
6. Expand the **Inbound Authentication Configuration** section and click **Configure** under the **OAuth/OpenID Connect Configuration** section.
7. Under **Allowed Grant Types** uncheck everything except `Code` and `Refresh Token`.
8. Enter Callback URL(s) as for the following values.
    
    Callback Url: `wso2entgra://oauth2`
    
    > Alternatively if you’re running in an emulator, you can use `[http://10.0.2.2:8081](http://10.0.2.2:8081)` as the callback url.
    > 
9. Once the configurations are added, you will be redirected to the **Service Provider Details**
 page. Here, expand the **Inbound Authentication Configuration** section and click on the **OAuth/OpenID Connect Configuration**. Copy the value of `OAuth Client Key` shown here.
    
    ![Screen Shot 2022-05-30 at 1 03 15 PM](https://user-images.githubusercontent.com/61885844/171583227-e957efec-df32-4728-af18-004929481cfa.png)

    
10. Expand the **Local & Outbound Authentication Configuration** section and select **Advanced Configuration,** Now you will be redirected to **Advanced Authentication Configuration** page.
11. Expand **Script Based Adaptive Authentication** section and paste following code and edit according to your needs.
    
    ```jsx
    var onLoginRequest = function(context) {
        deviceID = context.request.params.device_id[0];
        platformOS = context.request.params.platformOS[0];
                executeStep(1, {
                    onSuccess : function (context) {
                        getDeviceInfoEntgra(context, platformOS, deviceID, {
                           onSuccess : function (context, deviceInfo) {
                                if (deviceInfo) {
                                    if(deviceInfo.IS_DEV_MODE == "true") {
                                        executeStep(2);
                                    }
                                }
                               },
                            onFail : function (context, error) {
                                var errorMap = {
                                    "errorCode": error.errorCode,
                                    "errorMessage" : error.errorMessage
                                };
                                fail(errorMap);
                            }
                        });
                    }
                }); 
    };
    ```
    

> In above code, inside the `getDeviceInfoEntgra` function’s `onSuccess` event handler you can access device information  as follows.
> 
> 1. Development mode enabled :- deviceInfo.IS_DEV_MODE
> 2. Device is rooted :- deviceInfo.ROOTED
> 3. ADB enabled :- deviceInfo.IS_ADB
11. Expand the **Authentication Step Configuration** and click on **Add Authentication Step**  button make sure to mark **Use subject identifier from this step** and **Use attributes from this step**. Then under **Local Authenticators** select an option and click on **Add authenticator** button. According to the above code there should be two authentication steps, therefore add another authentication steps and do not mark **Use subject identifier from this step** and **Use attributes from this step** options in this step.
    
    ![Screen Shot 2022-05-30 at 1 33 19 PM](https://user-images.githubusercontent.com/61885844/171583623-45b674e7-5fc9-4156-9f4e-2cf2640a243e.png)
    
12. Make sure to click the `Update` button to save the changes. Now you will be redirected **Service Providers** page and make sure to click the `Update` button on the bottom to save all the changes.
13. Navigate to **Identity Providers** tab listed under the Identity section. Click on **Resident** button and you will be redirected to **Resident Realm Configuration.**
14. Expand **Other Settings** and add the following configurations under **Entgra Configurations**.
    
    
    | Enable Entgra | True |
    | --- | --- |
    | Token URL | https://{hostname}/oauth2/token |
    | Device Information URL | https://{hostname}/api/device-mgt/v1.0/devices/1.0.0 |
    | Client Key | Client ID of the Service Provider created in the Entgra IoT server |
    | Client Secret | Client Secret of the Service Provider created in the Entgra IoT server |
15. Click on `Update` button to save the changes.

## Configure Just-in-Time (JIT) user provisioning

### Configuring the WSO2 Identity Server for JIT Provisioning

1. Login to WSO2 IS management console from [http://localhost:9443/carbon](http://localhost:9443/carbon)/ and navigate to **Service Providers** tab listed under the Identity section.
2. Click Add to add a new service provider.
3. Provide a name for the service provider (ex:- `EntgraIoTServer`) and click **Register**. Now you will be redirected to the **Edit Service Provider** page.
4. Expand the **Inbound Authentication Configuration** section and click **Configure** under the **OAuth/OpenID Connect Configuration** section.
5. Enter Callback URL(s) as for the following values.
    
    Callback Url: `https://{mgtURL}/commonauth`
    
6. Once the configurations are added, you will be redirected to the **Service Provider Details** page. Here, expand the **Inbound Authentication Configuration** section and click on the **OAuth/OpenID Connect Configuration**. Copy the values of `OAuth Client Key` and `OAuth Client Secret` shown here.
7. Expand **Claim Configuration** section and select `[http://wso2.org/claims/username](http://wso2.org/claims/username)` under **Subject Claim URI.** 
8. Click on **Add Claim URI** button and add select `[http://wso2.org/claims/groups](http://wso2.org/claims/groups)` option under **Local Claim** and tick on **Mandatory Claim** as follows.
    
    ![Screen Shot 2022-05-30 at 3 59 56 PM](https://user-images.githubusercontent.com/61885844/171583745-d68fb03f-7945-47a2-a20b-83f2300844cf.png)
    
9. Make sure to click the `Update` button to save the changes.
10. Navigate to **OIDC Scope** listed under **Manage** section. Click on **list** to see all the OIDC scopes. 
11. Click on **add claim** button of `openid` scope, then you will be redirected to **Edit associated OIDC claims for the scope openid** page.  Check if `groups` are listed under the claims. If not click on **Add OIDC Claim button** and select `groups` from the list then click on **Add**  button and finally click on **Finish** button to save the changes.
    
    ![Screen Shot 2022-05-30 at 8 27 49 PM](https://user-images.githubusercontent.com/61885844/171583897-fea1dec5-2798-4ed8-8cf6-85604985ef2f.png)
    
12. Login to WSO2 IS management console from [https://localhost:9443/connsole/](https://localhost:9443/console/) and navigate to **Groups** section listed under **Manage** section. 
13. Click on  `+ New Group` button and add two new groups. (ex :- entgra_user, entgra_admin_group).
14. Create a new user and assign the user to above created groups.

### Configuring the Entgra IoT Server for JIT Provisioning

1. Login to WSO2 IS management console from `https://{mgtURL}/carbon` and navigate to **Identity Providers** tab listed under the **Main** section
2. Click Add to add a new identity provider.
3. Provide a name for the identity provider (ex:- wso2is) and expand the **Basic Claim Configuration** under **Claim Configuration.** Click on **Add Claim Mapping**  and provide `groups` as **Identity Provider Claim URI** and `[http://wso2.org/claims/role](http://wso2.org/claims/role)` as **Local Claim URI**. Select `groups` under **Role Claim URI**.
    
    ![Screen Shot 2022-05-30 at 6 50 52 PM](https://user-images.githubusercontent.com/61885844/171584028-050bb647-d31b-478b-bef9-2b7d07b352b0.png)
    
4. Expand **Role Configuration** and click on **Add Role Mapping** and map your identity server’s group name to local role as follows.
    
    ![Screen Shot 2022-05-30 at 6 53 51 PM](https://user-images.githubusercontent.com/61885844/171584053-b4de4c30-e280-44b4-86a3-31b6ddda0041.png)
    
5. Expand **Federated Authenticators** section and add the following configurations under the **OAuth2/OpenID Connect Configuration** section.
    
    
    | Enable OAuth2/OpenIDConnect | Enable |
    | --- | --- |
    | Client Id | Client ID of the Service Provider created in the Identity Server for JIT provisioning. |
    | Client Secret | Client Secret of the Service Provider created in the Identity Server for JIT provisioning. |
    | Authorization Endpoint URL | https://localhost:9443/oauth2/authorize |
    | Token Endpoint URL | https://localhost:9443/oauth2/token |
    | Callback Url | https://{mgtURL}/commonauth |
    | Userinfo Endpoint URL | https://localhost:9443/oauth2/userinfo |
    | Logout Endpoint URL | https://localhost:9443/oidc/logout |
    | OpenID Connect User ID Location | User ID found in ‘sub’ attribute |
    | Additional Query Parameters | scope=openid |
6. Expand the **Just-in-Time Provisioning** section and enable **Provision silently** as follows. 
    
    ![Screen Shot 2022-05-30 at 7 08 30 PM](https://user-images.githubusercontent.com/61885844/171584080-7243d9fe-32c4-4a4b-83a3-fa6aea93c428.png)
    
7. Click on **Register** button to save the changes.

## **Configuring the Sample Application**

1. Clone/download this project from {repo link}.
2. Install the dependencies and generate the tar file by running the following command inside the `asgardeo-react-native-sdk/` directory.
    
    `npm pack`
    
3. Create a `.env` file inside the project folder and add the relevant configurations
    - Replace the value of `clientID` with the value of `OAuth Client Key` or `Client ID` which you copied when you configure the Service Provider `ISEntgra`.
    - Replace the `EntgraClientKey` and `EntgraClientSecret` with the values of `OAuth Client Key` or `Client ID` which you copied when you register the application in Entgra IoT server.
        
        ```jsx
        # IS Configs
        IS_BASE_URL=https://{hostname}:{port}
        SIGN_IN_REDIRECT_URL=wso2entgra://oauth2
        CLIENT_ID='ClientID'
        
        # Entgra Configs
        ENTGRA_BASE_URL=https://{gatewayURL}
        ENTGRA_CLIENT_KEY='EntgraClientKey'
        ENTGRA_CLIENT_SECRET='EntgraClientSecret'
        ENTGRA_CALLBACK_URL=https://localhost/sdk/secure
        ENTGRA_MGT_URL=https://{mgtURL}
        ```
        
        Example:
        
        ```jsx
        # IS Configs
        IS_BASE_URL=https://localhost:9443
        SIGN_IN_REDIRECT_URL=wso2entgra://oauth2
        CLIENT_ID=cj7afMflxyiimER4F3kNE1H9Rg8a
        
        # Entgra Configs
        ENTGRA_BASE_URL=https://nest.gw.entgra.net
        ENTGRA_CLIENT_KEY=O6lYcMOwg1wl9OfhCrUDB_QTkKwa
        ENTGRA_CLIENT_SECRET=gBb6LATYVyxplGhvB6tcckBOvo8a
        ENTGRA_CALLBACK_URL=https://localhost/sdk/secure
        ENTGRA_MGT_URL=https://nest.mgt.entgra.net
        ```
        
4. Install the required dependencies by running the following command inside the `/` directory.
    
    `npm install`
    

## **Running the Sample App**

This application can be run either in an emulator or an actual device. Some configurations may differ depending on the OS.

### **Android Setup**

1. If the WSO2 IS is hosted in the local machine, you have to change the domain of the endpoints defined in `config` object at `screen/LoginScreen` file to `10.0.2.2`. Refer the documentation on [emulator-networking](https://developer.android.com/studio/run/emulator-networking). Next change the hostname of Identity server as `10.0.2.2` in the `<IS_HOME>/repository/conf/deployment.toml` file.
2. By default IS uses a self-signed certificate. If you ended up in SSL issues and are using the default pack without changing to a CA signed certificate, follow this [guide](https://developer.android.com/training/articles/security-config) to get rid of SSL issues.
3. Sometimes you may get `SSLHandshakeException` in android application since WSO2 IS is using a self-signed certificate. To fix this exception, you need to add the public certificate of IS to the sample application.
    
    i. Create a new keystore with CN as localhost and SAN as `10.0.2.2`.
    
    `keytool -genkey -alias wso2carbon -keyalg RSA -keystore wso2carbon.jks -keysize 2048 -ext SAN=IP:10.0.2.2`
    
    ii. Export the public certificate (ex: `wso2carbon.pem`) to add into the truststore.
    
    `keytool -exportcert -alias wso2carbon -keystore wso2carbon.jks -rfc -file wso2carbon.pem`
    
    iii. Import the certificate in the client-truststore.jks file located in  `<IS_HOME>/repository/resources/security/`.
    
    `keytool -import -alias wso2is -file wso2carbon.pem -keystore client-truststore.jks -storepass wso2carbon`
    
    iv. Now copy this public certificate (`wso2carbon.pem`) to the  `app/src/main/res/raw`  folder.
    
    v. Create a new file named  `network_security_config.xml`  in `sample/android/app/src/main/res/xml` folder and copy the below content to it. Make sure to replace `wso2carbon` with the certificate name you added.
    
    `<?xml version="1.0" encoding="utf-8"?>
       <network-security-config>
          <domain-config cleartextTrafficPermitted="true">
             <domain includeSubdomains="true">localhost</domain>
             <domain includeSubdomains="true">10.0.2.2</domain>
                <trust-anchors>
                      <certificates src="@raw/wso2carbon"/>
                </trust-anchors>
             <domain includeSubdomains="true">192.168.43.29</domain>
             <base-config cleartextTrafficPermitted="true"/>
          </domain-config>
       </network-security-config>`
    
    vi. Then add the following config to the  `sample/android/app/src/main/AndroidManifest.xml`  file  under  `application` section.
    
    `android:networkSecurityConfig="@xml/network_security_config"`
    
    Now the `AndroidManifest.xml` file should look like below.
    
    `<?xml version="1.0" encoding="utf-8"?>
       <manifest ... >
          <application
            android:networkSecurityConfig="@xml/network_security_config"
            ...
          >
             ...
          </application>
       </manifest>`
    

### **Running in an Android Emulator**

1. Create a suitable Android virtual device using the **Android virtual device manager (AVD Manager)** and launch it.
2. Build and deploy the apps by running the following command at the root directory.
    
    `react-native run-android`
    

### **Running in an Android Device**

1. Enable **Debugging over USB** and plug in your device via USB.
2. Build and deploy the apps by running the following command at the root directory.
    
    `react-native run-android`
    

> If you're running in a development or debugging mode, start the Metro by running the following command.
> 

`react-native start`
