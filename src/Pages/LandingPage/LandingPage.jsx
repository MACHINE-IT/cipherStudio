import React, { useState, useEffect } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import UserDetailsListDisplay from '../../Components/UserDetailsListDisplay/UserDetailsListDisplay';
import './LandingPage.css';

const LandingPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        // Fetch data from localStorage on component mount
        const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        setUsersList(storedData);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const onFirstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    }

    const onLastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    }

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onUserNameChangeHandler = (e) => {
        setUserName(e.target.value);
    }

    const onSaveButtonClickHandler = () => {
        const formData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: userName
        }

        // Update state and localStorage
        setUsersList((prevUsersList) => [...prevUsersList, formData]);
        localStorage.setItem('formData', JSON.stringify([...usersList, formData]));
    }

    return (
        <div>
            <div className="userDetailsEntrySection">
                <div className='userTextFieldsContainer'>
                    <TextField
                        className="textField"
                        placeholder="First Name"
                        value={firstName}
                        onChange={onFirstNameChangeHandler}
                    />
                    <TextField
                        className="textField"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={onLastNameChangeHandler}
                    />
                    <TextField
                        className="textField"
                        placeholder="Email"
                        value={email}
                        onChange={onEmailChangeHandler}
                    />
                    <TextField
                        className="textField"
                        placeholder="UserName"
                        value={userName}
                        onChange={onUserNameChangeHandler}
                    />
                </div>
                <PrimaryButton className="userSaveButton" text="Save" onClick={onSaveButtonClickHandler} allowDisabledFocus />
            </div>
            <UserDetailsListDisplay usersList={usersList} />
        </div>
    );
}

export default LandingPage;
