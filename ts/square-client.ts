import { Client, Environment } from 'square'

export const client = new Client({
   environment: Environment.Sandbox,
   accessToken: process.env.REACT_APP_SQUARE_ACCESS_TOKEN,
})
