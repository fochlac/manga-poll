import * as admin from 'firebase-admin'
import { join, resolve } from 'path'
import fetch from 'node-fetch'

admin.initializeApp({
    credential: admin.credential.cert(resolve(join(__dirname, '../firebase-credentials.json')))
})

console.log(
    process.env.MANGA_GAPI_SERVER_KEY?.length
        ? `GAPI Server key: ${process.env.MANGA_GAPI_SERVER_KEY.slice(
            0,
            10
        )}*********${process.env.MANGA_GAPI_SERVER_KEY.slice(-10)}`
        : 'No GAPI Server key.'
)

async function getTopicSubscriptions (token) {
    if (!process.env.MANGA_GAPI_SERVER_KEY?.length) {
        return []
    }
    const headers = { authorization: `key=${process.env.MANGA_GAPI_SERVER_KEY}`, accept: 'application/json' }
    const response = await fetch(`https://iid.googleapis.com/iid/info/${token}?details=true`, { headers })
    const body = await response.json()
    if (response.status !== 200) {
        console.log('Error fetching token list: ' + JSON.stringify(body))
        return []
    }
    return Object.keys(body?.rel?.topics || {})
}

const timeouts = {}
export function sendTopicMessage (topic) {
    clearTimeout(timeouts[topic])

    // timeouts[topic] = setTimeout(() => {
    //     console.log('sendTopicMessage', topic)
    //     const payload = {
    //         data: {
    //             type: 'UPDATE_CHAPTER',
    //             sourceId: topic
    //         }
    //     }
    //     admin.messaging().sendToTopic(topic, payload, { priority: 'high' })
    // }, 100)
}

export function subscriptionsController (app) {
    app.post('/api/subscriptions', async (req, res) => {
        const { topics, key } = req.body

        if ((typeof topics !== 'string' && !Array.isArray(topics)) || typeof key !== 'string') {
            return res.status(400).json({ valid: false })
        }

        const newTopics: string[] = Array.isArray(topics) ? topics : [topics]

        const oldTopics = await getTopicSubscriptions(key)

        const subscribe = newTopics.filter((topic) => !oldTopics.includes(topic))
        const unsubscribe = oldTopics.filter((topic) => !newTopics.includes(topic))

        try {
            if (subscribe.length) {
                await Promise.all(subscribe.map((topic) => admin.messaging().subscribeToTopic([key], topic)))
            }
            if (unsubscribe.length) {
                await Promise.all(subscribe.map((topic) => admin.messaging().unsubscribeFromTopic([key], topic)))
            }
            console.log(
                (subscribe.length && `Subscribed ${subscribe.length} topics`) || '',
                (unsubscribe.length && `Unsubscribed ${unsubscribe.length} topics`) || ''
            )
            res.status(200).json({ valid: true })
        }
        catch (err) {
            console.log('error subscribing to topics', err)
            res.status(400).json({ valid: false })
        }
    })

    app.delete('/api/subscriptions', async (req, res) => {
        const { topics, key } = req.body

        const deleteTopics: string[] = Array.isArray(topics) ? topics : [topics]
        const oldTopics = await getTopicSubscriptions(key)
        const unsubscribe = (oldTopics.length && oldTopics) || deleteTopics

        try {
            await Promise.all(unsubscribe.map((topic) => admin.messaging().unsubscribeFromTopic([key], topic)))
            console.log((unsubscribe.length && `Unsubscribed from ${unsubscribe.length} topics.`) || '')
            res.status(200).json({ valid: true })
        }
        catch (err) {
            console.log('error unsubscribing from topics', unsubscribe, err)
            res.status(400).json({ valid: false })
        }
    })
}
