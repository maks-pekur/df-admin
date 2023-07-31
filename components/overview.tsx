'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
	{
		name: 'Січень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Лютий',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Березень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Квітень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Травень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Червень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Липень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Серпень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Вересень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Жовтень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Лістопад',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Грудень',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
]

export function Overview() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={11}
					tickLine={false}
					axisLine={false}
					tickFormatter={value => `$${value}`}
				/>
				<Bar dataKey="total" fill="#adfa1d" radius={[5, 5, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	)
}
