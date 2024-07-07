import { useState } from 'preact/hooks'
import { getMessagingToken, requestPermission } from '../../utils/sw'
import { useDispatch, useSelector } from '../../utils/atom'
import { ToggleSwitch } from '../atoms/ToggleSwitch'
import { H6 } from '../atoms/Typography'

export function NotificationsToggle () {
    const { settings } = useSelector(({ settings }) => ({ settings }))
    const [disabled, setDisabled] = useState(false)
    const [checked, setChecked] = useState(settings?.notifications)
    const dispatch = useDispatch()

    async function setNotifications (enabled) {
        try {
            setDisabled(true)
            if (enabled && Notification.permission !== 'granted') {
                await requestPermission()
            }
            await dispatch(
                enabled ? 'subscribeNotifications' : 'unsubscribeNotifications',
                await getMessagingToken()
            )
            setChecked(enabled)
        }
        catch (e) {
            console.log(e)
            setChecked(!enabled)
        }
        setDisabled(false)
    }

    return (
        <div>
            <H6>Notifications</H6>
            <ToggleSwitch
                disabled={disabled}
                label="Enable Notifications"
                checked={checked}
                onChange={() => setNotifications()}
            />
        </div>
    )
}
