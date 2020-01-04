import React, { useState, useEffect } from 'react';
import ScrollContainer from './scrollContainer';
import './../App.css';
import NavigationBar from './navigationBar';
import Profile from './profile';
import { UserContext } from '../App';
import { PromiseProvider } from 'mongoose';

export default function Container(props) {

    const [renderPart, setRenderPart] = useState(<ScrollContainer UserId={props.UserId}/>);
    const [home, setHome] = useState(true);
    const [userId, setUserId] = useState(null);

    var onHomeHandler = () => {
        setRenderPart(<ScrollContainer UserId={props.UserId}/>);
        setHome(true);
    }

    var onProfileHandler = () => {
        setRenderPart(<Profile UserId={userId} />);
        setHome(false);
    }

    return (
        <div className='Container'>
            {renderPart}
            <UserContext.Consumer>
                {value => (
                    <div>
                    {setUserId(value.userId)}
                    <NavigationBar onHomeClick={onHomeHandler}
                            onProfileClcik={onProfileHandler} Home={home} />
                    </div>
                )}
            </UserContext.Consumer>
        </div>
    );
}

