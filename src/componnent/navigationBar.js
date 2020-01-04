import React, { useState, useEffect } from 'react';
import { UserContext } from '../App';
import { AiFillHome } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineProfile } from "react-icons/ai";
import { AiTwotoneProfile } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function NavigationBar(props) {

    return (
        <div className='NavigationBar'>
            <IconContext.Provider value={{ color: "#607D8B", size: '1.5em' }}>
                <div onClick={props.onHomeClick} style={{ margin: 'auto' }}>
                        {props.Home ?
                            <AiFillHome /> :
                            <AiOutlineHome/>
                        }
                </div>
            </IconContext.Provider>
            <UserContext.Consumer>
                {value => (
                    value.isAuthunticate ?
                        <div onClick={props.onProfileClcik} style={{ margin: 'auto' }}>
                            <IconContext.Provider value={{ color: "#607D8B", size: '1.5em' }}>
                                {props.Home ?
                                    <AiOutlineProfile /> :
                                    <AiTwotoneProfile />
                                }
                            </IconContext.Provider>
                        </div>
                        : null
                )}
            </UserContext.Consumer>
        </div>
    );
}
