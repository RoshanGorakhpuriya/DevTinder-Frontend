import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect} from "react";
import { useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const  reviewRequest = async (status , _id) =>{
    try{
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id ,
        {},
        {
          withCredentials : true
        }
      );
      dispatch(removeRequest(_id));
    }catch(err){}
  };

  const fetchRequests = async ()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/requests/received" , {
        withCredentials : true,
      });

      dispatch(addRequests(res.data.data));
    }catch(err){

    };
  }

  useEffect(() => {
    fetchRequests();
  } , [])
  if(!requests) return;

    if(requests.length === 0) return <h1 className="text-center my-10 ">No Requests Found</h1>
  return (
   <div className="text-center my-10"> 
    <h1 className="text-bold text-white text-3xl">Requests</h1>

        {requests.map((request) => {
          if(!request.fromUserId) return null;
            const { _id , firstName , lastName , photoUrl , age , gender , about} = request.fromUserId;


            return (
            <div key={_id} className=" flex justify-between items-center m-4 p-4 border rounded-lg bg-base-300  w-1/2 mx-auto">
                <div>
                <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
                </div>
                <div className="text-left , mx-10">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                <h2>{"Age :" + age}</h2>
                <p>{"Gender : " + gender}</p>
                <p>{"About : " + about}</p>
                </div>
                <div>
                <button className="btn btn-primary mx-2 "
                onClick={() => reviewRequest("rejected" , request._id)}
                >Reject</button>
                <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted" , request._id)}>Accept</button>
                </div>
                
            </div>
            );
        })}
    </div>
  );
}

export default Requests