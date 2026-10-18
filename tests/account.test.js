import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyAccount,SignInRequired} from '../public/account.js';
const user={id:'user-a',email:'a@example.com',name:'A'};
test('sign-in check requests the current server session without caching',async()=>{const result=await verifyAccount('user-a',async(path,options)=>{assert.equal(path,'/api/session');assert.equal(options.credentials,'same-origin');assert.equal(options.cache,'no-store');return Response.json({user});});assert.deepEqual(result,user);});
test('expired or changed accounts cannot continue under an earlier workspace identity',async()=>{await assert.rejects(verifyAccount('user-a',async()=>new Response(null,{status:401})),SignInRequired);await assert.rejects(verifyAccount('user-b',async()=>Response.json({user})),SignInRequired);});
test('invalid session responses do not grant workspace access',async()=>{for(const user of [null,{}, {id:'',email:'a@example.com'}, {id:'user-a'}])await assert.rejects(verifyAccount('user-a',async()=>Response.json({user})),SignInRequired);});
test('a failed server check is an error, not successful authentication',async()=>{await assert.rejects(verifyAccount('user-a',async()=>new Response(null,{status:503})),/could not check/);await assert.rejects(verifyAccount('user-a',async()=>{throw new Error('Offline');}),/Offline/);});
