import { useState } from 'react'
import { ListingHomeItem } from './ListingHomeItem'

export const PagedHomeListings = (props) => {


    //reference
    //https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-react
    //console.log(props);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, settodosPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTodos = props.listings.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.listings.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={(e) => { /*console.log(e.target); */setcurrentPage(Number(e.target.id)) }}>
                {number}
            </li>
        );
    });

    return <>
        {
            
            currentTodos.map((listing, index) => {
                return <ListingHomeItem listing={listing} key={index} index={index}></ListingHomeItem>
            })
        }

        <div className="clearfix"></div>
        <div className="padding_bottom text-center bottom-pager-container">
            <ul className="pager2">
                {renderPageNumbers}
            </ul>
            <div>
                {props.listings.length} Items
            </div>
            <div>
                Page {currentPage}
            </div>
        </div>

    </>

}