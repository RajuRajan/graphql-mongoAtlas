const ResetPassword = require("../../models/resetPassword")
const User = require("../../models/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

module.exports = {
    forgotPassword: async (args,req) => {
        const {userId ,isAuth} = req
        if(!isAuth){
            return
        }
        try { 
            const randomKey = Math.floor(100000 + Math.random() * 900000)
            const res = await ResetPassword.create({
                userId,
                secretKey: randomKey,
                expiresAt: 1
            })
            return {status:"Mailed"}
        } catch (err) {
            throw err
        }
    },
    checkSecretKey: async(args ,req) => {
        if(!isAuth){
            return
        }
        try {
            const reset = await ResetPassword.findOne({userId: req.userId})
            if(reset.secretKey === args.secretKey){
                return {...reset , status:"MATCHED", isMatched:true}
            }
            return {status:"NOT MATCHED", isMatched:false}
        } catch (err) {
            throw err
        }
    },
    resetPassword: async(args,req) => {
        if(!isAuth){
            return
        }
        try { 
            const reset = await ResetPassword.findOne({userId: req.userId, expiresAt:1})
            if(reset.secretKey === args.secretKey){
                const filter = { _id: req.userId };
                const hashedPass = await bcrypt.hash(args.password ,12);

                const update = { password: hashedPass};
                const user = await User.updateOne(filter, update)
                return {status:"PASSWORD CHANGED", isMatched: true, isPasswordChanged: true}
            }
            return {status:"PASSWORD NOT CHANGED", isMatched: false, isPasswordChanged: false}
        } catch (err) {
            throw err
        }
    }
}