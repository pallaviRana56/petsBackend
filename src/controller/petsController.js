const petsModel = require("../models/petsModels");



exports.createpets = async (req, res) => {

    try {
        const pets = req.body

        if (Object.keys(pets).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide Pets details" });
        }

        const { title, description, price, userId, picture, offer, categories, delivery, rating, specifications } = pets;

        if (!title) return res.status(400).send({ msg: " title is required " });
        if (!description) return res.status(400).send({ msg: "description is required " });
        if (!userId) return res.status(400).send({ msg: "userId is required " });
        if (!price) return res.status(400).send({ msg: " price is required " });
        if (!picture) return res.status(400).send({ msg: " picture is required " });
        if (!categories) return res.status(400).send({ msg: " categories is required " });
        if (!delivery) return res.status(400).send({ msg: " delivery is required " });
        if (!specifications) return res.status(400).send({ msg: " specifications is required" });
        if (!rating) return res.status(400).send({ msg: " rating is required" });


        let petCreated = await petsModel.create(pets)

        return res.status(201).send({ status: true, data: petCreated })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

exports.getAllpets = async (req, res) => {

    try {
        const filter = req.params.category;

        if (filter == 'AllBlogs') {
            const AllData = await petsModel.find({ isDeleted: false }).sort({ _id: -1 });
            return res.status(200).send({ msg: "Get Succ",Data:AllData })
        }
        else {
            const getData = await petsModel.find({ categories: filter, isDeleted: false }).sort({ _id: -1 });
            if (!getData) return res.status(404).send({ msg: " Not blogs Presents" });
            return res.status(200).send({ msg: getData })
        }
    }
    catch (error) { return res.status(500).send({ msg: error.message }) }
}

// //<----------------This API used for Fetch Blogs of Logged in Author----------->//
exports.getpetsData = async (req, res) => {
    try {
        let id = req.params.getPetsId;
        

        if (!id) return res.status(400).send({ status: false, msg: "id is required" })

        let data = await petsModel.find({ _id: id, isDeleted:false })

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "No Blogger Present in DataBase" });
        }
        return res.status(200).send({ msg: data })

    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}

// exports.updateBlog = async function (req, res) {
    // try {

    //     const Blogdata = req.body;

    //     const {picture, title, description } =Blogdata;

    //     let inputId = req.params.blogId;
    //     console.log(inputId);

    //     let data = await petsModel.findOne({ _id: inputId })


    //     if (!data) return res.status(400).send({ msg: "Blog is Not Presents" })

    //     let blogs = await petsModel.findOneAndUpdate({ _id: inputId },
    //         {
    //             $set: {picture:picture, title: title, description: description }     
    //         },
    //         { new: true })

    //     return res.status(200).send({ msg: blogs })
    // }
    // catch (error) {
    //     return res.status(500).send({ msg: error.message })
    // }



exports.updatePets = async function (req, res) {
    try {

        const Blogdata = req.body;

        const {picture, title, description,} =Blogdata;

        let inputId = req.params.blogId;

        let data = await petsModel.findOne({ _id: inputId })


        if (!data) return res.status(400).send({ msg: "Blog is Not Presents" })

        let blogs = await petsModel.findOneAndUpdate({ _id: inputId },
            {
                $set: {picture:picture, title: title, description: description }     
            },
            { new: true })

        return res.status(200).send({ msg: blogs })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}



exports.deleteBlog = async function (req, res) {
    try {
        
        let inputId = req.params.petId
    
        let date = new Date();

        let data = await petsModel.findOneAndUpdate({ _id: inputId },
            { $set: { isDeleted: true, deletedAt: date } },
            { new: true })

        if (!data) return res.status(404).send({ msg: "no data found" })

        return res.status(200).send({ status: true, msg: data })

    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}