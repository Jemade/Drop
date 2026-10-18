import {readFile,writeFile,mkdir,readdir,rm,copyFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const assets={};
async function collect(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())await collect(full);else {const relative='/'+path.relative(path.join(root,'public'),full).split(path.sep).join('/');assets[relative]={data:(await readFile(full)).toString('base64')};}}}
await collect(path.join(root,'public'));
const twitchSource=(await readFile('worker/twitch.js','utf8')).replace(/^export /gm,'');
const source=(await readFile('worker/index.js','utf8')).replace("import {handleTwitch} from './twitch.js';",twitchSource);
const output=source.replace(/\/\* DROP_ASSETS_START \*\/[\s\S]*?\/\* DROP_ASSETS_END \*\//,JSON.stringify(assets));
await rm('dist',{recursive:true,force:true});await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});await writeFile('dist/server/index.js',output);await copyFile('.openai/hosting.json','dist/.openai/hosting.json');
console.log(`Built Worker with ${Object.keys(assets).length} embedded assets (${(Buffer.byteLength(output)/1024/1024).toFixed(2)} MB).`);
