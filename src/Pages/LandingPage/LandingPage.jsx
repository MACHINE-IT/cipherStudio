import { useState, useEffect } from 'react';
import axios from "axios";
import UserDetailsListDisplay from '../../Components/UserDetailsListDisplay/UserDetailsListDisplay';
import UserEntrySection from '../../Components/UserEntrySection/UserEntrySection'
import './LandingPage.css';

const LandingPage = () => {
    const [usersList, setUsersList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://cipher-backend-1qvm.onrender.com/');
            setUsersList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data from localStorage on component mount
        // const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        // setUsersList(storedData);
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once on mount


    return (
        <div className='landingPageOuter'>
            <UserEntrySection usersList={usersList} setUsersList={setUsersList} />
            <UserDetailsListDisplay usersList={usersList} setUsersList={setUsersList} />
        </div>
    );
}

export default LandingPage;




