import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IconContext } from 'react-icons';

export default function Like(props) {

    const [isLike, setIsLike] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/post/getLikes', {
            params: {
                postId: props.Post._id,
                userId: props.UserId
            }
        }).then(async (result) => {
            await setIsLike(result.data.like);
            await setCount(result.data.count);
        });
    }, [])

    async function setLike() {
        if (isLike) {
            await setIsLike(false);
        }
        else {
            await setIsLike(true);
        }
        console.log(isLike)
        await axios.post('http://localhost:3001/post/like', null, {
            params: {
                postId: props.Post._id,
                userId: props.UserId,
                like: isLike
            }
        }).
            then(() => {
                isLike ? setCount(count - 1) : setCount(count + 1);
            })
    }
    return (
        <div style={{display:'flex'}}>
            <div onClick={() => setLike()}>
                {
                    isLike ?
                        <div>
                            <IconContext.Provider value={{ color: "red", size: '1.5em' }}>
                                <AiFillHeart />
                            </IconContext.Provider>
                        </div >
                        :
                        <div>
                            <IconContext.Provider value={{ color: "#607D8B", size: '1.5em' }}>
                                <AiOutlineHeart />
                            </IconContext.Provider>
                        </div>
                }
            </div>
            <div style={{marginLeft:'6px',fontSize:'0.8em',margin:'3px'}}>
                Like(s) : {count}
            </div>
        </div>
    );
}