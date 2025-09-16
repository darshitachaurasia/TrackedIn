import axios from "axios";

const API_URL = "http://localhost:5000/api/checkin";

export async function getStreak(getToken) {
  const token = await getToken();
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function doCheckin(getToken) {
  const token = await getToken();
  const res = await axios.post(API_URL, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
