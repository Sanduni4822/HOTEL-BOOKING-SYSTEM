import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from '../../assets/signin/cvimg2.jpg';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name, // Corrected from fullname to name
          }),
        });

        if (response.ok) {
          console.log('User registered successfully');
          navigate('/');
        } else {
          const errorData = await response.json();
          console.error('Error during registration:', errorData.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row w-full max-w-4xl bg-white rounded shadow-md">
        {/* Left Column for Image */}
        <div className="relative w-1/2 m-4">
          <img
            src={backgroundImage}
            alt="Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-start justify-center">
            <div className="mt-2 text-xl font-bold text-center text-white rounded">
              <p className="mt-2 text-lg">Welcome to a home away from home.....</p>
            </div>
          </div>
        </div>

        {/* Right Column for Form */}
        <div className="w-1/2 p-8">
          <h2 className="mb-6 text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Sign Up
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-700">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
