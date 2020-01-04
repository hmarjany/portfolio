import React from "react";
import Container from './componnent/container';
import { useAuth0 } from "./react-auth0-spa";
import NavBar from "./componnent/NavBar";
import StoryBar from "./componnent/storyBar";
export const UserContext = React.createContext({
  userId: null,
  userName: null,
  isAuthunticate: false
});

export default function App() {
  const { loading, user } = useAuth0();

  if (loading) {
    return (
    <div className='loadngHolder'>
      <div className="loader">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="200px" height="200px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" space="preserve">
          <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
            s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
            c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
          <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
            C22.32,8.481,24.301,9.057,26.013,10.047z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.5s"
              repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    </div>);
  }

  return (
    <div>
      <UserContext.Provider value={{
        userId: user != null ? user.email : null,
        userName: user != null ? user.given_name : null,
        isAuthunticate: user != null ? true : false
      }}>
        <NavBar UserId={user != null? user.email : null} />
        <StoryBar/>
        <Container UserId={user != null? user.email : null}/>
      </UserContext.Provider>
    </div >
  );
}
