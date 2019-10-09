const Booking = require('../models/Booking')

module.exports = {

    async store(req, res) {

        const {user_id} = req.headers;
        const {spot_id} = req.params;
        const {date} = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        // cria relacionamento entre as collections
        await booking.populate('spot').populate('user').execPopulate();

        // envia informação para o frontend de quem solicitou um agendamento no spot
        const ownerSocket = req.connectedUsers[booking.spot.user];
        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);

    }

};
