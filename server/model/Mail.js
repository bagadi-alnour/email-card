const mongoose = require('mongoose');


let MailSchema = new mongoose.Schema(
    {

        emailBody: {
            type: String,
            required: true
        },
        sender: {
            type: String,
            required: true,
            lowercase: true

        },
        receivers: {
            type: Array,
            required: true
        },
        subject: {
            type: String,
            required: true,
            lowercase: true
        },
        imageUrl: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const Mail = mongoose.model('mail', MailSchema);
module.exports = Mail;

