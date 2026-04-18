"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Signup(){

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");

  const router = useRouter();

  async function signup(){

    await fetch("/api/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:name,
        password:password
      })
    });

    alert("Signup success");
    router.push("/");
  }

  return(
    <div className="signupPage">
  <div className="signupBox">
    <h2>Signup</h2>

    <label htmlFor="">Enter Your name</label>
    <input
      placeholder="Username"
      onChange={(e) => setName(e.target.value)}
    />
    <br />

    <label htmlFor="">Enter Your Password</label>
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <br />

    <button onClick={signup}>Signup</button>
  </div>
</div>
  );

}