import { Router } from 'express'
import FBA from './fba.js'
import Cargo from 'RESOURCE/cargo/model.js'

const router = Router()
export default router


router.route('/fba')
  .get(getMany)
  .post(createFBA)

router.route('/fba/:id')
  .put(updateOne)


async function createFBA(req, res) {
  const createdBy = req.user._id

  // TODO: implement cargos validations
  try {
    const ids = req.body.cargos.map(c => c._id)
    const orders = await Cargo.find({ _id: { $in: ids }}).exec()

    // if amount of items is bigger then there is - dont ship
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


async function getMany(req, res) {
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



async function updateOne(req, res) {
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
