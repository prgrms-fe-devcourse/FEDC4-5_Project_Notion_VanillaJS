import debounce from "./debounce"

describe("debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(global, "setTimeout")
    jest.spyOn(global, "clearTimeout")
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test("should debounce the callback function", () => {
    const callback = jest.fn()
    const wait = 1000

    const timer = debounce(null, callback, wait)

    expect(setTimeout).toHaveBeenCalledWith(callback, wait)

    jest.advanceTimersByTime(wait - 1)

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)

    expect(callback).toHaveBeenCalled()
  })

  test("should clear previous timer before setting a new one", () => {
    const callback = jest.fn()
    const wait = 1000

    const previousTimer = 123
    const newTimer = debounce(previousTimer, callback, wait)

    expect(clearTimeout).toHaveBeenCalledWith(previousTimer)
    expect(setTimeout).toHaveBeenCalledWith(callback, wait)

    expect(newTimer).not.toBe(previousTimer)
  })
})
