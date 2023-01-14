import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  userSubMenuActive: boolean;
  constructor(private tokenService: TokenService, private router: Router) { 
    this.userSubMenuActive = false
  }

  ngOnInit(): void {
 

  }
  logout(): void{
    this.tokenService.clearToken()
  }
 
  gotoDashbord() {
    this.router.navigate(['lms-dnt/admin/dashbord'])
  }
  
}
