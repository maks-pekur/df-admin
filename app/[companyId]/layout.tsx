import { getCompany } from '@/actions/company'
import { Navbar } from '@/components/navbar'

export default async function CompanyLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: {
		companyId: string
	}
}) {
	const company = await getCompany(params.companyId)

	if (!company) {
		return <div>Not found</div>
	}

	return (
		<>
			<Navbar stores={[]} />
			<pre>{JSON.stringify(company)}</pre>
			{children}
		</>
	)
}
