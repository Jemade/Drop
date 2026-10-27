import {fetchSession} from './session-api.js';
export class SignInRequired extends Error {constructor(message='Your sign-in has expired. Please sign in again.'){super(message);this.name='SignInRequired';}}
export async function verifyAccount(expectedId,request=fetch){
 const response=await fetchSession(request);
 if(response.status===401)throw new SignInRequired();
 if(!response.ok)throw new Error('We could not check your sign-in. Please try again.');
 const data=await response.json();
 if(!data.user||typeof data.user.id!=='string'||!data.user.id||typeof data.user.email!=='string'||!data.user.email)throw new SignInRequired();
 if(data.user.id!==expectedId)throw new SignInRequired('The signed-in account has changed. Reopen Drop to continue with the current account.');
 return data.user;
}
