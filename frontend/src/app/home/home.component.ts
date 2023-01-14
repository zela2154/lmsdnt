import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { CourseService } from '../_services/course.service';
import { ICourse } from '../_interfaces/course';
import SwiperCore,{
  Pagination,
  EffectCube,
  Navigation,
  EffectCoverflow,
} from 'swiper';

SwiperCore.use([Pagination,Navigation,EffectCube,EffectCoverflow])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  //@ViewChild('swiper') swiper: SwiperComponent

  config: SwiperOptions = {
    slidesPerView: 5,
    //spaceBetween: 50,
   // pagination:true,
    //slidesPerView: 'auto',
    //slidesPerView: 1.5,
   // pagination: true,
    //effect: 'cube',
    //effect: 'coverflow',
    //centeredSlides: true,
    //spaceBetween:-20,
    /*coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },*/
  navigation: true,
  pagination: {
    clickable: true,
  }
  }

  courseList: any = [];
  courseList1 : ICourse[] = [];
  constructor(private courseService: CourseService) { }

calculateRatingPercent(ratingPercent: number, totalStars: number) {
    return totalStars * (ratingPercent / 100);
  }



  ngOnInit(): void {
    this.courseService.getBestCourses().subscribe( 
      data => {
        //console.log(data);
        this.courseList = data.data
      }
    )

     this.courseService.getLastCourses('last').subscribe( 
      data => {
        //console.log(data);
        this.courseList1 = data.data
      }
    )
  }

}
