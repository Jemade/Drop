const STORES=['media','drafts','references','plans','settings','workflows'];
let connection;
let databaseName;
export function configureAccount(id){if(!id||typeof id!=='string')throw new Error('A verified account is required.');databaseName='drop-workspace:'+id;connection=null;}

export function openDB(){if(!databaseName)throw new Error('Sign in before opening your workspace.');if(connection)return connection;connection=new Promise((resolve,reject)=>{const req=indexedDB.open(databaseName,1);req.onupgradeneeded=()=>{for(const name of STORES)req.result.createObjectStore(name,{keyPath:'id'});};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});return connection;}
async function run(store,mode,action){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);const req=action(tx.objectStore(store));let result;req.onsuccess=()=>{result=req.result;};tx.oncomplete=()=>resolve(result);tx.onabort=()=>reject(tx.error||new Error('Could not save. Your device may be out of storage.'));tx.onerror=()=>reject(tx.error);});}
export const all=store=>run(store,'readonly',s=>s.getAll());
export const get=(store,id)=>run(store,'readonly',s=>s.get(id));
export const put=(store,value)=>run(store,'readwrite',s=>s.put(value));
export const remove=(store,id)=>run(store,'readwrite',s=>s.delete(id));
export async function snapshot(){const data={version:1,exportedAt:new Date().toISOString(),mediaIncluded:false};for(const s of STORES.filter(s=>s!=='media'))data[s]=await all(s);return data;}

export async function importLegacy(){
 if(!databaseName)throw new Error('Sign in first.');
 if(indexedDB.databases){const names=await indexedDB.databases();if(!names.some(d=>d.name==='drop-workspace'))throw new Error('No earlier workspace was found in this browser.');}
 const legacy=await new Promise((resolve,reject)=>{const req=indexedDB.open('drop-workspace');req.onupgradeneeded=()=>{req.transaction.abort();};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(new Error('No earlier workspace was found.'));});
 let count=0;
 try{for(const store of STORES){if(!legacy.objectStoreNames.contains(store))continue;const records=await new Promise((resolve,reject)=>{const tx=legacy.transaction(store,'readonly');const req=tx.objectStore(store).getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});for(const record of records){if(!await get(store,record.id)){await put(store,record);count++;}}}}finally{legacy.close();}
 return count;
}
export async function exportRecords(){const result={};for(const store of STORES)result[store]=await all(store);return result;}
export async function restoreRecords(records){const database=await openDB();return new Promise((resolve,reject)=>{const tx=database.transaction(STORES,'readwrite');let imported=0;for(const name of STORES){const object=tx.objectStore(name);for(const value of records[name]||[]){const read=object.get(value.id);read.onsuccess=()=>{if(!read.result){object.put(value);imported++;}};}}tx.oncomplete=()=>resolve(imported);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Restore failed. Existing records were preserved.'));});}

export function lockAccount(){const previous=connection;connection=null;databaseName=null;previous?.then(db=>db.close()).catch(()=>{});}
