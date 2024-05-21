import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Need to add an Authorization header
    // Use the Logical OR Assignment operator
    options.headers = options.headers || {};
    // Older approach
    // options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, options);
    if (res.ok) return res.json();
    throw new Error('Bad Request');
  } catch (error) {
    console.error('Error sending request:', error.message);
    throw error;
  }
}