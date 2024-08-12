'use server'
import type { SignInFormSchemaType, SignUpFormSchemaType } from '@/schemas'
import { cookies } from 'next/headers'

// It turns out the `rewrites` config option in `next.config.js` doesn't work with
// Next.js Server Actions. The base URL is directly injected into the API endpoint
// during request.

const { API_BASE_URL } = process.env

type SignInReturnType = Pick<
  SignUpFormSchemaType,
  'firstName' | 'lastName' | 'email'
> & { userId: string }

export const signIn = async (
  credentials: SignInFormSchemaType,
): Promise<SignInReturnType> => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (res.ok) {
    const { token, expiresIn, ...user } = (await res.json()) as {
      token: string
      userId: string
      email: string
      name: string
      surname: string
      expiresIn: number
    }

    cookies().set('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + expiresIn * 60 * 1000),
    })

    return {
      firstName: user.name,
      lastName: user.surname,
      email: user.email,
      userId: user.userId,
    }
  }

  if (res.status === 401) {
    throw new Error('Niepoprawny adres email lub hasło')
  }

  throw new Error('Wystąpił błąd serwera. Spróbuj ponownie później')
}

export const signOut = async () => {
  cookies().delete('token')

  const isTokenDeleted = !cookies().get('token')?.value
  return isTokenDeleted
}

export const signUp = async (data: SignUpFormSchemaType) => {
  const payload: {
    name: string
    surname?: string
    phone?: string
    email: string
    password: string
    city?: string
    isCompany?: boolean
    voivodeship?: string
  } = {
    name: data.firstName,
    surname: data.lastName,
    phone: data.phoneNumber,
    city: data.city,
    email: data.email,
    password: data.password,
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const message = await res.text()
      return { message, status: res.status }
    }

    throw new Error('Wystąpił błąd serwera. Spróbuj ponownie później')
  } catch (error) {
    throw new Error('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później')
  }
}

export const makePayment = async (nonce: string) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/MakePayment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentMethodNonce: nonce }),
  })

  if (res.ok) {
    return { message: 'Płatność zakończona sukcesem' }
  }

  throw new Error('Wystąpił błąd serwera. Spróbuj ponownie później')
}

export const requestPayment = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/request-payment`)

  if (res.ok) {
    const response = (await res.json()) as {
      token: string
      amount: number
      currency: string
    }
    return response
  }

  throw new Error('Wystąpił błąd serwera. Spróbuj ponownie później')
}
