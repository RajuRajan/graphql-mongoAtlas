const Event = require("../../models/event")
const User = require("../../models/user")

module.exports =   {  
events: async ()=>{ 
    try {
        const events = await Event.find().populate('creator')
        return [...events]
    } catch(err) {
      throw err;
   }
},
createEvent: async (args, req) =>{
    if (!req.isAuth){
        throw new Error("Unauthenticated")
    }
    try {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: "5ed6885e1bd8987bcd76dee8"
        })
        const eventRes = await event.save()
            const user = await User.findById("5ed6885e1bd8987bcd76dee8")
                if(!user){
                        throw new Error('User not found');
                }
                user.createdEvents.push(event);
            const res = await user.save()
        return {...eventRes._doc, _id: eventRes.id, ...res}
    } catch(err) {
        throw err;
    }
}
}