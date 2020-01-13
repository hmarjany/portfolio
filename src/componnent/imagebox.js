import React, { useState, useEffect } from 'react';
import config from "./../auth_config.json";
import axios from 'axios';

export default function ImageBox(props) {

    const [url, setUrl] = useState('');
    const [percentCompelet, setPercentCompelet] = useState(0);
    useEffect(() => {
        getImage();
    }, [url])

    var RADIUS = 54;
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    
    var progress = (value)=> {
        var progress = value / 100;
        var dashoffset = CIRCUMFERENCE * (1 - progress);
        console.log('progress:', value + '%', '|', 'offset:', dashoffset)
        return dashoffset;
    }

    var getImage = async () => {
        axios.get(`${config.server}/${props.ImagePath}`,
            {
                responseType: 'arraybuffer',
                headers: { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' },
                onDownloadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setPercentCompelet(percentCompleted);
                }
            })
            .then((res) => {
                var url = '"data:image/jpg;base64,' + Buffer.from(res.data, 'binary').toString('base64') + '"';
                setUrl(url);
            });
    }
    return (

        <div ratio="3/4" className='ImageBox' style={{ backgroundImage: 'url(' + url + ')', backgroundSize: 'cover' }}>
            <div className="radialHolder" style={{display:percentCompelet>=100?'none':null}}>
                <svg className="progress" width="120" height="120" viewBox="0 0 120 120">
                    <circle className="progress__meter" cx="60" cy="60" r="54" strokeWidth="4" />
		            <circle style={{strokeDashoffset:progress(percentCompelet), strokeDasharray:CIRCUMFERENCE}} className="progress__value" cx="60" cy="60" r="54" strokeWidth="3" />
                </svg>
            </div>
        </div>
    );
}