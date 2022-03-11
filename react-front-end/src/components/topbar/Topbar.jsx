import React, { useContext } from 'react'
import './topbar.css'
import {Person, Chat, Notifications } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import Searchbar from '../searchbar/Searchbar';


export default function Topbar() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
          <Link to='/' style={{textDecoration: "none"}}> 
            <span className="logo">FreedomNET</span>
          </Link>
        </div>

        <div className="topbarCenter">
         <Searchbar />
        </div>

        <div className="topbarRight">
          <div className="topbarLinks">
          <Link to='/' style={{textDecoration: 'none', color: 'white'}}> 
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to='/' style={{textDecoration: 'none', color: 'white'}}> 
            <span className="topbarLink">Timeline</span>
          </Link>          
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
               <Person />
               <span className="topbarIconBadge">1</span>
            </div>
            <Link to='/messenger' style={{textDecoration: 'none', color: 'white'}}>
            <div className="topbarIconItem">
               <Chat />
               <span className="topbarIconBadge">1</span>
            </div>
            </Link>
            <div className="topbarIconItem">
               <Notifications />
               <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
          <img src={ user.profilePicture ? user.profilePicture : PF+'person/noAvatar.png'} alt='' className='topbarImg'/> 
          </Link>
        </div>
        
    </div>
  )
}
