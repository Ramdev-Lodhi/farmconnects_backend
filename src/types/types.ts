export type THttpResponse = {
    // success: boolean
    status: boolean
    // statusCode: number
    // request: {
    // ip?: string | null
    //     method: string
    //     url: string
    // }
    message: string
    data: unknown
}
export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
}

export type user = {
    id: string
    name: string
    email: string
    mobile: string
}
export interface User {
    _id: string // Assuming you have an ID field
    name: string // User's display name
    email: string // User's email address
    mobile: string // User's mobile number
    image: string // URL for user's profile image
    // Add any other relevant fields
}

// Define the Google profile type
export interface GoogleProfile {
    displayName: string // User's display name
    emails: { value: string }[] // User's email(s)
    photos: { value: string }[] // User's photo(s)
}