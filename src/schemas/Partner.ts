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
    default: 'Point',
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
  document: { type: String, unique: true },
  coverageArea: { type: multiPolygonSchema, index: '2dsphere' },
  address: { type: pointSchema, index: '2dsphere' }
}, {
  timestamps: true,
})

export default model<PartnerInterface>('Partner', PartnerSchema)
