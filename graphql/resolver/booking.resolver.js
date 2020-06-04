const Event = require("../../models/event")
const Booking = require("../../models/booking")

const singleEvent = async eventId => {
    try{
        
        const event = await Event.findOne({creator: eventId}).populate('creator')
        return {...event._doc}
    } catch (err){
        throw err;
    }
}

module.exports = {
    bookings: async ()=> {
        try{
           const bookings = await Booking.find().populate('user')
           return bookings.map(booking =>{
               return {
                        ...booking._doc,
                        _id: booking.id,
                        event: singleEvent.bind(this, booking._doc.user),
                        createdAt: booking.createdAt,
                        updatedAt: booking.updatedAt
                    }
           })
        } catch(err){
            throw err;
        }
    },
    bookEvent: async args =>{
        try{
            const fetchedevent = await Event.findOne({ _id: args.eventId });
            const booking = new Booking({
                user:"5ed6885e1bd8987bcd76dee8",
                event: fetchedevent
    
            })
            const res = await booking.save();
            return {
                ...res._doc,
                _id: res.id,
                event: singleEvent.bind(this, booking._doc.event)
            }
        } catch (err) {
            throw err;
        }

    },
    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = { ...booking._doc };
            await Booking.deleteOne({ _id: args.bookingId})
            return event
        } catch (err) {
            throw err;
        }

    }
}