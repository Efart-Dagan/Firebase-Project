
// created by https://2monkeys.co.il - Teaches you to be a professional in fullstack!
import React from 'react'

export default function SelectPro({ar,cssClass,label,selected,ref}) {
  if(!cssClass){
    cssClass = "select-control"
  }
  console.log("type",typeof ar[0]);
  if(typeof ar[0] == "string"){
    ar = ar.map(val => {
      return {name:val,val}
    })
  }

  return (
    <div>
      <label>{label}</label>
      <select ref={ref} className={cssClass}>
        {ar.map((item,i) => {
          return (
            <option value={item.val}>{item.name}</option>
          )
        })}
      </select>
    </div>
  )
}


// created by https://2monkeys.co.il - Teaches you to be a professional in fullstack!