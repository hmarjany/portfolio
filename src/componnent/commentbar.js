import React,{useState,useEffect} from 'react';

export default function commentbar(props){

    return(
        <div className='CommentBar'>
            {props.Caption}
        </div>
    );
}