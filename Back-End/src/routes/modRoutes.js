const {Router} = require('express')
const modHandler = require('../handlers/modHandlers')
const router = Router()

router.get('/', modHandler.getMod)
router.post('/createMod', modHandler.createMod)
router.delete('/deleteMod', modHandler.deleteMod)
router.put('/putMod', modHandler.putModHandler)

module.exports = router;