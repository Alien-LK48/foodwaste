import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.json({
            success: false,
            message: `not authorized login again`
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decodedToken.id) {
            req.body.userid = decodedToken.id
        }
        else {
            return res.json({
                success: false,
                message: `not authorized login again`
            })
        }
        next()
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default userAuth