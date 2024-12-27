import { useEffect, useState } from "react"

type Data<T> = T | null
type ErrorType = Error | null

interface useFetchReturn<T> {
    data: Data<T>
    loading: boolean
    error: ErrorType
}

const claveApi = import.meta.env.VITE_API_KEY

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${claveApi}`
    }
}

export const useFetch = <T>(url:string, params? : URLSearchParams) :useFetchReturn<T> => {
    const [data, setData] = useState<Data<T>>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ErrorType>(null) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newURL = new URL(url)
                newURL.search = params?.toString() || ''
                const response = await fetch(newURL, options)
                if(!response.ok) {
                    throw new Error(`Error fetching from: ${url}`)
                }
                const jsonData: T = await response.json()
                setData(jsonData)
                setError(null)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [url])

    return {data, loading, error}
}