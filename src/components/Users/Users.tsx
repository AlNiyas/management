import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton, SelectionMode, mergeStyleSets, FontIcon, mergeStyles, IconButton, IIconProps, Stack, StackItem, IStackItemStyles } from "@fluentui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { IUser } from "../models/model";

 const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 15
    },
  };
 
const Users = () => {
  console.log("Rendering Users");
    //const users:IUser[] = getUsers();
    let [users,setUsers] = useState<IUser[]>([]);
    const [reloadUsersToggle,setReloadUsersToggle] = useState(true);
    const [showDeleteSuccessMessage, setShowDeleteSuccessMessage ] = useState(false);
    const selectedUserId = useRef(0); // this will survive re-render.

    useEffect(() => {
        console.log("Executing useEffect");
        const fetchData = async () => {
          console.log("Inside fetch");
          const response = await fetch('http://localhost:8080/api/users');
          const jsonData = await response.json();
          setUsers(jsonData);
        }
        fetchData();
      }, [reloadUsersToggle]);
 
      const deleteUser = (user: IUser) => {
        fetch(`http://localhost:8080/api/users/${user.userId}`, {
            method: 'delete'
        }).then(response => response.text()).then(data => {
            console.log(data);
            if (data === 'Success') {
                setShowDeleteSuccessMessage(true);
                setReloadUsersToggle(!reloadUsersToggle);
                selectedUserId.current = user.userId;
            }
        }

        );
    }
      
    const deleteIcon: IIconProps = { 
        iconName: 'Delete'
    };

    const columns: IColumn[] = [
        {
            key:"column1",
            name:"User Id",
            fieldName:"userId",
            minWidth:100,
            maxWidth:100,
            isRowHeader:true,
            onRender: (user:IUser) => {
                return <span>{user.userId}</span>;
            }
        },
        {
            key:"column2",
            name:"Name",
            fieldName:"name",
            minWidth:200,
            maxWidth:200,
            onRender: (user:IUser) => {
                return <span>{user.name}</span>;
            }
        },
        {
            key:"column3",
            name:"Email",
            fieldName:"email",
            minWidth:200,
            maxWidth:200,
            onRender: (user:IUser) => {
                return <span>{user.email}</span>;
            }
        },
        {
            key:"column4",
            name:"Mobile",
            fieldName:"mobile",
            minWidth:200,
            maxWidth:200,
            onRender: (user:IUser) => {
                return <span>{user.mobileNumber}</span>;
            }
        },
        {
            key:"column5",
            name:"Details",
            fieldName:"details",
            minWidth:150,
            maxWidth:150,
            onRender: (user:IUser) => {
                return  <Link to={`/users/${user.userId}`}><PrimaryButton>Details</PrimaryButton></Link>;
            }
        },
        {
            key:"column6",
            name:"Actions",
            fieldName:"delete",
            minWidth:150,
            maxWidth:150,
            onRender: (user:IUser) => {
                return <IconButton  iconProps={deleteIcon} style={{ color: 'red' }} onClick={()=>{
                    deleteUser(user);
                }}>Delete</IconButton>;
            }
        }

    ];

    return (
        <div>
            <Stack>
                <StackItem align="end" styles={stackItemStyles}><Link to={'/users/newUser'}><PrimaryButton>New User</PrimaryButton></Link></StackItem>
            </Stack>
            
            <DetailsList
                items={users}
                columns={columns}
                selectionMode={SelectionMode.none}
                // getKey={this._getKey}
                setKey="none"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                // onItemInvoked={this._onItemInvoked}
            />
            {showDeleteSuccessMessage && <ConfirmationPopup userId={selectedUserId.current.toString()} popupMessage="User is deleted successfully" okNavigationPath="" /> }
        </div>
    );
}

export default Users;


