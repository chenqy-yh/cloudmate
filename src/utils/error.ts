export const makeErrorMsg = (name, message) => {
  const err = new Error()
  err.name = name;
  err.message = JSON.stringify(message)
  return err;
}
