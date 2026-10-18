const STORES=['media','drafts','references','plans','settings','workflows'];
let connection;
export function openDB(){if(connection)return connection;connection=new Promise((resolve,reject)=>{const req=indexedDB.open('drop-workspace',1);req.onupgradeneeded=()=>{for(const name of STORES)req.result.createObjectStore(name,{keyPath:'id'});};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});return connection;}
async function run(store,mode,action){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);const req=action(tx.objectStore(store));let result;req.onsuccess=()=>{result=req.result;};tx.oncomplete=()=>resolve(result);tx.onabort=()=>reject(tx.error||new Error('Could not save. Your device may be out of storage.'));tx.onerror=()=>reject(tx.error);});}
export const all=store=>run(store,'readonly',s=>s.getAll());
export const get=(store,id)=>run(store,'readonly',s=>s.get(id));
export const put=(store,value)=>run(store,'readwrite',s=>s.put(value));
export const remove=(store,id)=>run(store,'readwrite',s=>s.delete(id));
export async function snapshot(){const data={version:1,exportedAt:new Date().toISOString(),mediaIncluded:false};for(const s of STORES.filter(s=>s!=='media'))data[s]=await all(s);return data;}
