import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/Logo.svg";

	function Header({ headerEmail, onSignOut }) {
    return (
      <header className="header">
        <img src={logo} alt="Логотип" className="logo" />

        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{headerEmail}</p>
            <Link to="/sign-in" className="header__out" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>

        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__sign">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__sign">
            Войти
          </Link>
        </Route>
      </header>
    );
  }
  
	export default Header;