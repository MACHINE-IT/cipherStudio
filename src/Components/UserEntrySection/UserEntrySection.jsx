/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import './UserEntrySection.css'

const UserEntrySection = ({ usersList, setUsersList }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');

    const onFirstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    };

    const onLastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    };

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const onUserNameChangeHandler = (e) => {
        setUserName(e.target.value);
    };

    const onSaveButtonClickHandler = async (e) => {
        const formData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: userName,
        };
        const usernameExists = usersList.some(user => user.username === formData.username);
        console.log(usernameExists)
        if (usernameExists) {
            alert(`${formData.username} already exists!`);
        }
        else {
            try {
                e.preventDefault();
                const response = await axios.post('https://cipher-backend-1qvm.onrender.com/add-new-user', {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userName: userName
                });

                const savedUser = response.data;

                // Update state and localStorage
                setUsersList((prevUsersList) => [...prevUsersList, savedUser]);
                // localStorage.setItem('formData', JSON.stringify([...usersList, savedUser]));

                // Clear input fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setUserName('');
            } catch (err) {
                console.error('Error submitting user data:', err);
            }
        }
    };

    return (
        <div>
            <div className='positionAbsoluteForEntrySection'>
                <div className="userDetailsEntrySection">
                    <p>Add User</p>
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
                            type="email"
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
            </div>
        </div>
    );
};

export default UserEntrySection;
