export interface IUser {
    userId:number,
    name: string,
    email:string,
    mobileNumber:number
}


export interface IConfirmationPopupProps {
    userId?:string,
    popupMessage:string,
    okNavigationPath:string
}