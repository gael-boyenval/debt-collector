type Tag = string | undefined

export const cleanTagFilterParam = (tagsParam: Tag[] | undefined) =>
  tagsParam
    ? tagsParam?.filter((tag: string | undefined) => tag !== undefined).map(tag => tag?.trim())
    : []
