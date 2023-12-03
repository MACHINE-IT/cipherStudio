/* eslint-disable react/prop-types */
import { useState } from 'react';
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

    const onSaveButtonClickHandler = () => {
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
            // Update state and localStorage
            setUsersList((prevUsersList) => [...prevUsersList, formData]);
            localStorage.setItem('formData', JSON.stringify([...usersList, formData]));

            // Clear input fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setUserName('');
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
