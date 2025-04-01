export class Registrationuser {
    userName: string;
    userPassword: string;
    userLastName: string;
    userFirstName: string;
    email: string;
    mobileNumber: string;
    address:string;
  
    constructor(userName: string = '', userPassword: string = '', userLastName: string = '', 
      userFirstName: string = '', email: string = '', mobileNumber: string = '',address:string="") {
{
      this.userName = userName;
      this.userPassword = userPassword;
      this.userLastName = userLastName;
      this.userFirstName = userFirstName;
      this.email = email;
      this.mobileNumber = mobileNumber;
      this.address=address;
    }
  }
}