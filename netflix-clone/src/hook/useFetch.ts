import { useEffect, useState } from "react"

type Data<T> = T | null
type ErrorType = Error | null

interface useFetchReturn<T> {
    data: Data<T>
    loading: boolean
    error: ErrorType
}

export const useFetch = <T>(url:string) :useFetchReturn<T> => {
    const [data, setData] = useState<Data<T>>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ErrorType>(null) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
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