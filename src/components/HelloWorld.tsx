import  { useState, useEffect } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_API_BACKEND;

function HelloWorld() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    axios.get(BACKEND_URL +'api/hello-world')
      .then(response => {
        const formattedMessage = response.data.message.replace(/ /g, '\u00A0');
        setMessage(formattedMessage);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;