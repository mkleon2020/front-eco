import {BASE_PATH} from "../utils/constants";
import {authFetch} from "../utils/fetch";

export async function createAddressApi(address,logout){
	try {
		const url = `${BASE_PATH}/adresses`;
		const params = {
			method:"POST",
			headers:{
				"Content-Type": "application/json",
			},
			body:JSON.stringify(address),
		};
		const result = await authFetch(url,params,logout);
		return result;
		
	} catch (error) {
		console.log(error);
	}
}

 export async function getAdresses(idUser,logout){
	 try {
		const url = `${BASE_PATH}/adresses?users_permissions_user=${idUser}`;
		
		const result = await authFetch(url,null,logout);
		if(result.statusCode === 500) throw " Error del servidor";
		return result;
		 
	 } catch (error) {
		console.log(error);
	 }
 }

 export async function deleteAdress(idAddress,logout){
	try {
	   const url = `${BASE_PATH}/adresses/${idAddress}`;

	   const params = {
		method:"DELETE",
		headers:{
			"Content-Type": "application/json",
		},
	};
	   const result = await authFetch(url,params,logout);
	   if(result.statusCode === 500) throw " Error del servidor";
	   return true;
		
	} catch (error) {
	   console.log(error);
	   return false;
	}
}

 export async function updateAddressApi(idAddress,address, logout){
	try {
		const url = `${BASE_PATH}/adresses/${idAddress}`;
 
		const params = {
		 method:"PUT",
		 headers:{
			 "Content-Type": "application/json",
		 },
		 body: JSON.stringify(address),
	 };
		const result = await authFetch(url,params,logout);
		return result;
		 
	 } catch (error) {
		console.log(error);
		return null;
	 }
 }