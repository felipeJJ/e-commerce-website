import { useState } from "react"

  export function useLocalStorage<T>(item: string) {
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';
  
    // Recupera o valor do localStorage, ou define como null se estiver vazio ou indisponível
    const storedValue = isLocalStorageAvailable ? localStorage.getItem(item) : null;
    const initialValue = storedValue ? JSON.parse(storedValue) : null;
  
    const [value, setValue] = useState(initialValue);
  
    const updateLocalStorage = (newValue: T) => {
      if (isLocalStorageAvailable) {
        setValue(newValue);
        localStorage.setItem(item, JSON.stringify(newValue));
      }
    }
  
    return { value, updateLocalStorage };
  }
  