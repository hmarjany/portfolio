import React, { useState, useEffect } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaCommentMedical } from 'react-icons/fa';
import { IconContext } from "react-icons";

export default function Comment(props) {
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [comments, setComments] = useState(null);
    const [sendComment, setSendComment] = useState(true);


    useEffect(() => {
        getComments();
    }, [sendComment])

    const showCommentHandler = async () => {
        if (!showComment) {
            await setShowComment(true);
        }
    }

    const commentTextHandler = (e) => {
        setComment(e.target.value)
    }

    const getComments = () => {
        let postId = props.Post._id;
        axios.get('http://localhost:3001/post/getComments', {
            params: {
                postId: postId
            }
        }).then((result) => {
            setComments(result.data.comments);
        }).catch((err) => {
            console.log(err);
        })
    }

    const postComment = async () => {
        
        let postId = props.Post._id;
        axios.post('http://localhost:3001/post/sendComment', null, {
            params: {
                userId: userId,
                comment: comment,
                postId: postId,
                userName: userName
            }
        })
            .then(() => {
                setComment('');

            }

            ).catch((err) => {
                console.log(err);
                setComment('');
            })

        if (sendComment) {
            await setSendComment(false);
        } else {
            await setSendComment(true);
        }
    }

    if (showComment) {
        return (
            <div className='Comments'>
                <IconContext.Provider value={{ color: "#607D8B", size: '1.5em' }}>
                    <div className='Close' onClick={() => setShowComment(false)}>
                        <AiFillCloseCircle />
                    </div>
                </IconContext.Provider>
                <UserContext.Consumer>
                    {value => (
                        <div className='CommentInput'>
                            {setUserId(value.userId)}
                            {setUserName(value.userName === undefined ? 'Unknown' : value.userName)}
                            {value.isAuthunticate ?
                                <div style={{display:'flex',padding:'3vh'}}>
                                    <input type='text' placeholder='Write a comment ...' onChange={(e) => commentTextHandler(e)} value={comment} />
                                    <div style={{margin:'5px',cursor: 'pointer'}}>
                                        <IconContext.Provider value={{ color: "#607D8B", size: '3em' }}>
                                            <FaCommentMedical onClick={() => postComment()} />
                                        </IconContext.Provider>
                                    </div>
                                </div>
                                : null}
                        </div>
                    )}
                </UserContext.Consumer>

                {comments == null ? null : comments.map((comment, index) =>
                    <div style={{ display: 'flex', padding: '2px' }} key={index}>
                        <div >
                            <IconContext.Provider value={{ color: "#607D8B", size: '2em' }}>
                                <FaUserCircle />
                            </IconContext.Provider>
                        </div>
                        <div style={{ margin: '5px', fontSize: '0.8em', fontWeight: 'bold' }}>{userName} :&nbsp;</div>
                        <div style={{ margin: '5px', fontSize: '0.8em' }} >{comment.comment}</div>
                    </div>
                )}

            </div>
        );
    } else {
        return (
            <IconContext.Provider value={{ color: "#607D8B", size: '1.3em' }}>
                <div style={{ margin: '3px' }} onClick={() => showCommentHandler()}>
                    <FaRegCommentAlt />
                </div>
            </IconContext.Provider>
        );
    }
}
