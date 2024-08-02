import type { NextApiRequest, NextApiResponse } from 'next'

import { NotImplementedError } from '@/errors'
import BaseEntity from '@/types'

function CreateFactory<E extends BaseEntity>() {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const entityCreated = req.body
      res.status(201).json(entityCreated)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

function RetrieveFactory<E extends BaseEntity>(entities: E[]) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const entityFound = entities.find((instance) => instance.id === id)

      if (!entityFound) {
        res.status(404).json({ error: 'Not found' })
        return
      }
      res.status(200).json(entityFound)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

function ListFactory<E extends BaseEntity>(entities: E[]) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let searchResult = entities.slice()
      const url = new URL(req.url!)

      const queryParams = url.searchParams
      queryParams.forEach((key, value) => {
        searchResult = searchResult.filter((entity) => {
          // Entity가 queryParam을 속성으로 가지면 필터
          if (Object.hasOwn(entity, value)) {
            let queryKey = value as keyof E
            return entity[queryKey] === key
          }
        })
      })

      res.status(200).json(searchResult)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

function PutFactory<E extends BaseEntity>(entities: E[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const entityFound = entities.find((instance) => instance.id === id)

      if (!entityFound) {
        res.status(404).json({ error: 'Not Found' })
      }

      const entityUpdated = req.body
      res.status(201).json(entityUpdated)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

function PatchFactory<E extends BaseEntity>(entities: E[]) {
  throw new NotImplementedError()
}

function DeleteFactory<E extends BaseEntity>(entities: E[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const entityFound = entities.find((instance) => instance.id === id)

      if (!entityFound) {
        res.status(404).json({ error: 'Not Found' })
      }

      const entityUpdated = req.body
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

/**
 * 반복적으로 작성되는 CRUD 패턴 스캐폴딩을 돕습니다.
 */
const api = {
  CreateFactory,
  RetrieveFactory,
  ListFactory,
  PutFactory,
  PatchFactory,
  DeleteFactory
}
export { api }
