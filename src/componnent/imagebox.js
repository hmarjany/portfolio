import React, { useState, useEffect } from 'react';
import config from "./../auth_config.json";

export default function ImageBox(props) {

    return (
        <div ratio="3/4" className='ImageBox' style={{ backgroundImage: `url(http://marjani.eu-4.evennode.com/${props.ImagePath})`, backgroundSize: 'cover' }}>

        </div>
    );
}