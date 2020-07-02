import React, { useState, FC } from 'react';
import styles from './Pagination.module.css'

type PropsType = {
        totalItems: number
        itemsOnPage: number
        portionSize: number
        currentPage: number
        getItemsOnClick: (p: number) => void
}

const Pagination: FC<PropsType> = (props) => {
        let pagesCount = Math.ceil(props.totalItems / props.itemsOnPage)
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
        }
        let [currentPortion, setCurrentPortion] = useState(1)
        let leftPositionPageNumber = (currentPortion - 1) * props.portionSize + 1
        let rightPositionPageNumber = currentPortion * props.portionSize
        let portionsCount = Math.ceil(pages.length / props.portionSize)
        return <div className={styles.paginationTop}>
                {currentPortion > 1 &&
                        <button className={styles.paginationButtonLeft}
                                onClick={() => { setCurrentPortion(currentPortion - 1) }}>prev
                        </button>}
                <div className = {styles.pageNumbers}>
                {pages.filter((p) => (p >= leftPositionPageNumber && p <= rightPositionPageNumber)).map(p =>
                        <span className={props.currentPage === p ? styles.activePage : undefined}
                                onClick={(e) => props.getItemsOnClick(p)}>{p} </span>)}
                </div>
                {currentPortion < portionsCount &&
                        <button className={styles.paginationButtonRight}
                                onClick={() => { setCurrentPortion(currentPortion + 1) }}>next
            </button>}
        </div>
}

export default Pagination