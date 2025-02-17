import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsPremium(true);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { amount, keyId, currency, orderId } = order.data;

    var options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other Developers",
      order_id: orderId,
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9000090000",
      },
      theme: {
        color: "#3399cc",
      },
      handler: async function () {
        // ✅ Fake verify API call kar lo taaki test mode me bhi premium active ho
        await axios.post(
          BASE_URL + "/payment/verify",
          { orderId, membershipType: type },
          { withCredentials: true }
        );

        setIsPremium(true); // ✅ UI update
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isPremium ? (
    "You are already a premium user"
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - ✅Chat with Connections</li>
            <li> - ✅100 connection Requests per day</li>
            <li> - ✅Verified User on devTinder</li>
            <li> - ✅Blue Tick</li>
            <li> - ✅Validity upto 84 days</li>
          </ul>
          <button className="btn btn-success" onClick={() => handleBuyClick("silver")}>
            Buy Silver
          </button>
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
          <button className="btn btn-success" onClick={() => handleBuyClick("gold")}>
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
