import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import{addDoc, collection, getDocs, query, onSnapshot, orderBy, snapshotEqual } from "firebase/firestore"
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    console.log(userObj)
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
 

    useEffect(()=>{
        const q = query(collection(dbService,"nweets"),orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const nweetArr = snapshot.docs.map((document)=>({
                id: document.id,
                ...document.data(),
            }));
            setNweets(nweetArr);
        })
    }, []);
    
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService, "nweets"),{
                text:nweet,
                createdAt:Date.now(),
                createId:userObj.uid,
            });
            
        } catch (error){
            console.error("Error adding document:", error);
        }
        setNweet("");
    };

    const onChange = ( {target: {value}} ) => {
      
        setNweet(value)
    };

    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={nweet} type="text" placeholder="What's your mind?" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet)=>( 
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};

export default Home;