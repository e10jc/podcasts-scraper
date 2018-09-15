import {getManager} from 'typeorm'

import {Podcast} from '../../entities/podcast'

export default async ({query}) => {
  const entityManager = getManager()

  const where = query.category ? {category: query.category} : undefined
  const order = {[query.sort || 'reviewsCnt']: 'DESC'}
  const podcasts = await entityManager.find(Podcast, {where, order, take: 100})

  const podcastsCnt = await entityManager.count(Podcast)
  const categories = (await entityManager.createQueryBuilder(Podcast, 'podcast').select('distinct category').getRawMany()).map(r => r.category)

  return JSON.stringify({podcasts, podcastsCnt, categories})
}