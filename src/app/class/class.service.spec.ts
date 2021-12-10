import { Repository } from 'typeorm'
import { Class } from './class.entity'
import { ClassService } from './class.service'

describe('Class Service', () => {
  let classService: ClassService
  let repository: Repository<Class>

  beforeEach(() => {
    repository = new Repository<Class>()
    classService = new ClassService(repository)
  })

  describe('findOne', () => {
    it('should return a class', async () => {
      const classItem:Class = { id: '7d30024c-260b-4dd8-b363-5d96ba55609d', name: 'LM GTE PRO' }
      const mockRepository = jest.spyOn(repository, 'findOne').mockImplementation(async () => classItem)
      const result = await classService.findOne(String(classItem.id))
      expect(result).toBe(classItem)
      expect(mockRepository).toHaveBeenCalledTimes(1)
      expect(mockRepository).toHaveBeenCalledWith(classItem.id)
    })

    it('should return undefined', async () => {
      const mockRepository = jest.spyOn(repository, 'findOne').mockImplementation(async () => undefined)
      const result = await classService.findOne('')
      expect(result).toBe(undefined)
      expect(mockRepository).toHaveBeenCalledTimes(1)
      expect(mockRepository).toHaveBeenCalledWith('')
    })

    it('should throw error', async () => {
      const mockRepository = jest.spyOn(repository, 'findOne').mockImplementation(() => { throw Error('error') })
      await expect(classService.findOne('')).rejects.toThrow('error')
      expect(mockRepository).toHaveBeenCalledTimes(1)
      expect(mockRepository).toHaveBeenCalledWith('')
    })
  })

  describe('findAll', () => {
    it('should return an array of classes', async () => {
      const classes:Class[] = [
        { id: '12c67109-0130-477a-8528-a7538f9720f3', name: 'LM GTE AM' },
        { id: '7d30024c-260b-4dd8-b363-5d96ba55609d', name: 'LM GTE PRO' }
      ]
      const mockRepository = jest.spyOn(repository, 'find').mockImplementation(async () => classes)
      const result = await classService.findAll()
      expect(result).toBe(classes)
      expect(mockRepository).toHaveBeenCalledTimes(1)
      expect(mockRepository).toHaveBeenCalledWith()
    })

    it('should return empty an array of classes', async () => {
      const classes:Class[] = []
      const mockRepository = jest.spyOn(repository, 'find').mockImplementation(async () => classes)
      const result = await classService.findAll()
      expect(result).toBe(classes)
      expect(mockRepository).toHaveBeenCalledTimes(1)
      expect(mockRepository).toHaveBeenCalledWith()
    })

    it('should throw error', async () => {
      const mockRepository = jest.spyOn(repository, 'find').mockImplementation(() => { throw Error('error') })
      await expect(classService.findAll()).rejects.toThrow('error')
      expect(mockRepository).toHaveBeenCalledTimes(1)
      expect(mockRepository).toHaveBeenCalledWith()
    })
  })
})
