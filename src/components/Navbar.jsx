import React, { useCallback, useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

import { naviMenus } from '../utils/data';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { name } = user || {};
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuthentication, setIsAuthentication] = useState(false);

  const handleLoginSucess = useCallback(
    (response) => {
      const decoded = jwtDecode(response.credential);
      dispatch(login({ authData: decoded }));
      setIsAuthentication(true);
    },
    [dispatch]
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));

    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuthentication(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (window.google) {
      //구글 아이디가 가져와졌을때
      window.google.accounts.id.initialize({
        //구글 값 초기화
        client_id: googleClientId,
        callback: handleLoginSucess,
      });
    }
  }, [googleClientId, handleLoginSucess]);

  const handleLoginClick = () => {
    window.google.accounts.id.prompt(); //로그인 팝업 띄우기
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsAuthentication(false);
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between  ">
      <div className="logo-wrapper flex w-full items-center justify-center gap-8 ">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to="/" className="font-customFontEn">
            GEON
          </Link>
        </h2>
      </div>
      <ul className="menus">
        {naviMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`${
              idx === menuIdx ? 'bg-gray-950 border border-gray-700' : ''
            } border border-gray-700 hover:bg-gray-950 transition-all duration-300 rounded-sm mb-1 `}
          >
            <Link
              to={menu.to}
              className="flex gap-x-4 items-center py-2 px-10   "
            >
              {menu.icon} {menu.label}{' '}
            </Link>
          </li>
        ))}
      </ul>
      {isAuthentication ? (
        <button
          onClick={handleLogoutClick}
          className="font-customFontKr flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 w-full rounded-md"
        >
          <FcGoogle className="h-5 w-5" />
          <span className="text-sm">{name}님 Logout</span>
        </button>
      ) : (
        <div className="">
          <button
            onClick={handleLoginClick}
            className="font-customFontKr flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 w-full rounded-md"
          >
            <FcGoogle className="h-5 w-5" />
            Login With Google
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
