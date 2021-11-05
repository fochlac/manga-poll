export const adminUrl = (req, res, next) => {
    const { authentication } = req.headers
    if (authentication === 'Ich darf das!') {
        next()
    }
    else {
        console.log(`Rejected ${req.method} request for ${req.originalUrl} - bad password.`)
        res.status(401).json({ valid: false })
    }
}
