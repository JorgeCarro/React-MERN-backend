
const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user','name');

 res.json({
        ok: true,
        eventos
    })

}

const crearEvento = async (req, res = response ) =>{

    console.log(req.body);
    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

         //antes de grabar, compruebo que no está en la BD
        /* let evento = await Event.findOne({ _id });
        if (evento){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un evento con este id'

            });
        } */


                   
        //guardamos evento
        const eventoGuardado = await evento.save(); 
         
        res.status(201).json({
            ok: true,
            evento: eventoGuardado
            
        }) 

    } catch (error) {

        console.log(error); 
        res.status(500).json({
            ok: false,
            msg:'Por favor, hable con el administrador'
        });
    }
};

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);
        if( !evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }
        if (evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg:'No tiene privilegios para cambiar este evento'
            })
        }
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento, {new: true} );
        res.json({
            ok: true,
            evento: eventoActualizado
        })


        
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg:'Por favor, hable con el administrador'
        });
        
    }

      

}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);
        if( !evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }
        if (evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg:'No tiene privilegios para eliminar este evento'
            })
        }
        
        await Evento.findByIdAndDelete(eventoId);
        res.json({
            ok: true           
        })
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg:'Por favor, hable con el administrador'
        });
        
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}