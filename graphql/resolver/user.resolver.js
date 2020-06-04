const User = require("../../models/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

module.exports = {
    createUser: async (args) =>{
        try{
            if(req.isAuth){
                return
            }
            const isUserExists = await User.findOne({email:args.userInput.email})
                if(isUserExists){
                throw new Error('User exists already');
                }
                const hashedPass = await bcrypt.hash(args.userInput.password ,12);
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPass
                    })
                const result = await user.save();
            return {...result._doc , password: null}
        } catch (err) {
            throw err;
        }
    },
    users: async () => {
        try{
            const res = await User.find().populate('createdEvents')
            return [...res]
        } catch (err) {
            throw err;
        }
    },
    login: async ({email,password}) => {
        try{
            const user = await User.findOne({email})
            if(!user){
                throw new Error("User Not Found")
            }
            const isEqual = await bcrypt.compare(password, user.password)
            if(!isEqual){
                throw new Error("Password Incorrect")
            }
            const token = jwt.sign({userId: user.id, email: user.email}, 'secret',{
                expiresIn: "1h"
            })
            return {userId: user.id, token, tokenExpiration: 1}

        } catch (err){
            throw err;
        }

    }
}