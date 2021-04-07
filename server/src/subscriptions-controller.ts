import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert('../firebase-credentials.json')
})

const timeouts = {}
export function sendTopicMessage (topic) {
    clearTimeout(timeouts[topic])

    timeouts[topic] = setTimeout(() => {
        admin.messaging().send({
            data: {
                type: 'UPDATE_CHAPTER',
                sourceId: topic
            },
            topic
        })
    }, 100)
}

export function subscriptionsController (app) {
    app.post('/api/subscriptions', async (req, res) => {
        const { topics, key } = req.body

        if ((typeof topics !== 'string' && !Array.isArray(topics)) || typeof key !== 'string') {
            return res.status(400).json({ valid: false })
        }

        const newTopics: string[] = Array.isArray(topics) ? topics : [topics]

        try {
            await Promise.all(newTopics.map((topic) => admin.messaging().subscribeToTopic([key], topic))) 
            res.status(200).json({ valid: true })
        }
        catch(err) {
            console.log('error subscribing to topics', err)
            res.status(400).json({ valid: false })
        }
    })

    app.delete('/api/subscriptions', async (req, res) => {
        const { topics, key } = req.body

        if ((typeof topics !== 'string' && !Array.isArray(topics)) || typeof key !== 'string') {
            return res.status(400).json({ valid: false })
        }

        const newTopics: string[] = Array.isArray(topics) ? topics : [topics]

        try {
            await Promise.all(
                newTopics.map((topic) => admin.messaging().unsubscribeFromTopic([key], topic))
            ) 
            res.status(200).json({ valid: true })
        }
        catch(err) {
            console.log('error subscribing to topics', err)
            res.status(400).json({ valid: false })
        }
    })
}
