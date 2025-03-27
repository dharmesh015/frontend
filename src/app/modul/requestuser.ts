export class Requestuser {
    
    userName: string;
    userPassword: string;
  
    constructor(userName: string = '', password: string = '') {
      this.userName = userName;
      this.userPassword = password;
    }
}
