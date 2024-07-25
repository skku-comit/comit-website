import BaseEntity from './'

export type Member = BaseEntity & {
  name: string
  description: string
  imageUrl: string
  position: string
  displayAtAboutPage: boolean
}

export type Admin = Member & {
  bio: string
  profileImageUrl: string
}
