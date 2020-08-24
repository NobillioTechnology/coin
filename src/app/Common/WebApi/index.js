import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Utils from '../../pages/Utils';
import openSocket from 'socket.io-client';

// const baseUrl = 'https://www.coinbaazar.com/api/v1';
const baseUrl='https://uat.coinbaazar.com/api/v1';
const user = '/user/';
const trade='/trade/';
const feedback = '/feedback/';
const stati='/static/';
import DeviceInfo from 'react-native-device-info';

export const socket = openSocket('https://uat.coinbaazar.com/');

export default class WebApi extends Component {
	
	static postApi_WT_user(url, body){
        // console.log(body);
		return fetch(baseUrl+user+url, {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body:body
		})
	}

	static postApi_user=async(url, body)=>{
		console.log(body);
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		// console.log('_id==', _id, '\n','token====>', token );

		return fetch(baseUrl+user+url, {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		    token:token,
		    id:_id,
		    _id:_id,
		  },
		  body:body
		})
	}

	static postApi_WT_trade(url, body){
        console.log(body);
		return fetch(baseUrl+trade+url, {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body:body
		})
	}

	static postApi_trade=async(url, body)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		console.log('Body==>', body, '\n', token, '\n', _id);
		return fetch(baseUrl+trade+url, {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		    token:token,
		    id:_id,
		    _id:_id,
		  },
		  body:body
		})
	}

	static getApi_trade(url){
		console.log(url);
		return fetch(baseUrl+trade+url, {
			method:'GET',
	 	    headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  }
		})
	}

	static getApi_user=async(url)=>{
		console.log(url);
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+url, {
			method:'GET',
	 	    headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				token:token,
				id:_id,
				_id:_id
			}
		})
	}

	static postApi_escrow=async(url, body)=>{
		console.log(url , body);
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+url, {
			method:'POST',
	 	    headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				token:token,
				id:_id,
				_id:_id
			},
			body:body
		})
	}

	static postApi_feedback=async(url, body)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		console.log('Body==>', body, '\n', token, '\n', _id, '\n', baseUrl+feedback+url);
		return fetch(baseUrl+feedback+url, {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		    token:token,
		    id:_id,
		    _id:_id,
		  },
		  body:body
		})
	}

	static getProfile=async(id)=>{
			const token= await AsyncStorage.getItem(Utils.token);
			const _id= await AsyncStorage.getItem(Utils._id);
			return fetch(baseUrl+user+'userProfile', {
			 	  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    _id:id,
					})
			})
	}


	static setRealName=async(_id, name)=>{
		const token = await AsyncStorage.getItem(Utils.token);
		return fetch(baseUrl+user+'updateUserInfo', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    _id:_id,
				    name:name
				})
		})
	}

	static uploadProfile=async(image)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		console.log('token===>',JSON.stringify({
			userId:_id,
			image:image.substring(0, 50)
		}) );
		return fetch(baseUrl+user+'updateProfile', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    userId:_id,
				    image:image
				})
		})
	}

	static sendOtpPhone=async(code, numebr)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		console.log('token===>', token);
		return fetch(baseUrl+user+'sent_phone_otp1', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    country_code:code,
				    phone_number:numebr,
				    _id:_id
				})
		})
	}

	static verifyOtp=async(code, number, otp)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		console.log('token===>', token);
		return fetch(baseUrl+user+'verify1', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    country_code:code,
				    phone_number:number,
				    _id:_id,
				    phoneOtp:otp
				})
		})
	}

	static verfication=async(fName, lName, dob, country, docType, docId, file1, file2, file3, city, address,  pinCode)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+'uploadKyc', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    _id:_id,
				    first_name:fName,
				    last_name:lName,
				    date_of_birth:dob,
				    country:country,
				    doc_name:docType,
				    doc_id:docId,
				    frontView:file1,
				    backView:file2,
				    bothView:file3,
				    city:city,
				    address:address,
				    post_code:pinCode,
				})
		})
	}

	static accountDeletion=async(pass)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+'account_deletion_request', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    _id:_id,
				    password:pass,
				})
		})
	}

	static changeEmail=async(pass, email)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+'changeEmail', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    _id:_id,
				    password:pass,
				    email:email
				})
		})
	}

	static contactUs=async(subject, msg, email, image)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+'/admin/addContactUs', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    userId:_id,
				    subject:subject,
				    message:msg,
				    email:email,
				    image:image
				})
		})
	}

	static getPrivacyPolicy=async(type)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+stati+'staticContent', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				  	type:type
				})
		})	
	}

	static setOtpFactor=async(_id, twoFactVeri, twoFactAuth)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		return fetch(baseUrl+user+'two_factor_auth', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				  	_id:_id,
				  	Two_FA_verification:twoFactVeri,
				  	two_factor_auth:twoFactAuth
				})
		})
	}

	static getGoogleFactor=async()=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+'enableGoogleTwoFactor', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				  	_id:_id,
				})
		})
	}

	static setGoogleFactor=async(otp)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+'twoFactorOtpVerification', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				  	_id:_id,
				  	otp:otp
				})
		})
	}

	static loginGuard=async(loginGuard)=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+user+'loginGuard', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				  	_id:_id,
				  	browser_id:DeviceInfo.getUniqueId(),
				  	loginGuard:loginGuard,
				})
		})
	}

	static getCompletedTrade=async()=>{
		const token= await AsyncStorage.getItem(Utils.token);
		const _id = await AsyncStorage.getItem(Utils._id);
		return fetch(baseUrl+trade+'getCompleteTradeList', {
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				    token:token,
				    id:_id,
				    _id:_id,
				  },
				  body: JSON.stringify({
				    userId:_id,
				    limit:10,
				    pageNumber:1
				})
		})
	}

}