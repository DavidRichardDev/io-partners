import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import server from '../src/server'
import request from 'supertest'

describe('Testing Partner controller', () => {
  dotenv.config()

  beforeAll(async () => {
    process.env.TEST = true
  })

  afterAll(async () => {
    await mongoose.connection.close()
    await server.close()
    process.env.TEST = false
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
  })

  describe('On index method:', () => {
    it('should return one partner by id', async () => {
      const partner = {
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [[
              [
                -46.66940689086914,
                -23.560997496624896
              ],
              [
                -46.669321060180664,
                -23.564616515956164
              ],
              [
                -46.664857864379876,
                -23.565796609400348
              ],
              [
                -46.66108131408691,
                -23.56304304153996
              ],
              [
                -46.66176795959473,
                -23.559738683924728
              ],
              [
                -46.664772033691406,
                -23.557457055167465
              ],
              [
                -46.66897773742675,
                -23.558401182216773
              ],
              [
                -46.66940689086914,
                -23.560997496624896
              ]
            ]
            ],
            [[
              [
                -46.662540435791016,
                -23.56587528191968
              ],
              [
                -46.66417121887207,
                -23.568392777659398
              ],
              [
                -46.66271209716796,
                -23.571146233373923
              ],
              [
                -46.65867805480957,
                -23.572798279092712
              ],
              [
                -46.65395736694336,
                -23.57138224117761
              ],
              [
                -46.654815673828125,
                -23.56737005083449
              ],
              [
                -46.65721893310547,
                -23.564144475610146
              ],
              [
                -46.660308837890625,
                -23.564380495995177
              ],
              [
                -46.662540435791016,
                -23.56587528191968
              ]
            ]]
          ]
        },
        address: {
          type: 'Point',
          coordinates: [-23.5677, -46.6660]
        }
      }
      await request(server)
        .post('/api/v1/partners')
        .send(partner)
        .expect(200)
        .then(function (err, res) {
          if (err) return err
          console.log(res)
          // const idPartner = 
        })

      // await request(server)
      //   .get('/api/v1/partners')
      //   .expect(200)
      //   .then((err: any, _res: any) => {
      //     if (err) return err
      //   })
    })

    it('should return all partners', async () => {
      await request(server)
        .get('/api/v1/partners')
        .expect(200)
        .then((err: any, _res: any) => {
          if (err) return err
        })
    })
  })

  describe('On store method:', () => {
    it('should create one partner', async (done) => {
      const partner = {
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        },
        address: {
          type: 'Point',
          coordinates: [-43.36556, -22.99669]
        }
      }
      await request(server)
        .post('/api/v1/partners')
        .send(partner)
        .expect(200)
        .then(function (err, res) {
          if (err) return err
        })
    })
  })

  describe('On nearest method:', () => {
    it('should find the nearest partner by latitude and longitude', async (done) => {
      const partner = {
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        },
        address: {
          type: 'Point',
          coordinates: [-43.36556, -22.99669]
        }
      }
      await request(server)
        .post('/api/v1/partners')
        .send(partner)
        .expect(200)
        .then(function (err, res) {
          if (err) return err
        })
      await request(server)
        .get('/api/v1/partners/nearest?lat=-43.36556&long=-22.99669')
        .expect(200)
        .then(function (err, res) {
          if (err) return err
        })
    })
  })
})
