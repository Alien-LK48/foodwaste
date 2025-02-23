import usermodel from "../models/usermodel.js"

const isBanned = (req, res, next) => {
    const { email } = req.body

    usermodel.findOne({ email })
        .then(user => {
            if (user && user.isBanned) {
                return res.json({
                    success: false,
                    message: 'Account suspended'
                })
            }
            next()
        })
        .catch(error => {
            res.json({
                success: false,
                message: error.message
            })
        })
}

export default isBanned;
