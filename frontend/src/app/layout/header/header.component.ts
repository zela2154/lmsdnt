import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Version 1
const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('250ms ease-in', style({ opacity:1, transform:'translate(0, 5px)'}))
])

const leaveTransition = transition(':leave', [
  style({
   opacity: 1,
  }),
  animate('250ms ease-out', style({opacity: 0}))
])

const enterTransitionAside = transition(':enter', [
  style({
    opacity: 1,
    //transform: 'translate(0,0)',
    //transition:'all 0.6s cubic-bezier(.785,.135,.15,.86)'
  }),
  animate('1s ease-in', keyframes([
        style({ right: '400px', top: '0', offset: 0 }),
       // style({ left: '200px', top: '100px', offset: 0.50 }),
        //style({ left: '0',     top: '200px', offset: 1 })
      ]))
])

const leaveTransitionAside = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('250ms ease-out', style({opacity: 0, transform:'translate(-50px, 0)', background:'#fff'}))
])

const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [leaveTransition])

const fadeInAside = trigger('fadeInAside', [enterTransitionAside]);
const fadeOutAside = trigger('fadeOutAside', [leaveTransitionAside]);

// Version 2
/*const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      display:'flex',
      opacity: 1,
    })),
  state(
    'close',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  transition('open => close', [animate('1s ease-out')]),
  transition('close => open', [animate('1s ease-in')])
])*/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[fadeIn, fadeOut, fadeInAside, fadeOutAside]
 // animations:[fadeInOut]
})
export class HeaderComponent implements OnInit {
  showSearch: Boolean;
  showAside: Boolean;
  showAsideContaint: Boolean;
  constructor(private router: Router) {
    this.showSearch = false;
    this.showAside = false;
    this.showAsideContaint = true;
  }

  ngOnInit(): void {
  }

  showSearchelement() {
   this.showSearch= !this.showSearch
  }

  gotoLogin() {
    this.router.navigate(['lms-dnt/auth/login'])
  }

  gotoSignup() {
    this.router.navigate(['lms-dnt/auth/signup'])
  }

}
