import prisma from "../db"

// Get all update points 
export const getUpdatePoints = async (req, res) => {
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

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints]
    }, [])

    res.json({data: updatePoints})
}

// Get one update point
export const getOneUpdatePoint = async (req, res) => {
    const updatePoint = await prisma.updatePoint.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: updatePoint})
}

// Create update point
export const createUpdatePoint = async (req, res) => {
    
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        return res.json({ message: 'Invalid product'})
    }

    const updatePoint = await prisma.updatePoint.create({
        data: req.body
    })

    res.json({data: updatePoint})
}

// Update update point
export const updateUpdatePoint = async (req, res) => {
    
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

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints]
    }, [])

    const match = updatePoints.find(updatePoint => updatePoint.id === req.params.id)

    if (!match) {
        return res.json({message: 'No update point matched'})
    }
    
    const updateUpdatePoint = await prisma.updatePoint.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updateUpdatePoint})
}

// Delete update point
export const deleteUpdatePoint = async (req, res) => {
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

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints]
    }, [])

    const match = updatePoints.find(updatePoint => updatePoint.id === req.params.id)

    if (!match) {
        return res.json({message: 'No update point matched'})
    }
    
    const deleted = await prisma.updatePoint.delete({
        where: {
            id: req.params.id
        }
    })
    
    res.json({data: deleted})
}