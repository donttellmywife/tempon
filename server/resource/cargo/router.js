import { Router } from 'express'
import Cargo from './model.js'

const router = Router()
export default router


router.route('/')
  .get(getMany)
  .post(createCargo)

router.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne)


async function createCargo(req, res, next) {
  const createdBy = req.user._id
  const { quantity, tracking } = req.body

  // quantity of all trackings should match given quantity
  if (parseInt(quantity.expected) > tracking.reduce((sum, track) => sum + parseInt(track.quantity), 0))
    return res.status(506).json({
      error: `Amount of ${quantity.expected} not equal to amounts in trackings`
    })

  try {
    const doc = await Cargo.create({ ...req.body, createdBy })
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
    const docs = await Cargo
      .find(lookFor)
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


async function getOne(req, res) {
  const lookFor = {
    _id: req.params.id
  }
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const [doc] = await Cargo
      .find(lookFor)
      .lean()
      .exec()

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


async function updateOne(req, res) {
  const lookFor = {
    _id: req.params.id
  }
  if (req.user.role === 'client') lookFor.createdBy = req.user._id
  if (req.user.role === 'assistant') req.body.status = Boolean(req.body.description.actual || req.body.quantity.actual) ? 'fail' : 'done'

  try {
    const updatedDoc = await Cargo
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


async function deleteOne(req, res) {
  const lookFor = {
    _id: req.params.id
  }
  if (req.user.role === 'client') lookFor.createdBy = req.user._id

  try {
    const data = await Cargo.deleteOne(lookFor).exec()
    if (!data) return res.status(400).end()

    res.status(200).json({ data })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
