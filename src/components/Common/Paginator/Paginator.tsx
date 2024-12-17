import { useState } from 'react'
import s from './Paginator.module.css'
import cn from 'classnames'

type PaginatorProps = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	portionSize?: number
}

export const Paginator = ({
	totalUsersCount,
	pageSize,
	currentPage,
	onPageChanged,
	portionSize = 10,
}: PaginatorProps) => {
	let pagesCount = Math.ceil(totalUsersCount / pageSize)

	let pages: Array<number> = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let portionCount = Math.ceil(pagesCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(1) //hook храним первую
	//порцию(portionNumber) и функция(setPortionNumber), которая будет менять portionNumber
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	let rightPortionPageNumber = portionNumber * portionSize

	return (
		<div className={s.paginator}>
			{portionNumber > 1 && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber - 1)
					}}
				>
					Prev
				</button>
			)}
			{pages
				.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
				.map(p => {
					return (
						<span
							className={cn(
								{ [s.selectedPage]: currentPage === p },
								s.pageNumber
							)}
							onClick={e => {
								onPageChanged(p)
							}}
						>
							{p}
						</span>
					)
				})}
			{portionCount > portionNumber && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber + 1)
					}}
				>
					Next
				</button>
			)}
		</div>
	)
}

