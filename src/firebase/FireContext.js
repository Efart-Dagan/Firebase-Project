
// created by https://2monkeys.co.il - Teaches you to be a professional in fullstack!

import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc,query,writeBatch } from 'firebase/firestore'


export const FireContext = createContext({
  updateFire:1,
  loadFire:true,
  uploadJsonToFireStore:async(jsons_ar) =>{},
  deleteAllCollection:async(colName) => {},

  setUpdateFire:(dateNow) => {},
  getData:async(colName) => {},
  getDataQuery:async(colName,query_ar) => {},
  
  addData:async(colName,newItem) => {},
  removeData:async(colName,id) => {},
  editData:async(colName,id,editItem) => {},
  
});

export default function FireProvider({ dbConnect, children }) {

  const [updateFire, setUpdateFire] = useState(1)
  const [loadFire, setLoadFire] = useState(false);

  const getDataQuery = async (colName, _query_ar = []) => {
    setLoadFire(true);
    let ref = collection(dbConnect, colName);
    const q = query(ref,..._query_ar)
    const snapshot = await getDocs(q)
    const fire_ar = [];
    snapshot.docs.forEach(item => {
      fire_ar.push({ id: item.id, ...item.data() })
      // console.log(item.id, item.data());
    })
    console.log(fire_ar);
    setLoadFire(false);
    return fire_ar;
    // setAr(fire_ar);
  }



  const getData = async (colName) => {
    setLoadFire(true);
    let ref = collection(dbConnect, colName);
    const snapshot = await getDocs(ref)
    const fire_ar = [];
    snapshot.docs.forEach(item => {
      fire_ar.push({ ...item.data() , id: item.id  })
      // console.log(item.id, item.data());
    })
    // console.log(fire_ar);
    setLoadFire(false);
    return fire_ar;
    // setAr(fire_ar);
  }

  const addData = async (colName, newItem) => {
    setLoadFire(true);
    const ref = collection(dbConnect, colName)
    const data = await addDoc(ref, { ...newItem, time_id: Date.now() })
    setUpdateFire(Date.now());
    setLoadFire(false);
    return data.id;

  }

  const removeData = async (colName, id) => {
    setLoadFire(true);
    const ref = doc(dbConnect, colName, id);
    await deleteDoc(ref)
    setUpdateFire(Date.now());
    setLoadFire(false);
    return "deleted"
  }

  const editData = async (colName, id, updateItem) => {
    setLoadFire(true);
    const ref = doc(dbConnect, colName, id);
    await updateDoc(ref, updateItem)
    setUpdateFire(Date.now());
    setLoadFire(false);
    return "updated"
  }


  const uploadJsonToFireStore = async(colName,jsons_ar) => {
    const ref = collection(dbConnect,colName)
    const batch = writeBatch(dbConnect)
    jsons_ar.forEach((item) => {
      if(item._id){
        if(item._id.$oid){
          item._id = item._id.$oid;
        }
      }
      batch.set(doc(ref,generateRandomString(20)),item)
    })
    try{
      const data = await batch.commit();
      console.log(data);
      return {msg:"json upload"}
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteAllCollection = async(colName) => {
    const data_ar = await getData(colName);
    const batch = writeBatch(dbConnect)
    data_ar.forEach((item => {
      console.log(item);
      const docRef = doc(dbConnect,colName,item.id);
      batch.delete(docRef)
    }))
    const data = await batch.commit();
    return {msg:"collection deleted: "+colName}
  }

  const globalVal = {
    updateFire, setUpdateFire, loadFire,
    getData,getDataQuery, addData, removeData, editData,uploadJsonToFireStore,deleteAllCollection
  }



  return (
    <FireContext.Provider value={globalVal}>
      {children}
    </FireContext.Provider>
  )


}


export const useFireContext = () => {
  return useContext(FireContext)
}



function generateRandomString(length = 20) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}



// created by https://2monkeys.co.il - Teaches you to be a professional in fullstack!