import React, { useState, useEffect } from 'react';
import Holder from './holder';
import axios from 'axios';
import { PromiseProvider } from 'mongoose';

export default function ScrollContainer(props) {

    const [posts, setPosts] = useState(null);
    useEffect(() => {
        var loadPosts = async () => {
            let result = await axios.get('http://localhost:3001/post/getPosts');
            let data = await result.data;
            setPosts(data.map((post, index) =>
                <Holder Post={post} UserId={props.UserId} key={index} />
            ));
            console.log(data);
        }

        loadPosts();
    }, [])

    useEffect(()=>{

    },[])
    
    return (
        <div className='ScrollContainer'>
            {posts}
        </div>
    );
}