export const getDateStr = (post, omitYear = false) => {
  const date = new Date(post.frontmatter.date)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  if(omitYear) {
    return `${month}/${day}`
  } else {
    const year = date.getFullYear()
    return `${year}/${month}/${day}`
  }
}
