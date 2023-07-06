export default function validateUserName(userName) {
  const regExp = /^[a-zA-Z0-9]{1,10}$/
  return regExp.test(userName)
}
