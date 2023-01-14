export interface IUser {
    user_id:number, 
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    social_links: string,
    biography: string,
    role_id: number,
    wishlist: string,
    title: string,
    paypal_key: string,
    verification_code: string,
    status: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: null | string,
}

export interface ISingleUser{
    data: IUser
}

export interface IDataUser{
    data: IUser[]
}

export interface ITokenUser{
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    iap?: number,
    exp?: number
}
