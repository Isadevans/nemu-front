import './App.css'
import {useQuery} from "@tanstack/react-query";
import axios from "axios"
import type {JourneyResponse} from "@/types/response.ts";
import JourneysTable from "@/components/JourneysTable.tsx";

function App() {
    const {data, isLoading} = useQuery({
        queryKey: ['journeys', 1, 10],
        queryFn: async () => {
            const response = await axios.get<JourneyResponse>(`${import.meta.env.VITE_BACKEND_URL}/journeys?page=1&limit=10`);
            return response.data
        }
    })
    if (isLoading || !data?.data) {
        return <div>Loading...</div>
    }
    return (
        <>
            <JourneysTable journeys={data?.data}/>
        </>
    )
}

export default App
