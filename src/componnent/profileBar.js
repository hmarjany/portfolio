import React, { useState, useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function ProfileBar(props) {

    return (
        <div className='ProfileBar' >
            <div style={{ display: 'flex' }}>
                <IconContext.Provider value={{ color: "#607D8B", size: '2em' }}>
                    <FaRegUserCircle></FaRegUserCircle>
                </IconContext.Provider>
                <div className='ProfileName'>{props.UserId}
                </div>
            </div>
        </div>
    );
}