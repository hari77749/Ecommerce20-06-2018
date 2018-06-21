import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AutenticationService} from '../../SharedModule/Auth/autentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  characters: any;
    columns: string[];
  constructor(private authservice: AutenticationService,private router: Router) { }

  ngOnInit() {
    
    this.columns = this.authservice.getColumns(); 
    this.characters = this.authservice.getCharacters();
  }
  Logmeout(evnt)
  {    
    
    this.router.navigate(['/login']);
  }

}
