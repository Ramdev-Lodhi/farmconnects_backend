/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import admin from 'firebase-admin'

// Get the base64-encoded service account JSON from environment variable
const encodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT

if (!encodedServiceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is missing')
}

// Decode the base64 string and parse the JSON
const serviceAccount = JSON.parse(Buffer.from(encodedServiceAccount, 'base64').toString('utf-8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default admin
