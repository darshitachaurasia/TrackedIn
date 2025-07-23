import { useUser } from "@clerk/clerk-react";
import axios from "axios";

function Dash() {
  const { user } = useUser();

  const handleCheckin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/checkin', {}, {
        withCredentials: true
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h1>Welcome, {user.fullName}</h1>
      <button onClick={handleCheckin}>Check In</button>
    </div>
  );
}

export default Dash;
