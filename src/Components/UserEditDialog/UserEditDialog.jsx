/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
} from "@fluentui/react-components";
import { Icon, TextField } from "@fluentui/react";

const DialogTest = ({ initialValues, usersList, setUsersList, setIsEditDialogOpen }) => {
    const [editedFirstName, setEditedFirstName] = useState(initialValues.firstname);
    const [editedLastName, setEditedLastName] = useState(initialValues.lastname);
    const [editedEmail, setEditedEmail] = useState(initialValues.email);
    const [editedUserName,] = useState(initialValues.username);

    const onSaveClick = () => {
        const editedData = {
            firstname: editedFirstName,
            lastname: editedLastName,
            email: editedEmail,
            username: editedUserName,
        };

        // Update the user data in your state
        const updatedUsersList = usersList.map((user) =>
            user.username === initialValues.username ? { ...user, ...editedData } : user
        );

        // Update state to re-render the component
        setUsersList(updatedUsersList);

        // Update local storage with the updated array
        localStorage.setItem('formData', JSON.stringify(updatedUsersList));

        // Close the dialog
        setIsEditDialogOpen(false);
    };

    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Icon iconName="Edit" className='editButton' style={{ cursor: 'pointer', color: 'blue' }} />
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Edit Details for {initialValues?.firstname}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="First Name"
                            value={editedFirstName}
                            onChange={(e, newValue) => setEditedFirstName(newValue)}
                        />
                        <TextField
                            label="Last Name"
                            value={editedLastName}
                            onChange={(e, newValue) => setEditedLastName(newValue)}
                        />
                        <TextField
                            label="Email"
                            value={editedEmail}
                            onChange={(e, newValue) => setEditedEmail(newValue)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" onClick={onSaveClick}>Update</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" >Cancel</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

export default DialogTest;
