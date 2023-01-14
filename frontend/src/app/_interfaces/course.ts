export interface ICourse {
     course_id: string,
     title: string,
     short_description: string,
     description: string,
     outcomes: string,
     requirements:string,
     language_id:number,
     category_id:number,
     price:number,
     discounted_price:number,
     level:string,
     user_id:number,
     thumbnail:string,
     video_url:string,
     visibility:number,
     is_top_course:number,
     is_admin:number,
     status:number,
     course_overview_provider:string,
     is_free_course: number,
     //createdAt: string,
     //updatedAt: string,
     date_added: string,
     last_modified: string
}

export interface ISingleCourse{
   data:  ICourse
}

export interface IDataCourse{
    data: ICourse[]
}