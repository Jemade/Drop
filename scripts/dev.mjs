import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {createHandler} from '../worker/index.js';
import {readdir} from 'node:fs/promises';
import path from 'node:path';
const assets={};
async function collect(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await collect(p);else assets['/'+path.relative('public',p)]={data:(await readFile(p)).toString('base64')};}}
await collect('public');const handle=createHandler(assets);
// Explicit loopback-only development identity. Production does not use this server.
http.createServer(async(req,res)=>{const headers=new Headers();for(const [k,v] of Object.entries(req.headers))if(v)headers.set(k,String(v));headers.delete('oai-authenticated-user-id');headers.delete('oai-authenticated-user-email');headers.set('oai-authenticated-user-id','local-development');headers.set('oai-authenticated-user-email','development@localhost');try{const result=await handle(new Request('http://127.0.0.1:8000'+req.url,{method:req.method,headers}));res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));}catch{res.writeHead(500);res.end('Development server error');}}).listen(8000,'127.0.0.1',()=>console.log('Drop development mode: http://127.0.0.1:8000. Local identity only; never expose this server publicly.'));
