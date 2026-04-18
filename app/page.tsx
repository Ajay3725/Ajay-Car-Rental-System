"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./globalss.css"

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    const res = await fetch("/api/login");
    const data = await res.json();

    const user = data.user.find(
      (u: any) =>
        u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/cars");
      }
    } else {
      alert("Invalid login");
    }
  }

  function guest() {
    localStorage.setItem("role", "guest");
    router.push("/cars");
  }

  return (
    <div className="loginpage">

  <div className="section">
    <p>Welcome To Car Rental</p>
    <h1 className="heading">Save up to 70% on car rentals</h1>
    <p>Clear prices, no surprises</p>
    <p>✔️ Trusted by 7M travelers || ✔️ 24/7 Support || ✔️ Free Cancellation</p>
  </div>

  <div className="login">
    <div className="login2">

      <h2>Login</h2>

        <label>Enter Your Name:   </label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Enter Password:           </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

      <button onClick={login}>Login</button>
      <button onClick={guest}>Guest</button>

      <p>New user? <a href="/signup">Signup</a></p>

    </div>
  </div>

</div>
  );
}