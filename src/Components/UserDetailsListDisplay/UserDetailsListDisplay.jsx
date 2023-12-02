/* eslint-disable react/prop-types */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './UserDetailsListDisplay.css';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import UserEditDialog from '../EditUserDialog/UserEditDialog';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import UserDetailRow from '../UserDetailRow/UserDetailRow';

const UserDetailsListDisplay = ({ usersList, setUsersList }) => {
    const [selection] = useState(new Selection());
    const [, setIsEditDialogOpen] = useState(false);

    const columns = [
        { key: 'navbutton', name: '', fieldName: 'navbutton', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'firstname', name: 'First Name', fieldName: 'firstname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'lastname', name: 'Last Name', fieldName: 'lastname', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'email', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'username', name: 'User Name', fieldName: 'username', minWidth: 100, maxWidth: 200, isResizable: true },
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
        const updatedUsersList = usersList.filter((user) => user !== item);
        setUsersList(updatedUsersList);
        localStorage.setItem('formData', JSON.stringify(updatedUsersList));
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        const reorderedUsersList = Array.from(usersList);
        const [removed] = reorderedUsersList.splice(source.index, 1);
        reorderedUsersList.splice(destination.index, 0, removed);

        setUsersList(reorderedUsersList);
        localStorage.setItem('formData', JSON.stringify(reorderedUsersList));
    };

    return (
        <div className='users-list-display-outer-container'>
            <DragDropContext onDragEnd={onDragEnd}>
                <DetailsList
                    items={[]}
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
                <Droppable droppableId={uuidv4()}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'darkgery' : 'grey' }}
                            {...provided.droppableProps}
                        >
                            {usersList.map((user, index) => (
                                <Draggable key={user.username} draggableId={user.username} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                                boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                            }}
                                        >
                                            <UserDetailRow key={index} user={user} index={index} usersList={usersList} setUsersList={setUsersList} columns={columns} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default UserDetailsListDisplay;
