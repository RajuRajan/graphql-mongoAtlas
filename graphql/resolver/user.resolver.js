const User = require("../../models/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

module.exports = {
    createUser: async (args) =>{
        try{
            const isUserExists = await User.findOne({email:args.userInput.email})
                if(isUserExists){
                throw new Error('User exists already');
                }
                const hashedPass = await bcrypt.hash(args.userInput.password ,12);
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPass,
                        firstName: args.userInput.firstName,
                        lastName: args.userInput.lastName,
                        phoneNo: args.userInput.phoneNo,
                        telephoneNo: args.userInput.telephoneNo,
                        email: args.userInput.email,
                        roleId: args.userInput.roleId,
                        countryId: args.userInput.countryId,
                        cityId: args.userInput.cityId,
                        designationId: args.userInput.designationId,
                        dob: args.userInput.dob
                    })
                const result = await user.save();
            return {...result._doc , password: null}
        } catch (err) {
            throw err;
        }
    },
    users: async () => {
        try{
            const res = await User.find()
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