import { getMessagingToken, requestPermission } from '../sw/sw-helper'

const notificationInput = document.getElementById('notification-toggle')

export async function registerNotificationHandlers (db, Api) {
    const settings = await db.settings.local.read()
    if (settings?.notifications) {
        notificationInput.checked = true
        if (settings.key !== (await getMessagingToken())) {
            const sources = await db.sources.read()
            const sourceIdList = sources.map((source) => source.id)
            await Api.Subscription.unsubscribe(sourceIdList, settings.key)
            await Api.Subscription.subscribe(sourceIdList, await getMessagingToken())
        }
    }

    notificationInput.addEventListener('change', async (e) => {
        const settings = await db.settings.local.read()

        if (e.target.checked) {
            await enableNotifications()
        }
        else {
            await disableNotifications()
        }

        db.settings.local.set({
            ...settings,
            notifications: e.target.checked,
            key: await getMessagingToken()
        })
    })

    async function enableNotifications () {
        try {
            notificationInput.disabled = true
            if (Notification.permission !== 'granted') {
                await requestPermission()
            }
            const sources = await db.sources.read()
            await Api.Subscription.subscribe(
                sources.map((source) => source.id),
                await getMessagingToken()
            )
            notificationInput.checked = true
        }
        catch (e) {
            notificationInput.checked = false
        }
        notificationInput.disabled = false
    }

    async function disableNotifications () {
        try {
            notificationInput.disabled = true
            const sources = await db.sources.read()
            await Api.Subscription.unsubscribe(
                sources.map((source) => source.id),
                await getMessagingToken()
            )
            notificationInput.checked = false
        }
        catch (e) {
            notificationInput.checked = true
        }
        notificationInput.disabled = false
    }
}
