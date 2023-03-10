import type { Expense } from '@prisma/client'
import { useMemo } from 'react'

interface Statistic {
	title: string
	value: string
	id: number
}

function calculateSummaryStatistics(expenses: Array<Expense>) {
	if (expenses.length > 0) {
		const amounts = expenses.map((expense) => +expense.amount)
		const maxAmount = Math.max(...amounts)
		const minAmount = Math.min(...amounts)
		const sum = expenses.reduce((prevVal, curVal) => curVal.amount + prevVal, 0)
		const avg = sum / expenses.length

		return { minAmount, maxAmount, sum, avg }
	} else {
		return { minAmount: 0, maxAmount: 0, sum: 0, avg: 0 }
	}
}

export default function Statistics({ expenses }: { expenses: Array<Expense> }) {
	const { minAmount, maxAmount, sum, avg } = useMemo(
		() => calculateSummaryStatistics(expenses),
		[expenses]
	)
	const Statistics: Array<Statistic> = [
		{
			id: 1,
			title: 'Total',
			value: sum.toFixed(2)
		},
		{
			id: 2,
			title: 'Average',
			value: avg.toFixed(2)
		},
		{
			id: 3,
			title: 'Min. Amount',
			value: minAmount.toFixed(2)
		},
		{
			id: 4,
			title: 'Max. Amount',
			value: maxAmount.toFixed(2)
		}
	]
	return (
		<section>
			<ul id='expense-statistics' className='grid grid-cols-2 gap-4'>
				{Statistics.map((item) => (
					<li
						key={item.id}
						className='flex flex-col items-center rounded-md bg-neutral-200 p-2'
					>
						<span className='sm:text-lg'>{item.title}</span>
						<span className='font-bold sm:text-lg  lg:text-xl'>
							€{item.value}
						</span>
					</li>
				))}
			</ul>
		</section>
	)
}
