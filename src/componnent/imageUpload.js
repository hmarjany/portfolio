import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { AiOutlineFolderOpen } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { IconContext } from 'react-icons';
import config from "./../auth_config.json";

export default function ImageUpload(props) {
    const [fileInput, setFileInput] = useState(React.createRef());
    const [fileUrl, setFileUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [fileProgress, setFileProgress] = useState(null);
    const [caption, setCaption] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setCaption(props.Caption);
    })

    function inputFileChange(e) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            setFileUrl(event.target.result);
        };
        fileReader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);

    }

    async function fileUpload(event) {
        event.preventDefault();
        if(file===null){
            alert('Select an image first!');
            return;
        }
        
        if(caption===null){
           setCaption('No caption!');
        }

        alert(caption);
        const data = new FormData();
        data.append('file', file, file.name);
        axios.post(`${config.server}/post/uploadImage`, data, {
            params: {
                caption,
                userId
            },
            onUploadProgress: (ProgressEvent) => {
                setFileProgress(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100);
            }
        })
            .then((res) => {
                console.log(res.statusText);

            });
    }

    return (
        <div>
            <UserContext.Consumer>
                {value => (
                    setUserId(value.userId)
                )}
            </UserContext.Consumer>
            <div ratio="3/4" className='ImageBox ImageBoxProfile ImagePost' style={{ backgroundImage: `url(${fileUrl})`, backgroundSize: 'cover' }}></div>
            <input type='file' onChange={(e) => inputFileChange(e)} style={{ display: 'none' }} ref={fileInput} />
            <IconContext.Provider value={{ color: "#607D8B", size: '2.5em' }}>
                <AiOutlineFolderOpen onClick={() => fileInput.current.click()}></AiOutlineFolderOpen>
            </IconContext.Provider>

            <IconContext.Provider value={{ color: "#607D8B", size: '2.5em' }}>
                <FiSend onClick={(event) => fileUpload(event)}></FiSend>
            </IconContext.Provider>
            <div>{fileProgress}</div>
        </div>
    );
}