import React, { useState, useEffect } from 'react';
import config from "./../auth_config.json";

export default function ImageBox(props) {

    var url = $http.get(`${config.server}/${props.ImagePath}`, {
        headers: {'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}
    });

    return (
        <div ratio="3/4" className='ImageBox' style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}>

        </div>
    );
}