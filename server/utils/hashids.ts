import Hashids from 'hashids'

const hashids = new Hashids(
  process.env.HASHIDS_SECRET ?? 'secret',
  16,
)

export const encodeId = (id: number) => hashids.encode(id)

export const decodeId = (publicId: string): number => {
  const [id] = hashids.decode(publicId)

  return Number(id)
}
