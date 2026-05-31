import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  update,
  off,
  query,
  orderByChild,
} from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'vibe-coding-backend-a96b0.firebaseapp.com',
  projectId: 'vibe-coding-backend-a96b0',
  databaseURL:
    'https://vibe-coding-backend-a96b0-default-rtdb.asia-southeast1.firebasedatabase.app',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
export { ref, push, set, onValue, update, off, query, orderByChild }

// ── 타입 ──────────────────────────────────────────────────────────────────────
export type ConsultStatus = 'new' | 'contacted' | 'consulting' | 'confirmed' | 'cancelled'
export type PaymentStatus = 'waiting' | 'partial' | 'paid' | 'refund'

export interface Enrollment {
  id: string
  name: string
  phone: string
  email: string
  affiliation: string
  aiLevel: string
  goal: string
  memo: string
  consultStatus: ConsultStatus
  paymentStatus: PaymentStatus
  paymentAmount: number
  createdAt: number
}

// ── DB 헬퍼 ──────────────────────────────────────────────────────────────────
/** 수강신청 저장 */
export async function saveEnrollment(data: Omit<Enrollment, 'id' | 'memo' | 'consultStatus' | 'paymentStatus' | 'paymentAmount' | 'createdAt'>) {
  const newRef = push(ref(db, 'enrollments'))
  await set(newRef, {
    ...data,
    memo: '',
    consultStatus: 'new',
    paymentStatus: 'waiting',
    paymentAmount: 0,
    createdAt: Date.now(),
  })
  return newRef.key
}

/** 신청자 정보 업데이트 */
export async function updateEnrollment(id: string, data: Partial<Enrollment>) {
  await update(ref(db, `enrollments/${id}`), data)
}
