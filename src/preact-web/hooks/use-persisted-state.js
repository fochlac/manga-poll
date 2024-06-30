import { useEffect, useRef, useState } from 'preact/hooks'

export function usePersistedState (uniqueId, defaultValue) {
    const key = useRef(`persisted-state_${uniqueId}`)
    const [value, setter] = useState(() => localStorage.getItem(key.current) ?? defaultValue)

    useEffect(() => {
        localStorage.setItem(key.current, value)
    }, [value])

    return [value, setter]
}
