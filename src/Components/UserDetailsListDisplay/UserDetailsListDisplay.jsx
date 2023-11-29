import { useState, useEfect } from 'react';
import './UserDetailsListDisplay.css';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';

const UserDetailsListDisplay = ({ usersList, setUsersList }) => {
    const [selection] = useState(new Selection());

    const columns = [
        { key: 'navbutton', name: '', fieldName: 'navbutton', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'firstname', name: 'First Name', fieldName: 'firstname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'lastname', name: 'Last Name', fieldName: 'lastname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'email', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'username', name: 'User Name', fieldName: 'username', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'actions', name: 'Actions', fieldName: 'actions', minWidth: 100, maxWidth: 200, isResizable: true },
    ];


    initializeIcons();

    const onItemInvoked = (item) => {
        // Handle item invoked
        alert(`Item invoked: ${item.firstname}`);
    };

    const onRenderItemColumn = (item, index, column) => {
        const key = column.key;

        switch (key) {
            case 'navbutton':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Icon iconName="GlobalNavButton" style={{ cursor: 'pointer' }} onClick={() => handleEditClick(item)} />
                    </div>
                );
            case 'actions':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Icon iconName="Edit" className='editButton' style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleEditClick(item)} />
                        <Icon iconName="Delete" className='deleteButton' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteClick(item)} />
                    </div>
                );
            default:
                return item[key] !== undefined ? String(item[key]) : '';
        }
    };

    const handleEditClick = (item) => {
        // Handle edit click
        alert(`Edit clicked for: ${item.firstname}`);
    };

    const handleDeleteClick = (item) => {
        // Handle delete click
        const updatedUsersList = usersList.filter((user) => user !== item);

        // Update state to re-render the component
        setUsersList(updatedUsersList);

        // Update local storage with the updated array
        localStorage.setItem('formData', JSON.stringify(updatedUsersList));
    };


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
                    onItemInvoked={onItemInvoked}
                    onRenderItemColumn={onRenderItemColumn}
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="select row"
                />
            </MarqueeSelection>
        </div>
    );
};

export default UserDetailsListDisplay;
