import React,{useState,useEffect} from 'react';
import ImageBox from './imagebox';
import Toolbar from './toolbar';
import Commentbar from './commentbar';
import ProfileBar from './profileBar';

export default function holder(props){
    

    return(
        <div className='Holder'>
            <ProfileBar UserId={props.Post.userId}/>
            <ImageBox ImagePath={props.Post.image}/>
            <Toolbar Post={props.Post} UserId={props.UserId}/>
            <Commentbar Caption={props.Post.caption}/>
        </div>
    );
}