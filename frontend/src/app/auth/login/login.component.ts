import { Component, OnInit } from '@angular/core';
import { ICredential } from 'src/app/_interfaces/credential';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  connected: boolean
  form: ICredential = {
    email: '',
    password: ''
  }

  constructor(
     private authService: AuthService,
     private tokenService: TokenService
  ) { }

  onSubmit() {
    //console.log(this.form)
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data.access_token)
        this.connected=true
        this.tokenService.saveToken(data.access_token)
      },
      err => { 
        console.log(err)
        this.connected = false
      }
      
    )
  }
  ngOnInit(): void {
  }

}
