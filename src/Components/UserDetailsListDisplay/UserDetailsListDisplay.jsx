import React, { useState } from 'react';
import './UserDetailsListDisplay.css';
import { DetailsList, DetailsListLayoutMode, Selection } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';

const UserDetailsListDisplay = ({ usersList }) => {
    const [selection] = useState(new Selection());

    const columns = [
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
            case 'actions':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Icon iconName="Edit" style={{ cursor: 'pointer' }} onClick={() => handleEditClick(item)} />
                        <Icon iconName="Delete" style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(item)} />
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
        alert(`Delete clicked for: ${item.firstname}`);
    };

    return (
        <div className='users-list-display-outer-container'>
            <MarqueeSelection selection={selection}>
                <DetailsList
                    compact={true}
                    items={usersList}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
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
