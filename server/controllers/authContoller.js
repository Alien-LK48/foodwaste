import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import usermodel from '../models/usermodel.js'
import transporter from '../config/nodeMailer.js'
import { format } from 'date-fns';
export const register = async (req, res) => {
    const { name, email, password, phone, role, roletype, teamMember, ngoRegNum, area, address } = req.body;
    console.log("Received Data:", { name, email, password, phone, role, address });
    try {
        const existinguser = await usermodel.findOne({ email });
        if (existinguser) {
            return res.json({
                success: false,
                message: `user already exists`
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        let user;
        const imagePath = req.file?.filename;
        if (role === "user") {
            user = new usermodel({
                name,
                email,
                password: hashedpassword,
                phone,
                address,
                isUser: true,
                isAdmin: false,
                isNgo: false,
                isDonor: false,
                roletype: `user`,
                image: imagePath,
            });
        } else if (role === "ngo") {
            user = new usermodel({
                name,
                email,
                password: hashedpassword,
                phone,
                isUser: false,
                isAdmin: false,
                isNgo: true,
                isDonor: false,
                ngoRegNum,
                area,
                address,
                teamMember,
                roletype
            });
        }
        else if (role === "donor") {
            user = new usermodel({
                name,
                email,
                password: hashedpassword,
                phone,
                address,
                isUser: false,
                isAdmin: false,
                isNgo: false,
                isDonor: true,
                roletype
            });
        }
        else {
            return res.json({
                success: false,
                message: `invalid role ${role}`
            });
        }
        await user.save();
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Website",
            text: `Welcome to our site! You have registered with ${email}.`
        };
        await transporter.sendMail(mailOptions);

        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({
            success: false,
            message: `missing details`
        })
    }
    try {
        const user = await usermodel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: `no user found with email ${email}`
            })
        }
        const isPasswordmatched = await bcrypt.compare(password, user.password)

        if (!isPasswordmatched) {
            return res.json({
                success: false,
                message: `invalied password`
            })
        }
        if (user.isBanned) {
            return res.json({
                success: false,
                message: `account suspended`
            })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: `7d` })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === `production`,
            sameSite: process.env.NODE_ENV === `production` ? `none` : `strict`,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === `production`,
            sameSite: process.env.NODE_ENV === `production` ? `none` : `strict`,
        })
        return res.json({
            success: true,
            message: `logged out`
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const sendVerifyOTP = async (req, res) => {
    try {
        const { userid } = req.body
        const user = await usermodel.findById(userid)
        if (user.isVarified) {
            return res.json({
                success: false,
                message: `account already verified`
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verificationOtp = otp
        user.verificationOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000 // 1d

        const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const expiryTime = format(new Date(user.verificationOtpExpireAt), "yyyy-MM-dd HH:mm:ss");

        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `accout varification otp`,
            text: `Your OTP is ${otp}. It is valid from ${currentTime} to ${expiryTime}.`
        }
        await transporter.sendMail(mailOptions)
        return res.json({
            success: true,
            message: `verification message sent on ${user.email}`
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
export const NGOverifier = async (req, res) => {
    try {
        const { id } = req.body
        const user = await usermodel.findById(id)
        if (user.isVarified) {
            return res.json({
                success: false,
                message: `account already verified`
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verificationOtp = otp
        user.verificationOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const expiryTime = format(new Date(user.verificationOtpExpireAt), "yyyy-MM-dd HH:mm:ss");

        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `Account varification otp`,
            text: `Hello ${user.name}, your verification for ${user.roletype} is approved! Your OTP is ${otp}. Please use it to verify your account. It is valid from ${currentTime} to ${expiryTime}. Ensure secure usage!`
        }
        await transporter.sendMail(mailOptions)
        return res.json({
            success: true,
            message: `verification message sent on ${user.email}`
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const verifyEmail = async (req, res) => {
    const { userid, otp } = req.body
    if (!userid || !otp) {
        return res.json({
            success: false,
            message: `missing details`
        })
    }
    try {
        const user = await usermodel.findById(userid)
        if (!user) {
            return res.json({
                success: false,
                message: `missing user`
            })
        }
        if (user.verificationOtp === `` || user.verificationOtp !== otp) {
            return res.json({
                success: false,
                message: `invalied otp`
            })
        }
        if (user.verificationOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: `opt expired`
            })
        }
        user.isVarified = true
        user.verificationOtp = ``
        user.verificationOtpExpireAt = 0

        await user.save()
        return res.json({
            success: true,
            message: `email verified succesfully`
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const isAuthed = async (req, res) => {
    try {
        return res.json({
            success: true,
            message: `account authticated`
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const sendResetOTP = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.json({
            success: false,
            message: `email require`
        })
    }
    try {
        const user = await usermodel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: `user not found`
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000 // 15 min

        const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const expiryTime = format(new Date(user.resetOtpExpireAt), "yyyy-MM-dd HH:mm:ss");

        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `password reset OTP`,
            text: `Your OTP is ${otp}. It is valid from ${currentTime} to ${expiryTime}. (15 mins)`
        }
        await transporter.sendMail(mailOptions)
        return res.json({
            success: true,
            message: `otp sent to email`
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const resetpassword = async (req, res) => {
    const { email, otp, newPassword } = req.body
    if (!email || !otp || !newPassword) {
        return res.json({
            success: false,
            message: `data requied`
        })
    }
    try {
        const user = await usermodel.findOne({ email })
        if (!user) {
            res.json({
                success: false,
                message: `no user found`
            })
        }
        if (user.resetOtp === `` || user.resetOtp !== otp) {
            return res.json({
                success: false,
                message: `invalied otp`
            })
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: `otp expired`
            })
        }
        const hashedpassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedpassword
        user.resetOtp = ``
        user.resetOtpExpireAt = 0
        await user.save()
        return res.json({
            success: true,
            message: `password reset succesfully`
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}