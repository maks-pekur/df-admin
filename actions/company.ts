const URL = `${process.env.NEXT_PUBLIC_API_URL}/companies`

export const getCompany = async (id: string): Promise<any> => {
	const res = await fetch(`${URL}/${id}`)
	return res.json()
}
