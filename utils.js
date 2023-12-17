
const { Stream, CheckIn } = require('./db.js');

async function checkAttendance(user, streamer) {
    try {
        const currentStream = await Stream.findOne({
            where: {
                userId: streamer.id,
                isLive: true,
            },
        });

        if (!currentStream) {
            return;
        }

        const existingAttendance = await CheckIn.findOne({
            where: {
                streamId: 1,
                userId: user.id,
            },
        });

        if (!existingAttendance) {
            const lastStream = await Stream.findOne({
                where: {
                    userId: 1,
                    isLive: false,
                },
                order: [['id', 'DESC']],
            });
            const existingStreak = await CheckIn.findOne({
                where: {
                    streamId: lastStream.id,
                    userId: user.id,
                },
            });
            let streak = 0;
            if (existingStreak) {
                streak = existingStreak.streak + 1;
            }
            await CheckIn.create({
                streamId: currentStream.id,
                userId: user.id,
                streak: streak
            });
        }
    } catch (error) {
        console.error('Error checking/adding attendance:', error);
    }
}


module.exports = {
    checkAttendance
}