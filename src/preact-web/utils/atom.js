import { createContext } from 'preact'
import { useContext, useCallback, useState, useRef, useEffect } from 'preact/hooks'

const AtomContext = createContext()

export function Provider ({ children, atom }) {
    return (
        <AtomContext.Provider value={{ atom }}>
            {children}
        </AtomContext.Provider>
    )
}

function isObject (obj) {
    return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'
}

function differ (mappedProps, nextMappedProps) {
    if (mappedProps === nextMappedProps) {
        return false
    }
    if (!mappedProps || !nextMappedProps) {
        return true
    }
    if (!isObject(mappedProps) || !isObject(nextMappedProps)) {
        return true
    }
    for (const i in mappedProps) {
        if (mappedProps[i] !== nextMappedProps[i]) return true
    }
    for (const i in nextMappedProps) {
        if (!(i in mappedProps)) return true
    }
    return false
}

export function useActions () {
    const { atom } = useContext(AtomContext)
    return atom.actions
}

export function useDispatch () {
    const { atom } = useContext(AtomContext)
    return atom.dispatch
}

function invoke (ref) {
    if (ref.current) {
        ref.current()
        ref.current = null
    }
}

let i = 0
const nextOrder = () => ++i
export function useSelector (selectorFn) {
    const { atom } = useContext(AtomContext)

    if (!atom) {
        throw new Error('No atom found in context, did you forget to wrap your app in <Provider atom={atom} />?')
    }
    if (!selectorFn) {
        throw new Error('No selector defined.')
    }

    // cache the schedule and selector functions
    const schedule = useCallback((fn) => raf(fn)(), [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selector = useCallback(selectorFn, [])

    // we use a state to trigger a rerender when relevant atom
    // state changes, we don't store the actual mapped atom state
    // here, because that is only 1 of 2 ways that the component
    // gets rerendered, the other way is being rerended by parent
    const [, rerender] = useState({})

    // keep track of rendering order, this is important for:
    // - correctness – parent must rerender first
    // - performance – parent rerendering children should cancel children's scheduled rerenders
    const order = useRef()

    // keep last used props here for diffing upon each change
    const mappedProps = useRef()

    // for cancelling scheduled updates in case of parent renders
    const cancelUpdate = useRef(null)

    if (!order.current) {
        order.current = nextOrder()
    }

    // store current mapped state on each render
    // so we can diff when atom triggers callbacks
    mappedProps.current = selector(atom.get())

    // cancel any pending scheduled updates after each render
    // since we just go rerendered by the parent component
    invoke(cancelUpdate)

    useEffect(
        () => {
            // very important to check for this, since
            // our observe callback might have been removed
            // from the atom's listeners array while atom is
            // looping over the old list of listener references
            let didUnobserve = false

            const unobserve = atom.observe(onChange, order.current)

            // avoid race render/commit phase conditions
            // trigger this to check if atom's state change before
            // we managed to subscribe in this effect
            onChange()

            function onChange () {
                if (didUnobserve) return

                // take into account store updates happening in rapid sequence
                // cancel each previously scheduled one and reschedule
                invoke(cancelUpdate)

                // schedule an update
                cancelUpdate.current = schedule(() => {
                    cancelUpdate.current = null
                    const nextMappedProps = selector(atom.get())
                    if (differ(mappedProps.current, nextMappedProps)) {
                        rerender({})
                    }
                })
            }

            return function destroy () {
                didUnobserve = true
                unobserve()
                invoke(cancelUpdate)
            }
        },
        [atom, selector, schedule, order, mappedProps, cancelUpdate, rerender]
    )

    // always return fresh mapped props, in case
    // this is a parent rerendering children
    return mappedProps.current
}

function getRequestAnimationFrame () {
    if (typeof window === 'undefined') {
        return (callback) => callback()
    }

    const polyfill = (callback) => {
        return setTimeout(callback, 16)
    }

    return (
        window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || polyfill
    )
}

function getCancelAnimationFrame () {
    if (typeof window === 'undefined') {
        return () => { }
    }
    return window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout || (() => { })
}

function raf (fn) {
    const requestAnimationFrame = getRequestAnimationFrame()
    const cancelAnimationFrame = getCancelAnimationFrame()

    let requested = false
    let reqId

    return function rafed (...args) {
        if (!requested) {
            requested = true
            reqId = requestAnimationFrame(() => {
                if (requested) {
                    requested = false
                    fn(...args)
                }
            })
        }

        return function cancel () {
            cancelAnimationFrame(reqId)
            requested = false
        }
    }
}
