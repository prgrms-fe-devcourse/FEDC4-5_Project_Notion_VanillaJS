import debounce from "./debounce"

const mockFunction = jest.fn()

describe("debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(global, "setTimeout")
    jest.spyOn(global, "clearTimeout")
  })

  afterEach(() => {
    jest.clearAllTimers()
    mockFunction.mockClear()
  })

  test("should debounce function calls", () => {
    const debouncedFn = debounce(mockFunction, 100)
    const args = [1, 2, 3]
    const args2 = [4, 5, 6]
    const args3 = [7, 8, 9]

    debouncedFn(args)
    jest.advanceTimersByTime(50)

    debouncedFn(args2)
    jest.advanceTimersByTime(50)

    expect(mockFunction).not.toHaveBeenCalled()

    debouncedFn(args3)
    jest.advanceTimersByTime(100)

    expect(mockFunction).toHaveBeenCalledTimes(1)
    expect(mockFunction).toHaveBeenCalledWith(args3)
  })
})
