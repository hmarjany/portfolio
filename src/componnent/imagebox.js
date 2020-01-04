import React, { useState, useEffect } from 'react';

export default function ImageBox(props) {

    return (
        <div ratio="3/4" className='ImageBox' style={{ backgroundImage: `url(http://localhost:3001/${props.ImagePath})`, backgroundSize: 'cover' }}>

        </div>
    );
}