export type THttpResponse = {
    // success: boolean
    status: boolean
    // statusCode: number
    request: {
    ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
}
export type THttpError = {
    // success: boolean
    status: boolean
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
    loginid: string
    name: string
    email: string
    mobile: string
}
export interface User {
    _id: string
    name: string
    email: string
    mobile: string
    image: string
}

// Define the Google profile type
export interface GoogleProfile {
    user: {
        id: string
        displayName: string
        name: {
            familyName: string
            givenName: string
        }
        emails: Array<{ value: string; verified: boolean }>
        photos: Array<{ value: string }>
        provider: string
    }
    token: string
}
