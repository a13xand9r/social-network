import React, { useState } from 'react';
import styles from './Pagination.module.css'

const Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalItems / props.itemsOnPage)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)     
    }
    let [currentPortion, setCurrentPortion] = useState(1)
    let leftPositionPageNumber  = ( currentPortion - 1 ) * props.portionSize + 1
    let rightPositionPageNumber = currentPortion * props.portionSize
    let portionsCount = Math.ceil(pages.length / props.portionSize) 
    return <div>
            {currentPortion > 1 &&
            <button className = {styles.paginationButton} 
                    onClick = {() => {setCurrentPortion(currentPortion - 1)}}>prev
            </button>}

            {pages.filter((p) => (p >= leftPositionPageNumber && p <= rightPositionPageNumber)).map(p =>
                <span className={props.currentPage === p && styles.activePage}
                    onClick={(e) => props.getUsersOnClick(p)}>{p} </span>)}

            {currentPortion < portionsCount &&
            <button className = {styles.paginationButton} 
                    onClick = {() => {setCurrentPortion(currentPortion + 1)}}>next
            </button>}
        </div>
}

export default Pagination