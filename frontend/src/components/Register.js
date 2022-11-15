import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

 function Register({ handleRegister }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   useEffect(() => {
     resetForm();
   }, []);

   function handleChange(evt) {
     if (evt.target.name === "Email") {
       setEmail(evt.target.value);
     } else if (evt.target.name === "Password") {
       setPassword(evt.target.value);
     }
   }

   function resetForm() {
     setEmail("");
     setPassword("");
   }

   function handleSubmit(evt) {
     evt.preventDefault();
     handleRegister(email, password);
   }

   return (
     <section className="sign">
       <h2 className="sign__title">Регистрация</h2>
       <form
         className="sign__form"
         action="#"
         name="sign-form"
         onSubmit={handleSubmit}
       >
         <input
           className="sign__input"
           placeholder="Email"
           name="Email"
           type="email"
           value={email}
           onChange={handleChange}
         ></input>
         <input
           className="sign__input"
           placeholder="Пароль"
           name="Password"
           type="password"
           value={password}
           onChange={handleChange}
         ></input>
         <button className="sign__button" type="submit">
           Зарегистрироваться
         </button>
       </form>
       <p className="sign__text">
         Уже зарегистрированы?{" "}
         <Link to="/sign-in" className="sign__link">
           Войти
         </Link>
       </p>
     </section>
   );
 }
  
export default Register;