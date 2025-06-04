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
import {Badge} from "@/components/ui/badge.tsx";


export default function JourneysTable({journeys}: { journeys: Journey[] }) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold pb-2">Jornadas de Conversão</h1>
            <p className="text-gray-500 pb-6">Multitouch Attribution - Visualize as jornadas completas dos usuários até a conversão

            </p>
            <div className="w-full border rounded-md overflow-hidden ">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >JORNADA</TableHead>
                            <TableHead>TOUCHPOINTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="mx-auto max-w-2xl">
                        {journeys.map((product) => (
                            <TableRow key={product.sessionId} className="odd:bg-muted/50">
                                <TableCell className="flex gap-2 max-w- overflow-scroll">{product.touchpoints.map(touchpoint=> <Badge >{touchpoint.channel}</Badge>)}</TableCell>
                                <TableCell >{product.touchpoints.length}</TableCell>
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
