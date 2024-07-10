'use server'

const { API_BASE_URL } = process.env

type GetBodyTypesApiResponse = { $values: string[] }

export const getBodyTypes = async () => {
  const req = await fetch(`${API_BASE_URL}/api/filters/suggest-bodytype`, {
    method: 'GET',
  })

  const { $values: bodyTypes }: GetBodyTypesApiResponse = await req.json()
  return bodyTypes
}
