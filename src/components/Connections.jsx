import React from 'react'
import { BASE_URL } from '../utils/constants';
import {useEffect} from "react";
import axios from 'axios';
import {useDispatch} from "react-redux"
import { addConnections } from '../utils/connectionSlice';
import { useSelector } from 'react-redux';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections" , {
                withCredentials : true
        });
        dispatch(addConnections(res.data.data));
    }catch(err) {

     };
    }

    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length === 0) return <h1>No Connections Found</h1>
  return (
   <div className="text-center my-10"> 
    <h1 className="text-bold text-white text-3xl">Connections</h1>

        {connections.map((connection) => {
            const { _id , firstName , lastName , photoUrl , age , gender , about} = connection;


            return (
            <div key={_id} className=" flex m-4 p-4 border rounded-lg bg-base-300  w-1/2 mx-auto">
                <div>
                <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
                </div>
                <div className="text-left , mx-10">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                <h2>{"Age :" + age}</h2>
                <p>{"Gender : " + gender}</p>
                <p>{"About : " + about}</p>
                </div>
                
                
            </div>
            );
        })}
    </div>
  );
};

export default Connections;