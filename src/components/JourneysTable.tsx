import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type {Journey} from "@/types/response.ts";
import DynamicBadgeDisplay from "@/components/DinamicBadgeDisplay.tsx";

interface JourneysTableProps {
    journeys: Journey[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function JourneysTable({journeys, currentPage, totalPages, onPageChange}: JourneysTableProps) {

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const halfPagesToShow = Math.floor(maxPagesToShow / 2);

        let startPage = Math.max(1, currentPage - halfPagesToShow);
        let endPage = Math.min(totalPages, currentPage + halfPagesToShow);

        if (currentPage - halfPagesToShow <= 0) {
            endPage = Math.min(totalPages, maxPagesToShow);
        }

        if (currentPage + halfPagesToShow >= totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold pb-2">Jornadas de Conversão</h1>
            <p className="text-gray-500 pb-6">Multitouch Attribution - Visualize as jornadas completas dos usuários até
                a conversão
            </p>
            <div className="w-full border rounded-md overflow-hidden">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead style={{ width: '90%' }}>JORNADA</TableHead>
                            <TableHead style={{ width: '10%', textAlign: 'right' }}>TOUCHPOINTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {journeys.map((product) => (
                            <TableRow key={product.sessionId} className="odd:bg-muted/50">
                                <TableCell className="min-w-0 py-3">
                                    <DynamicBadgeDisplay maxVisible={7} touchpoints={product.touchpoints}/>
                                </TableCell>
                                <TableCell style={{ textAlign: 'right' }} className="py-3 text-lg ">
                                    {product.touchpoints.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePrevious();
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    {pageNumbers[0] > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink href="#" onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(1);
                                }}>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            {pageNumbers[0] > 2 && <PaginationEllipsis />}
                        </>
                    )}
                    {pageNumbers.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                        <>
                            {pageNumbers[pageNumbers.length - 1] < totalPages -1 && <PaginationEllipsis />}
                            <PaginationItem>
                                <PaginationLink href="#" onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(totalPages);
                                }}>
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNext();
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
