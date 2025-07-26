import axios from 'axios';

async function approveUser(signUpId) {
  const url = `https://api.clerk.com/v1/sign_ups/${signUpId}`;
  const token = process.env.CLERK_API_SECRET;
  return axios.patch(
    url,
    { status: 'complete' },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
export default approveUser