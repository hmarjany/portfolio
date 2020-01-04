import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { UserContext } from "../App";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function NavBar(props) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    var getUserAndUpdateUser = async () => {
      if (isAuthenticated) {
        await axios.get(`http://localhost:3001/user/getAndUpdateUser/`, {
          params: {
            userId: props.UserId
          }
        })
      }
    }

    getUserAndUpdateUser();
  }, [props.UserId])

  return (
    <div className='NavBar'>
      {!isAuthenticated && (
        <IconContext.Provider value={{ color: "#607D8B", size: '1.5em' }}>
          <div  onClick={() => loginWithRedirect({})}  style={{fontSize:'0.8em',display:'flex',cursor:'pointer'}}>
            <FaSignInAlt/>&nbsp;Login
          </div>
        </IconContext.Provider>
      )}
      {
        isAuthenticated &&
        <IconContext.Provider value={{ color: "#607D8B", size: '1.5em' }}>
          <div  onClick={() => logout()} style={{fontSize:'0.8em',display:'flex',cursor:'pointer'}}>
            <FaSignOutAlt/><div>&nbsp;Logout</div>
          </div>
        </IconContext.Provider>
      }
      <UserContext.Consumer>
        {value => (
          <div style={{display:'flex',fontSize:'0.9em',fontWeight:'bold'}}>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;Welcome&nbsp;</div>
            <div>{value.userName}</div>
            <div>{value.userId}</div>
            <div>!</div>
          </div>
        )}
      </UserContext.Consumer>
    </div>
  );
};
