import firebase from 'firebase/app'

export async function setupActiveSync () {
    const registration = await navigator.serviceWorker.ready
    const tags = await registration.periodicSync.getTags()
    if (!tags.include('fetch-chapters')) {
        await registration.periodicSync.register('fetch-chapters', {
            minInterval: 15 * 60 * 1000
        })
    }
}

export async function getMessagingToken () {
    const messaging = firebase.messaging()
    const token = await messaging.getToken({
        vapidKey: 'BO2OnbETEFn567QTHeUGSKMndo15F6tR2rELUZkIyZ4xjTm-rd-Q5rGaA6tGiIkEGJbTz-OHrvjtK_la0xESXnU',
        serviceWorkerRegistration: await navigator.serviceWorker.getRegistration('./sw.js')
    })
    return token
}

export function requestPermission () {
    return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.')
        }
        else {
            console.log('Unable to get permission to notify.')
        }
    })
}
