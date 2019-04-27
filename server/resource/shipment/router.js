import { Router } from 'express'
import FBA from './fba.js'
import FBM from './fbm.js'
import Cargo from 'RESOURCE/cargo/model.js'

const router = Router()
export default router


// ALL
router.route('/')
  .get(getAll)

async function getAll(req, res) {
  const lookFor = {}
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const fba = await FBA
      .find(lookFor)
      .lean()
      .exec()

    const fbm = await FBM
      .find(lookFor)
      .lean()
      .exec()

    const docs = fba.concat(fbm)

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


// FBA
router.route('/fba')
  .get(getManyFBA)
  .post(createFBA)

router.route('/fba/:id')
  .get(getOneFBA)
  .put(updateOneFBA)
  // .delete(deleteOneFBA)


async function createFBA(req, res) {
  const createdBy = req.user._id

  // TODO: implement cargos validations
  try {
    const ids = req.body.cargos.map(c => c._id)
    const orders = await Cargo.find({ _id: { $in: ids }}).exec()

    // if amount of items is bigger then there is - don't ship
    if (orders.some((ord, i) => !ord.canShip(req.body.cargos[i].quantity))) res.status(400).json({ error: `not possible amount` })

    await Promise.all(ids.map(async (_id, i) => {
      const ord = await Cargo.findById(_id)
      ord.quantity.left -= req.body.cargos[i].quantity
      ord.save()
    }))

    const doc = await FBA.create({ ...req.body, createdBy })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


async function getManyFBA(req, res) {
  const lookFor = {}
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const docs = await FBA
      .find(lookFor)
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


async function getOneFBA(req, res) {
  const lookFor = {
    _id: req.params.id
  }
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const [data] = await FBA
      .find(lookFor)
      .lean()
      .exec()

    res.status(200).json({ data })
  } catch (e) {
    res.status(400).end()
  }
}



async function updateOneFBA(req, res) {
  const lookFor = {
    _id: req.params.id
  }


  if (req.user.role === 'client') {
    lookFor.createdBy = req.user._id

    if (req.body.status === 'in progress') req.body.status = 'ready'
  }


  // TODO: more booletproof checks?
  if (req.user.role === 'assistant') {
    if (req.body.status === 'todo') req.body.status = 'in progress'
    if (req.body.status === 'ready') req.body.status = 'shipped'
  }


  try {
    const updatedDoc = await FBA
      .findOneAndUpdate(
        lookFor,
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) return res.status(400).end()

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


// FBM
router.route('/fbm')
  .get(getManyFBM)
  .post(createFBM)

router.route('/fbm/:id')
  .get(getOneFBM)
  .put(updateOneFBM)
  .delete(deleteOneFBM)


async function createFBM(req, res) {
  const createdBy = req.user._id

  try {
    const ids = req.body.cargos.map(c => c._id)
    const orders = await Cargo.find({ _id: { $in: ids }}).exec()

    // if amount of items is bigger then there is - don't ship
    if (orders.some((ord, i) => !ord.canShip(req.body.cargos[i].quantity))) return res.status(400).json({ error: `not possible amount` })

    await Promise.all(ids.map(async (_id, i) => {
      const ord = await Cargo.findById(_id)
      ord.quantity.left -= req.body.cargos[i].quantity
      ord.save()
    }))

    const doc = await FBM.create({ ...req.body, createdBy })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


async function getOneFBM(req, res) {
  const lookFor = {
    _id: req.params.id
  }
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const [data] = await FBM
      .find(lookFor)
      .lean()
      .exec()

    res.status(200).json({ data })
  } catch (e) {
    res.status(400).end()
  }
}


async function getManyFBM(req, res) {
  const lookFor = {}
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const docs = await FBM
      .find(lookFor)
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    res.status(400).end()
  }
}



async function updateOneFBM(req, res) {
  const lookFor = {
    _id: req.params.id
  }
  if (req.user.role === 'client') lookFor.createdBy = req.user._id
  // TODO: more booletproof checks?
  if (req.user.role === 'assistant' && req.body.status === 'todo') req.body.status = 'shipped'


  try {
    const updatedDoc = await FBM
      .findOneAndUpdate(
        lookFor,
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) return res.status(400).end()

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


async function deleteOneFBM(req, res) {
  const lookFor = { _id: req.params.id }
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const shipment = await FBM.findOne(lookFor).exec()
    const ids = shipment.cargos.map(c => c._id)
    const orders = await Cargo.find({ _id: { $in: ids }}).exec()

    await Promise.all(ids.map(async (_id, i) => {
      const ord = await Cargo.findById(_id)
      ord.quantity.left += shipment.cargos[i].quantity
      ord.save()
    }))


    const data = await FBM.findOneAndDelete(lookFor).exec()
    if (!data) return res.status(400).end()

    res.status(200).json({ data })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
