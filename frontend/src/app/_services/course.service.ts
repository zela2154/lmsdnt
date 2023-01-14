import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICourse, IDataCourse, ISingleCourse } from '../_interfaces/course';
import { IApi } from '../_interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url = environment.api + "courses"
  
  constructor(private http: HttpClient) { }
  getRatingCourses(sort: string): Observable<IDataCourse>{
    return this.http.get<IDataCourse>(`${this.url}?sort=${sort}`)
  }

   getBestCourses(): Observable<IDataCourse>{
    return this.http.get<IDataCourse>(this.url+'/'+'best')
  }

   getLastCourses(sort: string): Observable<IDataCourse>{
    return this.http.get<IDataCourse>(`${this.url}?sort=${sort}`)
  }

   getAllCourses(): Observable<IDataCourse>{
     return this.http.get<IDataCourse>(this.url);
  }

  getCourse(cid: string | null): Observable<ISingleCourse>{
    return this.http.get<ISingleCourse>(this.url + '/' + cid);
  }

  addCourse(course: ICourse): Observable<IApi>{
    return this.http.post<IApi>(this.url, course);
  }

  updateCourse(course: ICourse): Observable<IApi>{
    return this.http.put<IApi>(this.url + '/' + course.course_id, course);
  }

  deleteCourse(cid: number | undefined): Observable<IApi>{
    return this.http.delete<IApi>(this.url + '/' + cid);
  }
}
