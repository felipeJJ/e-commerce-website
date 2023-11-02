import { useEffect, useState } from "react"

export function useLocalStorage<T>(item: string, initialValue: T){
    const [value, setValue] = useState<T>(initialValue)
 
    useEffect(() => {
        if (typeof window === 'undefined') return
        let value = localStorage.getItem(item)
        if(value) setValue(JSON.parse(value))
 
        const storageEventHandler = (event: StorageEvent) => {
            if (event.key === item) {
                setValue(JSON.parse(event.newValue || '{}'))
                console.log('Storage')
            }
            console.log('Storage')

        }
        window.addEventListener("storage", storageEventHandler)
 
        return () => {
            window.removeEventListener("storage", storageEventHandler)
        }
    }, [item])
 
    const updateLocalStorage = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(item,JSON.stringify(newValue))
    }
 
    return {
        value,
        updateLocalStorage
    }
 }
 