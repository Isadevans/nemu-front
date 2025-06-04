import './App.css'
import {useQuery} from "@tanstack/react-query";
import axios from "axios"
import type {JourneyResponse} from "@/types/response.ts";
import JourneysTable from "@/components/JourneysTable.tsx";
import {useState} from "react";

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const {data, isLoading} = useQuery({
        queryKey: ['journeys', currentPage, limit],
        queryFn: async () => {
            const response = await axios.get<JourneyResponse>(`${import.meta.env.VITE_BACKEND_URL}/journeys?page=${currentPage}&limit=${limit}`);
            return response.data
        },
    })

    if (isLoading || !data?.data) {
        return <div >Loading...</div>
    }

    const totalPages = data?.meta?.totalPages || 1;

    return (
        <>
            <JourneysTable
                journeys={data.data}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    )
}

export default App
