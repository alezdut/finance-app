const { Router } = require('express');
const router = Router();
const { Operation, User } = require("../src/db");
const passport = require("passport");

//operations routes
// route for post new operation
router.post('/new', async (req, res) => {
    var { concept, amount, category, type, date, UserId } = req.body;
    try {
        if (concept && amount && type && date && UserId) {
            const ope = await Operation.create(
                {
                    concept: concept,
                    amount: amount,
                    category: category,
                    type: type,
                    date: date,
                    UserId: UserId
                }
            )
            res.status(201).json(ope);
        } else {
            res.status(400).json({ Error: "there are missing parameters" });
        }
    }
    catch {
        err => {
            res.status(400).json(err)
        }
    }
})


//route for edit operation
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { concept, amount, date, category } = req.body;
    const edit = await Operation.findOne({ where: { id } });
    edit.update({
        concept,
        amount,
        date,
        category
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
        else return res.status(201).json({ success: true });
    }).catch(err => {
        console.log(err.message)
    })
})

//route for get all operations
router.get("/all/:id", (req, res) => {
    const UserId = req.params.id;
    Operation.findAll({ where: { UserId } }).then(r => {
        res.status(201).json(r);
    })
})
//get an operation by id
router.get("/operation/:id", (req, res) => {
    const id = req.params.id;
    Operation.findOne({ where: { id } }).then(r => {
        res.status(201).json(r);
    })
})
//route to get all operations by category name
router.get("/all/:category", (req, res) => {
    const category = req.params.category;
    const UserId = req.body.id;
    if (category === "all") {
        Operation.findAll({ where: { UserId } }).then(r => {
            res.status(201).json(r)
        }).catch(err => {
            console.log(err.message)
        })
    }
    else {
        Operation.findAll({ where: { category } })
            .then(r => {
                res.status(201).json(r)
            }).catch(err => {
                console.log(err.message)
            })
    }

})
// route to get the balance of an user
router.get("/balance/:id", (req, res) => {
    const UserId = req.params.id;
    var bal = 0
    Operation.findAll({ where: { UserId } })
        .then(r => {
            r.map(o => {
                if (o.type === "add") {
                    bal += o.amount;
                }
                else {
                    bal -= o.amount
                }
            })
            res.status(200).json(bal)
        })
})
//user routes
//route to add a new user
router.post("/user", (req, res) => {
    const { name, email, password } = req.body;
    User.create({
        name,
        balance: 0,
        email,
        password
    }).then(r => {
        res.status(200).json(r);
    }).catch(err => {
        res.status(500).send(err.message)
    })
})
// login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(201).send(req.user["dataValues"]);
});
// logout route
router.post("/logout", (req, res) => {
    req.logout();
    res.status(201).send("Usuario deslogueado");
});

// exports
module.exports = router;