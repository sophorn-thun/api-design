import prisma from "../db"

// Get all updates 
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json()
}

// Get one update 
export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id
        }
    })
    res.json({data: update})
}

// Create update
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.id
        }
    })

    if (!product) {
        return res.json({ message: 'Invalid product'})
    }

    const update = await prisma.update.create({
        data: req.body
    })

    res.json({data: update})
}

// Update update
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.json({message: 'No update matched'})
    }
    
    const updateUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updateUpdate})
}

// Delete update
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.json({message: 'No update matched'})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    
    res.json({data: deleted})
}