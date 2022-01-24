const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res, next) {
    const take = req.query.take ? parseInt(req.query.take) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 10;

    const movies = await prisma.movies.findMany({
        skip,
        take: take,
    });

    // get paginated movies count
    const total = movies.length;

    res.status(200).send({
        data: movies,
        pagination: {
            count: total, // Total des enregistrements
            take: take, // Nombre d'éléments sélectionnés
            skip: skip // Décalage à partir duquel on prend les  données
        }
    });

});


module.exports = router;