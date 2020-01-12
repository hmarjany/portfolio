import React, { useState, useEffect } from 'react';
import config from "./../auth_config.json";
import axios from 'axios';

export default function ImageBox(props) {

    const[url,setUrl]=useState('');
    useEffect(() => {
        getImage();
    },[url])

    var getImage = async ()=>{
        axios.get(`${config.server}/${props.ImagePath}`,
            { responseType: 'arraybuffer',headers: { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}})
            .then((res) => {
                var url = '"data:image/jpg;base64,'+Buffer.from(res.data, 'binary').toString('base64')+'"';
                setUrl(url);
            });
    }
    return (
        
        <div ratio="3/4" className='ImageBox' style={{ backgroundImage:'url('+url+')', backgroundSize: 'cover' }}>

        </div>
    );
}