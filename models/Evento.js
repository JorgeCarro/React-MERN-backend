//const mongoose  = require('mongoose');
// desestructuramos de mongoose

/* {
    title:'',
    notes:'',
    start: new Date(),
    end: addHours (new Date(), 2),
}
 */

const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
                
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    /* bgColor: '#fafafa',*/
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    } 
});

//con este cambio, cambiamos el _id por id
EventoSchema.method('toJSON', function() {
    const {__v,_id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento',EventoSchema);