import usermodel from '../models/usermodel.js'

export const getuserdata = async (req, res) => {
    try {
        const { userid } = req.body
        const user = await usermodel.findById(userid)
        if (!user) {
            return res.json({
                success: false,
                message: `user not found`
            })
        }
        res.json({
            success: true,
            message: `got user`,
            userData: {
                user: user
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}