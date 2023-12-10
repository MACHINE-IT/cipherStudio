/* eslint-disable react/prop-types */
import { useState } from 'react';
import './UserDetailsListDisplay.css';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import UserEditDialog from '../UserEditDialog/UserEditDialog';

const UserDetailsListDisplay = ({ usersList, setUsersList }) => {
    const [selection] = useState(new Selection());
    const [, setIsEditDialogOpen] = useState(false);


    const columns = [
        { key: 'navbutton', name: '', fieldName: 'navbutton', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'firstName', name: 'First Name', fieldName: 'firstname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'lastName', name: 'Last Name', fieldName: 'lastname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'email', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'userName', name: 'User Name', fieldName: 'username', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'actions', name: 'Actions', fieldName: 'actions', minWidth: 100, maxWidth: 200, isResizable: true },
    ];


    initializeIcons();

    const onRenderItemColumn = (item, index, column) => {
        const key = column.key;

        switch (key) {
            case 'navbutton':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Icon iconName="GlobalNavButton" style={{ cursor: 'pointer' }} />
                    </div>
                );
            case 'actions':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <UserEditDialog initialValues={item} usersList={usersList} setUsersList={setUsersList} setIsEditDialogOpen={() => setIsEditDialogOpen(true)} />
                        <Icon iconName="Delete" className='deleteButton' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteClick(item)} />
                    </div>
                );
            default:
                return item[key] !== undefined ? String(item[key]) : '';
        }
    };


    const handleDeleteClick = (item) => {
        // Handle delete click
        const updatedUsersList = usersList.filter((user) => user !== item);

        // Update state to re-render the component
        setUsersList(updatedUsersList);

        // Update local storage with the updated array
        localStorage.setItem('formData', JSON.stringify(updatedUsersList));
    };

    console.log(usersList);
    return (
        <div className='users-list-display-outer-container'>
            <MarqueeSelection selection={selection}>
                <DetailsList
                    // compact={true}
                    items={usersList}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    selectionMode={SelectionMode.none}
                    selection={selection}
                    selectionPreservedOnEmptyClick={true}
                    // onRenderItemColumn={onRenderItemColumn}
                    onRenderItemColumn={(item, index, column) => onRenderItemColumn(item, index, column)}
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="select row"
                    draggable
                />
            </MarqueeSelection>
        </div>
    );
};

export default UserDetailsListDisplay;
