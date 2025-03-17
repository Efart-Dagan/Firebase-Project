import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCollectionStream = (db, colName) => {
  const [docs, setDocs] = useState([]);


  useEffect(() => {
    try {
      let ref = collection(db, colName)
      // will work every change in the cols
      const unSub = onSnapshot(ref, (snapshot) => {
        let fire_ar = [];
        snapshot.docs.forEach(item => {
          fire_ar.push({ id: item.id, ...item.data() })
          // console.log(item.id, item.data());
        })
        console.log(fire_ar);
        setDocs(fire_ar);
      })
      return () => unSub();
    }
    catch(err){
      console.log(err);
    }
  }, [colName])


  return { docs };
}

