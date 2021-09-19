import type { Config } from '@jest/types'

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    transform: {
      '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin'
    }
    // ,
    // preset: '@shelf/jest-mongodb'
  }
}
