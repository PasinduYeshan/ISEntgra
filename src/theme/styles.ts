/**
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  body: {
    margin: 10,
    color: 'white',
  },

  button: {
    alignContent : 'center',
    // marginLeft: '35%',
    width: '40%',
    marginVertical: 5,
  },

  deco: {
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },

  flex: {
    // backgroundColor: '#e2e2e2',
    borderColor: '#c5c5c5',
    borderWidth: 1,
    backgroundColor : 'black',
    
  },

  flexBody: {
    fontWeight: 'bold',
    marginLeft: 10,
  },

  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 70,
    color: 'black',
  },

  flexDetails: {
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
  },

  flexHeading: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
  },

  footer: {
    alignItems: 'center',
    paddingTop: 45,
    height : 40,
  },

  footerAlign: {
    maxHeight: 40,
    maxWidth: 100,
  },

  loginScreenImage: {
    borderRadius: 30,
    height: '62%',
    resizeMode: 'contain',
    maxWidth : '90%'
  },

  loadingScreenImage: {
    borderRadius: 30,
    // height: '40%',
    resizeMode: 'contain',
    width: '95%',
  },

  image: {
    borderRadius: 30,
    height: '40%',
    resizeMode: 'contain',
    // width: '85%',
    marginBottom: 10,
  },

  imageAlign: {
    alignItems: 'center',
  },

  loading: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF88',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  mainBody: {
    backgroundColor: '#0000',
  },

  refBody: {
    textAlign: 'center',
  },

  refToken: {
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },

  heading: {
    color: '#f47421',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom : 15
  },

  text: {
    backgroundColor: '#f47421',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 2,
    color: 'white',
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
  },

  topicText: {
    backgroundColor: '#f47421',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 2,
    color: 'white',
    width: '100%',
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 10,
    padding: 5,
  },

  textStyle: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  textpara: {
    borderBottomColor: '#282c34',
    color: '#2A2A2A',
    fontSize: 18,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'justify',
  },
  container: {
    backgroundColor: '#0000',
    alignItems: 'center',
  },
});

export {styles};
