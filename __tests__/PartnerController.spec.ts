import mongoose from 'mongoose'
import server from '../src/server'
import request from 'supertest'

const partner = {
  "tradingName": "Adega Osasco",
  "ownerName": "Ze da Ambev",
  "document": "02.453.716/000170",
  "coverageArea": {
     "type": "MultiPolygon",
     "coordinates": [
      [
        [
          [-46.65314197540283, -23.554900010346444],
          [-46.65211200714111, -23.55627688681703],
          [-46.64966583251953, -23.556158869399074],
          [-46.64889335632324, -23.55478199169205],
          [-46.64915084838867, -23.553090379333423],
          [-46.6505241394043, -23.55198885260508],
          [-46.6528844833374, -23.552893678808967],
          [-46.65314197540283, -23.554900010346444],
        ],
      ],
      [
        [
          [-46.647348403930664, -23.55537208390426],
          [-46.649322509765625, -23.556355565036785],
          [-46.64962291717529, -23.558322505221753],
          [-46.64794921875, -23.559974712224648],
          [-46.645545959472656, -23.55993537420411],
          [-46.644859313964844, -23.558047135368195],
          [-46.64528846740722, -23.556237547689484],
          [-46.647348403930664, -23.55537208390426],
        ],
      ],
    ]    
  },
  "address": {
     "type": "Point",
     "coordinates": [
        -23.5547,
        -46.6512
     ]
  }
}

describe('Testing Partner controller', () => {

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    server.close()
  })

  it('should not return any partners', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners')
      .expect(400)
      
    expect(partnerResponse.body.message).toBe('No partner registered.')
  })

  it('should create one partner', async () => {
    const partnerResponse = await request(server)
      .post('/api/v1/partners')
      .send(partner)
      .expect(200)
      
    expect(partnerResponse.body.id).toBeTruthy()
  })

  it('should not create one partner when document already exists', async () => {
    const partnerResponse = await request(server)
      .post('/api/v1/partners')
      .send(partner)
      .expect(400)

    expect(partnerResponse.body.message).toMatch(/duplicate key error collection/)
  })

  it('should return all partners', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners')
      .expect(200)
      
    expect(partnerResponse.body.length).toBeTruthy()
  })

  it('should return one partner by id', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners')
      .expect(200)

    const partnerId = partnerResponse.body[0].id
    expect(partnerId).toBeTruthy()

    const partnerResponseGet = await request(server)
      .get(`/api/v1/partners/${partnerId}`)
      .expect(200)
      
    expect(partnerResponseGet.body.id).toBeTruthy()
    expect(partnerResponseGet.body.tradingName).toBe(partner.tradingName)
  })

  it('should return a message when find by id and has no one registered', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
      .expect(400);
      
    expect(partnerResponse.body.message).toBe('Partner not found.')
  })

  it('should find the nearest partner by latitude and longitude', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners/nearest?lat=-23.5547&long=-46.6512')
      .expect(200)
      
    expect(partnerResponse.body.id).toBeTruthy()        
  })

  it('should not find the nearest partner by latitude and longitude', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners/nearest?lat=0&long=0')
      .expect(400)
      
    expect(partnerResponse.body.message).toBe('Partner not found for coordinates Lat:0 and Long:0')
  })

  it('should return message when latitude and longitude are not provided', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners/nearest')
      .expect(400)
      
    expect(partnerResponse.body.message).toBe('Latitude and longitude fields are required to find a nearest partner')
  })

  it('should return status code 400 when a wrong type value is provided', async () => {
    const partnerResponse = await request(server)
      .get('/api/v1/partners/nearest?lat=ghsfhgd&long=iusdugfdu')
      .expect(400)
  })
})
