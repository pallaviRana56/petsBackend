const feedback = require('../models/feedback');

exports.createfeedback = async (req, res) => {
    try {
        const feed = req.body;
        const { name, email, message } = feed;

        const validName = /^[a-zA-Z ]+$/;
        let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        

 
        if (Object.keys(feed).length == 0) return res.status(400).send({ status: false, message: "Body is empty can't craeate data" })
        if (!name) return res.status(400).send({ status: false, message: "Pls Provided Name" })
        if (name.trim() == 0 || validName.test(name) == false)  return res.status(400).send({ status: false, message: "Enter a valid Name" })
        if (!email) return res.status(400).send({ status: false, message: "Pls Provided emailId" })
        if (email.trim() == 0 || validEmail.test(email) == false) return res.status(400).send({ status: false, message: "Enter a valid EmailId" })
        if (!message) return res.status(400).send({ status: false, message: "Pls Provided Name" })
        
            let feedData = await feedback.create(feed);
        res.status(201).send({ status: true, msg: "feedback created successfully", data: feedData })

        }
        catch (error) {
            return res.status(500).send({ msg: error.message })
        }
}