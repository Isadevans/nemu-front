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

export default function JourneysTable({journeys}: { journeys: Journey[] }) {
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
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
