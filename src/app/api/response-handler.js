export default response => {
  console.log(response)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
