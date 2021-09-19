import { Document } from 'mongoose'

export interface MultiPolygonInterface extends Document {
	type: String,
	coordinates: [[[[Number]]]]
}

export interface PointSchemaInterface extends Document {
	type: String,
	coordinates: [Number]
}

export interface PartnerInterface extends Document {
	id: String,
	tradingName: String,
	ownerName: String,
	document: String,
	coverageArea: MultiPolygonInterface,
	address: PointSchemaInterface
}