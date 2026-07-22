import React from "react";
import axios from "axios";

export default function App(){
  const getproduct = async () =>{
    try{
      const res = await axios.post("http://localhost:5000/product/signin",{email:"dp7878033@gmail.com",password:"Darshan@2110"},{withCredentials:true});
      console.log(res.data);
    }catch(err){
      console.log(err)
    }
  };
  return(
    <div>
      <button onClick={getproduct}>Get Product</button>
    </div>
  )
}