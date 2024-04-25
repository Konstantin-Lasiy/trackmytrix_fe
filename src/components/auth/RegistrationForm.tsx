import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RegistrationFormData {
    username: string;
    email: string;
    password1: string;
    password2: string;
  }

interface RegistrationResponse {
    key: string; // Assuming the API returns a unique key or token upon successful registration
  }


  
const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
          // Update this URL to your Django backend CSRF token endpoint
          const response = await axios.get('http://localhost:8000/auth/csrf_token', {withCredentials: true});
          const token = response.data.csrfToken; // Adjust based on your backend response structure
          setCsrfToken(token);
        };
    
        fetchCsrfToken();
      }, []);

    const handleRegistrationSuccess = (responseData: RegistrationResponse) => {
        // Option 1: Show a success message to the user with further instructions
        alert('Registration successful! You can now log in.');
        console.log(responseData)
        navigate('/login')
      };
      
    const [formData, setFormData] = useState<RegistrationFormData>({
        username: '',
        email: '',
        password1: '',
        password2: '',
      });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            console.log('Registration successful', csrfToken);
            const response = await axios.post<RegistrationResponse>('http://localhost:8000/auth/registration/', formData, {
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken, // Include CSRF token in request headers
                },
                withCredentials: true, // Required for cookies to be sent with cross-domain requests
              });
            console.log('Registration successful', response.data);
            handleRegistrationSuccess(response.data);
          } catch (error) {
            console.error('Registration failed', error);
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name='username'
                type="text"
                value={formData.username}
                onChange={(e) => handleChange(e)}
                placeholder="Username"
                required
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                required
            />
            <input
                name="password1"
                type="password"
                value={formData.password1}
                onChange={(e) => handleChange(e)}
                placeholder="Password"
                required
            />
            <input
                name="password2"
                type="password"
                value={formData.password2}
                onChange={(e) => handleChange(e)}
                placeholder="Confirm Password"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
