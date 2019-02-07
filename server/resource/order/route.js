import { Router } from 'express'

const router = Router()
export default router


router.route('/')
  .get((req, res) => {
    console.log('woot')
    if (req.user.role === 'client') res.json({ data: 'client list' })
    if (req.user.role === 'assistant') res.json({ data: 'all list' })
  })
  .post((req, res) => res.json({ data: 'new order' }))
