import { S3 } from 'aws-sdk'

type Mock<T> = Record<keyof T, jest.Mock>
export type PartialMock<T> = Partial<Mock<T>>

export const s3MockService = (): PartialMock<S3> => ({
  getSignedUrl: jest.fn().mockImplementation(() => 'http://www.example.com'),
  deleteObject: jest.fn(),
})
