import { useState } from 'react';
import './UserDetailsListDisplay.css';
import { DetailsList, DetailsListLayoutMode, Selection } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';

const UserDetailsListDisplay = ({ usersList }) => {
    const [selection] = useState(new Selection());
    const columns = [
        { key: 'column1', name: 'First Name', fieldName: 'firstname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Last Name', fieldName: 'lastname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'User Name', fieldName: 'username', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    const onItemInvoked = (item) => {
        // Handle item invoked
        alert(`Item invoked: ${item.firstname}`);
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
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="select row"
                />
            </MarqueeSelection>
        </div>
    );
};

export default UserDetailsListDisplay;
