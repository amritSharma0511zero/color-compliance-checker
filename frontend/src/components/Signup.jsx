import register from "../assets/register.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await axios.post("http://localhost:8080/api/v1/user/register", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            console.log(data);
            navigate('/login');
            setFormData({
                fullName: "",
                userName: "",
                email:"",
                password: "",
                confirmPassword: "",
                gender: ""
            })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-4">
                    <img src={register} alt="register" className="w-32 h-32 object-cover rounded-full" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            name="fullName" 
                            placeholder="Full Name" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                        />
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            name="userName" 
                            placeholder="Username" 
                            value={formData.userName} 
                            onChange={handleChange} 
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                        />
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="mail@mail.com" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                        />
                    </div>
                    <div className="relative">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                        />
                    </div>
                    <div className="relative">
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm Password" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                        />
                    </div>
                    <div className="relative">
                        <select 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p>Already registered? 
                        <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
