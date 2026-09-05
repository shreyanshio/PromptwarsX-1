import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

export interface AdminInstances {
  app: App | null
  auth: Auth | null
  firestore: Firestore | null
  isConfigured: boolean
}

let instances: AdminInstances | null = null

export function getFirebaseAdmin(): AdminInstances {
  if (instances) {
    return instances
  }

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !rawPrivateKey) {
    instances = {
      app: null,
      auth: null,
      firestore: null,
      isConfigured: false,
    }
    return instances
  }

  try {
    const formattedKey = rawPrivateKey.replace(/\\n/g, '\n')

    let app: App
    if (!getApps().length) {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: formattedKey,
        }),
      })
    } else {
      app = getApp()
    }

    instances = {
      app,
      auth: getAuth(app),
      firestore: getFirestore(app),
      isConfigured: true,
    }
  } catch (err) {
    console.error('[FirebaseAdmin] Failed to initialize Firebase Admin SDK:', err)
    instances = {
      app: null,
      auth: null,
      firestore: null,
      isConfigured: false,
    }
  }

  return instances
}

export function getAdminFirestore(): Firestore | null {
  return getFirebaseAdmin().firestore
}

export function getAdminAuth(): Auth | null {
  return getFirebaseAdmin().auth
}
