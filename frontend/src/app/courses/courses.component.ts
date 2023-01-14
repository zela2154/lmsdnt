import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  showLeft1: boolean;
  constructor() { 
    this.showLeft1 = true
  }

  ngOnInit(): void {
  }

}
