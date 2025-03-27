export class Registrationuser {
    userName: string;
    userPassword: string;
    userLastName: string;
    userFirstName: string;
    email: string;
    mobile: string;
  
    constructor(userName: string = '', userPassword: string = '', userLastName: string = '', 
      userFirstName: string = '', email: string = '', mobile: string = '') {
{
      this.userName = userName;
      this.userPassword = userPassword;
      this.userLastName = userLastName;
      this.userFirstName = userFirstName;
      this.email = email;
      this.mobile = mobile;
    }
  }
}