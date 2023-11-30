import { useState, useEffect } from 'react';
import UserDetailsListDisplay from '../../Components/UserDetailsListDisplay/UserDetailsListDisplay';
import UserEntrySection from '../../Components/UserEntrySection/UserEntrySection'
import './LandingPage.css';

const LandingPage = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        // Fetch data from localStorage on component mount
        const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        setUsersList(storedData);
    }, []); // Empty dependency array ensures this effect runs only once on mount


    return (
        <div className='landingPageOuter'>
            <UserEntrySection usersList={usersList} setUsersList={setUsersList} />
            <UserDetailsListDisplay usersList={usersList} setUsersList={setUsersList} />
        </div>
    );
}

export default LandingPage;




