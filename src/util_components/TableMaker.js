// created by httsp://2monkeys.co.il - Teaches you to be a professional in fullstack!

import React, { useLayoutEffect, useState } from 'react'

// dataTable - array of Json
// delHandeld - delete funtion of the item - option 
// editHandeld - edit function of the item - option
// masterId - the props that it the prime key of the item for edit and delete functions - option
// showProps - array of what props to show in table - option
// unShowProps - array of what props not to show in table option
export default function TableMaker({dataTable,delHandeld,editHandeld,masterId,unShowProps,showProps}) {

  const [indexes_ar,setIndexesAr] = useState([]);
  const [data_ar,setDataAr] = useState([]);
  if(!masterId){
    masterId = "id";
  }

  useLayoutEffect(() => {
    if(dataTable.length > 0){
      doApi();
    }
  },[dataTable])

  const doApi = async() => {
    
    let props_ar = [];
    for(let key in dataTable[0]){
      props_ar.push(key);
    }
    if(showProps){
      props_ar = showProps
    }
    props_ar.unshift("#")
    if(!unShowProps){ unShowProps = []}
    const deleteProps_ar = ["id","_id",...unShowProps]
   
    props_ar = props_ar.filter(val => !deleteProps_ar.includes(val) )
    console.log(props_ar);
    setIndexesAr(props_ar);
    setDataAr(dataTable)
  }

  return (
      <table className='table table-striped'>
        <thead>
          <tr>
            {indexes_ar.map((val,i) => {
              return (
                <td key={i}>{val}</td>
              )
            })}
            <td>del/edit</td>
          </tr>
        </thead>
        <tbody>
          {data_ar.map((item,i) => {
            return (
              
                <TableTr key={i} i={i} item={item} props_ar={indexes_ar} delHandeld={delHandeld} editHandeld={editHandeld} masterId={masterId} />
              
            )
          })}
          
        </tbody>
      </table>
  )
}




function TableTr({item,i,props_ar,delHandeld,editHandeld,masterId}){
  console.log("props",props_ar);
  return (
    <tr>
      {props_ar.map((val,index) => {
        if(val == "#"){item[val] = i+1}
        return (
          <td key={index}>{item[val]}</td>
        )
      })}
      <td>
        {delHandeld &&
        <button onClick={() => {delHandeld(item[masterId]) }} className='bg-danger'>Del</button> }
        {editHandeld && 
        <button onClick={() => {editHandeld(item[masterId],item) }} className='bg-warning'>Edit</button> }
      </td>
    </tr>
  )
}


// created by https://2monkeys.co.il - Teaches you to be a professional in fullstack!

// TODO
/*
1. give as props array
2. option to choose what columns to show from props
3. funciton of delete and edit the get id params
4. option to add del/edit buttons
5. max 7 props in the props_ar
6. 

*/