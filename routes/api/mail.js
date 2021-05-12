const express = require('express');
const Mail = require('../../model/Mail')
const router = express.Router();
const {MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE} = require("../../config/keys")

router.post('/', async (request, response) => {
    const {sender, receiver, emailBody, subject, imageUrl} = request.body;


    let mailjetRes = []
    try {
        email = new Mail({sender, receiver, emailBody, subject, imageUrl})

        const mailjet = require('node-mailjet').connect(
            MJ_APIKEY_PUBLIC,
            MJ_APIKEY_PRIVATE
        )
        const request = mailjet.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: {
                        Email: sender,
                        Name: sender,
                    },
                    To: [
                        {
                            Email: receiver,
                            Name: receiver
                        },
                    ],
                    Subject: subject,
                    TextPart: "hello ther is where is going to be",
                    HTMLPart:
                        `<p>${emailBody}</p>
                        <img src=${imageUrl} alt="email attached" width="400" height="300"/><br> <p>Bonne journée <br/>Cordialement</p>`,
                },
            ],
        })
        request
            .then(result => {
                mailjetRes = result.body.messages
            })
            .catch(err => {
                console.log(err.statusCode)
            })

        await email.save();
        return response.json(mailjetRes)

    } catch (error) {
        response.status(500).send(error)
    }
})
module.exports = router;
