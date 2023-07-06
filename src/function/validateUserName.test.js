import validateUserName from "./validateUserName"

describe("validateUserName", () => {
  test("should return true for valid user names", () => {
    const validUserNames = ["john123", "janedoe", "123456"]

    validUserNames.forEach((userName) => {
      const result = validateUserName(userName)
      expect(result).toBe(true)
    })
  })

  test("should return false for invalid user names", () => {
    const invalidUserNames = ["john doe", "1234567890123123", "민수", " "]

    invalidUserNames.forEach((userName) => {
      const result = validateUserName(userName)
      expect(result).toBe(false)
    })
  })
})
