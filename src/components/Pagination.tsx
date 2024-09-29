import React from 'react';

interface PaginationProps {
    usersPerPage: number;
    totalUsers: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination = ({usersPerPage, totalUsers, paginate, currentPage}: PaginationProps) => {

    const totalPages = Math.ceil(totalUsers / usersPerPage);  // Total number of pages
    const maxPageNumbersToShow = 5;  // Max pages to show at a time
    const pageNumbers = [];

    // Logic to limit the displayed page numbers to `maxPageNumbersToShow`
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1);
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Previous
                    </button>
                </li>

                {/* If there's more than `maxPageNumbersToShow`, show "..." before the first page */}
                {startPage > 1 && (
                    <>
                        <li>
                            <button
                                onClick={() => paginate(1)}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                1
                            </button>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500">
                                ...
                            </span>
                        </li>
                    </>
                )}

                {/* Render page numbers */}
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight ${
                                currentPage === number
                                    ? 'text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                            }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {/* If there are more than `maxPageNumbersToShow`, show "..." after the last page */}
                {endPage < totalPages && (
                    <>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500">
                                ...
                            </span>
                        </li>
                        <li>
                            <button
                                onClick={() => paginate(totalPages)}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {totalPages}
                            </button>
                        </li>
                    </>
                )}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Next
                    </button>
                </li>
            </ul>
            {/* Show total page count */}
            <div className="mt-2 text-center text-sm text-gray-500">
                Page {currentPage} of {totalPages}
            </div>
        </nav>
    );
};

export default Pagination;