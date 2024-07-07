import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

export function useSafeState (defaultValue) {
    const [value, setter] = useState(defaultValue)
    const isMounted = useRef(true)
    const safeSetter = useCallback((update) => isMounted.current && setter(update), [isMounted, setter])

    useEffect(
        () => () => {
            isMounted.current = false
        },
        []
    )

    return [value, safeSetter]
}
