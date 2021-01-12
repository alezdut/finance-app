const { Router } = require('express');
const router = Router();
const { Operation, User } = require("../src/db");

//operations routes

// route for post new operation
router.post('/new', async (req, res) => {
    var { concept, amount, type } = req.body;
    if (concept && amount && type) {
        const ope = await Operation.create(
            {
                concept: concept,
                amount: amount,
                type: type,
            }
        )
        res.status(201).json(ope);
    } else {
        res.status(400).json({ Error: "there are missing parameters" });
    }
})

//route for edit operation
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { concept, amount } = req.body;
    const edit = await Operation.findOne({ where: { id } });
    edit.update({
        concept,
        amount
    }).then(r => {
        res.status(200).json(r);
    }).catch(err => {
        console.log(err.message);
    })
})

//route for delete an operation
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Operation.destroy({ where: { id } }).then((response) => {
        if (response === 0) return res.status(400).send("not found");
        else return res.status(201).send("success");
    }).catch(err => {
        console.log(err.message)
    })
})

//route for get all operations
router.get("/all", (req, res) => {
    Operation.findAll().then(r => {
        res.status(201).json(r);
    })
})

// exports
module.exports = router;