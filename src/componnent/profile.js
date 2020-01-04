import React, { useState, useEffect } from 'react';
import ImageUpload from './imageUpload';
import axios from 'axios';
import { UserContext } from '../App';

export default function Profile(props) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        console.log(props.UserId);
        try {
            axios.get(`http://localhost:3001/post/getList`, {
                params: {
                    email: props.UserId
                }
            }).then((result) => {

                if (result.data.length > 0) {
                    var renderPosts = (<div className='gallery'>
                        <ul style={{ listStyleType: 'none', overflow: 'hidden' }}>
                            {result.data.map((post, index) => <li style={{ margin: '10px', float: 'left' }} key={index}>
                                <div ratio="3/4" className='ImageBox ImageBoxProfile' style={{ backgroundImage: `url(http://localhost:3001/${post.image})`, backgroundSize: 'cover' }}>
                                </div>
                                <div>{post.caption}</div>
                            </li>
                            )}
                        </ul>
                    </div>);
                    setPosts(renderPosts);
                }
            })
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log(error);
            } else {
                throw error;
            }
        }
    }, [props.UserId])

    const [caption, setCaption] = useState(null);
    return (
        <div className='Profile'>
            <div className='ProfileRibbon'></div>
            <div style={{ margin: '0 auto', width: '80%' }}>
                <fieldset>
                    <legend>Personal info:</legend>
                    <input type='text' placeholder='First Name' />
                    <input type='text' placeholder='Last Name' />
                    <input type='text' placeholder='Change Password' />
                    <button>Save</button>
                </fieldset>
                <br />
                <fieldset>
                    <legend>New Post:</legend>
                    <div>
                        <ImageUpload Caption={caption}></ImageUpload>
                    </div>

                    <input type='text' onChange={(e) => setCaption(e.target.value)} placeholder='Caption' />
                </fieldset>
                <br/>
                <fieldset>
                    <legend>Posts:</legend>
                    {posts}
                </fieldset>
                <br/>
            </div>
        </div>
    );

}