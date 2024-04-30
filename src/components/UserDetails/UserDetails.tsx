import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IUser } from "../models/model";
import { DefaultButton, IStackProps, IStackStyles, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { FieldValues, useForm } from "react-hook-form";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: "auto", padding:50 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 400 } },
};

const stackTokensForButtons = { childrenGap: 50 };
const stackStylesForButtons: Partial<IStackStyles> = { root: { width: "auto", padding:50} };
const columnPropsForButtons: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};


type Props = {
  isNewUser: boolean
}

const UserDetails = ({isNewUser}:Props) => {

  console.log("Rendering UserDetails");
  let {userId} = useParams();
  const [fetchedUser, setFetchedUser] = useState<IUser>();
  const [showUpdateSuccessMessage, setShowUpdateSuccessMessage ] = useState(false);
  const [showCreateSuccessMessage, setShowCreateSuccessMessage ] = useState(false);

  useEffect(() =>{

    if(isNewUser){ 
      const newUser:IUser = {
        userId:0,
        email:"",
        name:"",
        mobileNumber:0
      }
      setFetchedUser(newUser);
    } else{
      fetch(`http://localhost:8080/api/users/${userId}`)
        .then(response=>response.json())
        .then(json=>  {setFetchedUser(json);});
    }
  } ,[] );


  const {register , handleSubmit} = useForm();

  function updateUser(userId: string | undefined, data : FieldValues) {
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.text()).then(data => {
      console.log(data);
      if (data === 'Success') {
        setShowUpdateSuccessMessage(true);
      }
    });
    console.log(data);
  }

  function createUser(data : FieldValues) {
    fetch(`http://localhost:8080/api/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.text()).then(data => {
      console.log(data);
      if (data === 'Success') {
        setShowCreateSuccessMessage(true);
      }
    });
    console.log(data);
  }

  return (

    fetchedUser ? (
    <div >
      <form 
        onSubmit={handleSubmit( (data) => {
          if(isNewUser){
            createUser(data);
          } else {
            updateUser(userId, data);
          }
        })}
      >
        <Stack horizontal styles={stackStyles} tokens={stackTokens}>
          <Stack {...columnProps}>
            <TextField label="Name" required defaultValue={fetchedUser.name.toString()}  {...register("name")}  />
            <TextField label="Email" required defaultValue={fetchedUser.email} {...register("email")}/>
          </Stack>
          <Stack {...columnProps}>
            <TextField label="Mobile Number" type="number" required defaultValue={fetchedUser.mobileNumber.toString()} {...register("mobileNumber")}/>
            {!isNewUser && <TextField label="User ID" required readOnly defaultValue={fetchedUser.userId.toString()}  {...register("userId")}  />}        
          </Stack>
        </Stack>
        <Stack horizontal styles={stackStylesForButtons} tokens={stackTokensForButtons} horizontalAlign='end'>
            <Link to={'/users'}><DefaultButton type="button" text="Back"></DefaultButton></Link>
            <PrimaryButton type="submit" text="Submit"></PrimaryButton>
        </Stack>
      </form>
      {showUpdateSuccessMessage && <ConfirmationPopup  popupMessage="User is updated successfully" okNavigationPath="/users" /> }
      {showCreateSuccessMessage && <ConfirmationPopup  popupMessage="User is created successfully" okNavigationPath="/users" /> }
      </div> ) :
      (<p>Loading...</p>)
  );
}

export default UserDetails;


