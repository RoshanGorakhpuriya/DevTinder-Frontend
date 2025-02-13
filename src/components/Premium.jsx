import React from 'react'

const Premium = () => {
  return (
    <div className="m-10">
    <div 
    className="flex w-full">
  <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
    <h1 className="font-bold text-3xl">Silver Membership</h1>
    <ul>
        <li> - ✅Chat with Connections</li>
        <li> - ✅100 connection Requests per day</li>
        <li> - ✅Verified User on devTinder</li>
        <li> - ✅Blue Tick</li>
        <li> - ✅Validity upto 84 days</li>
    </ul>
    <button className="btn btn-success">Buy Silver</button>
    </div>
    <div className="divider divider-horizontal"></div>
  <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
    <h1 className="font-bold text-3xl">Gold Membership</h1>
    <ul>
        <li> - ✅Chat with Connections</li>
        <li> - ✅Infinite connection Requests per day</li>
        <li> - ✅Verified User on devTinder</li>
        <li> - ✅Blue Tick</li>
        <li> - ✅Validity upto 365 days</li>
    </ul>
    <button className="btn btn-success">Buy Gold</button>
    </div>
</div>
</div>
  )
}

export default Premium