import { Component, OnInit } from '@angular/core';
 import {AppUsers} from '../../SharedModule/Models/AppUsers';
 import { Router } from '@angular/router';
 import {AutenticationService} from '../../SharedModule/Auth/autentication.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    characters: any;
    columns: string[];
    token="";
    Loggedin: boolean = null;
    successMessage: string;    
    errorMessage: string;

    appUsers : AppUsers ={
    UserName: '',
    Password: ''
  };

  constructor(private authservice: AutenticationService,private router: Router) { }

  ngOnInit() {

    this.columns = this.authservice.getColumns(); 
    this.characters = this.authservice.getCharacters();
  }
  loginmein(evnt)
  {   
    this.successMessage="";
    this.errorMessage = "";
     this.authservice.getLogin(this.appUsers).then(
      data=>{
        this.successMessage ="User Logged in with token " + data['access_token'];
        if(data['access_token']!=undefined)
        {
          this.Loggedin=true;
          this.router.navigate(['/home']);
        }
        else
        {
          this.Loggedin=false;
        }
        
       }, error =>{this.errorMessage = <any>error;
        this.Loggedin=false;
      } 
     );    
  } 
  Logmeout(evnt)
  {
    this.Loggedin=false;
  }

}
