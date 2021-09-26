import * as ua from 'universal-analytics'
import { v4 as uuidv4 } from 'uuid'

export function createVisitor(): ua.Visitor {
  return ua(process.env.GOOGLE_ANALYTICS_ID!, uuidv4())
}
