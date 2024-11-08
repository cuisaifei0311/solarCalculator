import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Dropdown, Input, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo from '../assets/logo.svg';

const { Search } = Input;

const Header = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="header-container flex justify-between items-center p-4 text-white" style={{ background: 'linear-gradient(90deg, #4E5861, #3A4851)' }}>
      <div className="app-name text-2xl font-bold">
        <Link to="/" className="text-white">SunWise</Link>
      </div>
    </div>
  );
};

export default Header;