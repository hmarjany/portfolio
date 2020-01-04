import React,{useState,useEffect} from 'react';
import Like from './like';
import Comment from './comment';

export default function toolbar(props){

    

    return(
        <div className='Toolbar'>
            <Like Post={props.Post} UserId={props.UserId}/>
            <Comment Post={props.Post}/>
        </div>
    );
}