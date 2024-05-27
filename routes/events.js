/*
    rutas de usuario / Events
    host + /api/events

 */

const { Router } = require('express');
const { check } =require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();
//todas tienen que pasar por el token
// la siguiente sentencia sirve para que pasen todos los endpoints por ese middleware
// en vez de ponerlo en cada endpoint
router.use( validarJWT );

//obtener eventos
router.get('/',  getEventos) ;

//crear nuevo evento
router.post('/', 
    //middlewares
    [
        check('title','el titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatoria').custom(isDate),
        check('end','fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
  crearEvento) ;

//actualizar evento
router.put('/:id',  actualizarEvento) ;

//borrar evento
router.delete('/:id',  eliminarEvento) ;

module.exports = router;