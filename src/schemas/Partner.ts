import { Schema, model } from 'mongoose'
import { PartnerInterface } from '../interfaces/partner'

const multiPolygonSchema = new Schema({
    type: {
      type: String,
      enum: ['MultiPolygon'],
      required: true
    },
    coordinates: {
      type: [[[[Number]]]],
      required: true
    }
});

const pointSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
});

const PartnerSchema = new Schema({
    id: String, 
    tradingName: String,
    ownerName: String,
    document: {type: String, unique: true},
    coverageArea: multiPolygonSchema,
    address: pointSchema
},{
    timestamps: true,
})


// const PartnerSchema = new Schema({
//   id: String, 
//   tradingName: String,
//   ownerName: String,
//   document: {type: String, unique: true},
//   coverageArea: {
//                   type: {
//                     type: String,
//                     enum: ['MultiPolygon'],
//                     required: true
//                   },
//                   coordinates: {
//                     type: [[[[Number]]]],
//                     required: true
//                   }
//   },
//   address: {
//               type: {
//                 type: String,
//                 enum: ['Point'],
//                 required: true
//               },
//               coordinates: {
//                 type: [Number],
//                 required: true
//               }
//   }
// },{
//   timestamps: true,
// })

PartnerSchema.path('document').index({unique: true});
// PartnerSchema.index({document: 1});
PartnerSchema.index({ "coverageArea": "2dsphere" })
PartnerSchema.index({ "adress": "2dsphere" })

export default model<PartnerInterface>('Partner', PartnerSchema)
