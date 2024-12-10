"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import { link } from "fs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    page: number;
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") ?? "1");

    const pageElements = generatePaginationNumbers(currentPage, totalPages);
    const numOfDotsBlock = pageElements.filter((e) => e === "...").length;

    const createPageUrl = (pageNumber: number | string, possition: number | undefined) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === "..." && possition) {
            let linkPage = params.toString();
            if (numOfDotsBlock === 1) {
                linkPage = `${currentPage > possition ? currentPage - 2 : currentPage + 2}`;
            }

            if (numOfDotsBlock === 2) {
                linkPage = `${possition === 1 ? currentPage - 2 : currentPage + 2}`;
            }

            return `${pathname}?page=${linkPage}`;
        }

        if (+pageNumber === 0) {
            return `${pathname}`;
        }

        if (+pageNumber > totalPages) {
            return `${pathname}?${params.toString()}`;
        }

        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-end my-10">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item disabled">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded focus:shadow-none",
                                {
                                    "text-gray-800 hover:text-gray-800 hover:bg-gray-200": currentPage > 1,
                                    "text-gray-500 pointer-events-none": currentPage === 1,
                                }
                            )}
                            href={`?page=${currentPage - 1}`}
                            aria-disabled={currentPage === 1}
                        >
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>

                    {pageElements.map((p, i) => {
                        const activePage = currentPage === Number(p);
                        return (
                            <li key={p + "-" + i} className={clsx("page-item", { " active": activePage })}>
                                {activePage ? (
                                    <span className="page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md">
                                        {p} <span className="visually-hidden"></span>
                                    </span>
                                ) : (
                                    <Link
                                        className={
                                            "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                        }
                                        href={createPageUrl(p, p === "..." && numOfDotsBlock ? i : undefined)}
                                    >
                                        {p}
                                    </Link>
                                )}
                            </li>
                        );
                    })}

                    <li className="page-item">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded focus:shadow-none",
                                {
                                    "text-gray-800 hover:text-gray-800 hover:bg-gray-200": currentPage < totalPages,
                                    "text-gray-500 pointer-events-none": currentPage === totalPages,
                                }
                            )}
                            href={`?page=${currentPage + 1}`}
                            aria-disabled={currentPage === totalPages}
                        >
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
