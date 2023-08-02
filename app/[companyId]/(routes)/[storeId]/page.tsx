import { Container } from '@/components/container'
import { LastSales } from '@/components/dashboard/last-sales'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { Heading } from '@/components/heading'
import { Overview } from '@/components/overview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { totalPriceAllOrders } from '@/lib/utils'
import { Activity, Banknote, CreditCard, Download, Users } from 'lucide-react'

interface DashboardPageProps {
	params: {
		companyId: string
		storeId: string
	}
}

const StorePage: React.FC<DashboardPageProps> = async ({ params }) => {
	const orders = []
	const customers = []
	return (
		<Container>
			<div className="flex flex-col space-y-4">
				<div className="flex items-center justify-between space-x-2">
					<Heading title="Dashboard" description="Керуй своим магазином" />
					<div className="flex items-center space-x-2">
						<CalendarDateRangePicker />
						<Button>
							<Download className="mr-2 h-4 w-4" />
							Завантажити
						</Button>
					</div>
				</div>
				<Separator />
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Загальна</TabsTrigger>
						<TabsTrigger value="analytics" disabled>
							Аналітика
						</TabsTrigger>
						<TabsTrigger value="reports" disabled>
							Звіти
						</TabsTrigger>
						<TabsTrigger value="notifications" disabled>
							Повідомлення
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Виторг</CardTitle>
									<Banknote className="h-6 w-6 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{orders && totalPriceAllOrders(orders)}
									</div>
									<p className="text-xs text-muted-foreground">
										+20.1% відносно минулого місяця
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Користувачів
									</CardTitle>
									<Users className="h-6 w-6 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{customers && customers.length}
									</div>
									<p className="text-xs text-muted-foreground">
										+180.1% from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Замовлень
									</CardTitle>
									<CreditCard className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{orders && orders.length}
									</div>
									<p className="text-xs text-muted-foreground">
										+19% відносно минулого місяця
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Active Now
									</CardTitle>
									<Activity className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">0</div>
									<p className="text-xs text-muted-foreground">
										+201 since last hour
									</p>
								</CardContent>
							</Card>
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-4">
								<CardHeader>
									<CardTitle>Обзор</CardTitle>
								</CardHeader>
								<CardContent className="pl-2">
									<Overview />
								</CardContent>
							</Card>
							<LastSales orders={orders} customers={customers} />
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</Container>
	)
}

export default StorePage
