import React ,{ useState, useEffect }from "react";
import styled from "styled-components";
import Logout from '../components/Logout';
export default function Contacts({contacts,currentUser,changeChat}){
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelected,setCurrentSelected]  = useState(undefined);
    
    useEffect(() => {
        
        if(currentUser){
            setCurrentUserName(currentUser.username);
            
        }
    },[currentUser]);
    const changeCurrentChat = (index,contact) =>{
        setCurrentSelected(index);
        changeChat(contact);
    };
    return( 
    <>
        {currentUserName && (
            <Container>
                <div className="brand">
                    <h3>One Place</h3>
                </div>
                <div className="contacts">
                    {contacts.map((contact,index) => {
                        return(
                            <div className={`contact ${
                                index === currentSelected ? "selected" : "" 
                            }`}
                            key = {index} 
                            onClick={()=>changeCurrentChat(index,contact)}
                            >
                                
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="current-user">
                <div className="username">
                                    <h2>{currentUserName}</h2>
                                </div>
                    <Logout/>
                </div>
                </Container>
        
        )}
    </>);
} 
const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #ffbf00;
border: 0.1rem solid #bf9b30;
border-radius: 0.4rem;
.brand{
    display: flex;
    align-items: center;
    justify-content:center;
    gap:1rem;
    img{
        height:2rem;
    }
    h3{
        color: white;
        text-transform:uppercase;
    }
}
    .contacts{
        display: flex;
        flex-direction:column;
        align-items:center;
        overflow: auto;
        gap: 0.8rem;
        .contact{
            background-color: #ffffff34;
            min-height:5rem;
            width:90%;
            cursor:pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
            .username{
                h3{
                    color: white;
                }
            }

        }
        .selected{
            backgrond-color: #9186f3;

        }
    }
    .current-user{
        background-color: #ffbf00;
        display:flex;
        justify-content:center;
        align-items: center;
        gap: 2rem;
        .username{
    
            h2{
                color:white;
            }
        }
        @media screen and (min-width:720px) and (max-width:1080px){
            gap:0.5rem;
            .username{
                h2{
                    font-size: 1rem; 
                }
            }
        }
    }
}
`;