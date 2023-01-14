import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { ITokenUser } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  saveToken(token: string): void{
    localStorage.setItem('token', token)    
    this.router.navigate(['lms-dnt/admin/dashbord'])
  }

  isLogged(): boolean{
    const token = localStorage.getItem('token')
    // !! pour transformer une variable en boolean
    return !! token
  }

  clearToken(): void{
    localStorage.removeItem('token')
    this.router.navigate(['lms-dnt/auth/login'])
  }

  clearTokenExpired(): void{
    localStorage.removeItem('token')
    this.router.navigate(['lms-dnt/auth/login'])
  }

  getToken(): string | null{
    return localStorage.getItem('token')
  }

  getPayload(){
    let user: ITokenUser = {
      user_id: 0,
      first_name: '',
      last_name: '',
      email: ''
    }

    let token = localStorage.getItem('token')
    if(token != null){
      const decode: ITokenUser =  jwtDecode<ITokenUser>(token)
      user.user_id = decode.user_id
      user.first_name = decode.first_name
      user.last_name = decode.last_name
      user.email = decode.email
    }

    return user
    
  }
}
