import firebase from 'firebase/app'

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
