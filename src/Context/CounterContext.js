// import { createContext, useState } from "react";

import axios from "axios";
import { createContext, useState } from "react";






// export let CounterContext = createContext();

// export default function CounterContextProvider(props) {

//   const [count, setCount] = useState(0)
//   function changeCount() {
//     setCount(Math.random());
//   }
//   return <CounterContext.Provider value={{count , changeCount}}>
//     {props.children}
//   </CounterContext.Provider>
// }


export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  
  const [count, setCount] = useState(0);

  

  return <CounterContext.Provider value={{count}}>
    {props.children}
  </CounterContext.Provider>
}





