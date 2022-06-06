type Tag = string | undefined

const cleanTagFilterParam = (tagsParam: Tag[]) =>
  tagsParam
    ? tagsParam?.filter((tag: string | undefined) => tag !== undefined)
    : []

export default cleanTagFilterParam
