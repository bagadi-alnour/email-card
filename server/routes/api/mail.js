const express = require('express');
const Mail = require('../../model/Mail')
const router = express.Router();
const {MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE} = require("../../config/keys")


router.post('/', async (req, res) => {
    const {values: {sender, emailBody, subject, imageUrl}, tags} = req.body;

    let mailjetRes;
    let emails = []
    const receivers = []
    tags.forEach(tag => {
        emails.push(tag)
    });
    tags.forEach(tag => {
        receivers.push({"Email": tag, Name: tag})
    });

    try {

        const mailjet = require('node-mailjet').connect(
            MJ_APIKEY_PUBLIC,
            MJ_APIKEY_PRIVATE
        )
        const request = mailjet.post('send').request({
            FromEmail: sender,
            FromName: sender,
            Subject: subject,
            'Text-part':
                '',
            'Html-part':
                `<p>${emailBody}</p>
            <h3>Dear passenger, welcome to Indigen</h3>
            <img src=${imageUrl} width="400" height="300"  alt="email attached"/><br />
            <p>Cordialement</p>
           <p>Bagadi</p>`,
            Recipients: receivers
        })
        request.then(result => {
            mailjetRes = result.body.message
        }).catch(err => {
            mailjetRes = err.statusCode
        })


        const email = new Mail({
            "receivers": emails,
            sender,
            tags,
            subject,
            emailBody,
            imageUrl
        })
        await email.save();
        return res.json(email);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error");
    }
})


module.exports = router;
