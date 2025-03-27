import "@testing-library/jest-dom"
import createFetchMock from "jest-fetch-mock"
import { vi } from "vitest"

//@ts-ignore
const fetchMock = createFetchMock(vi)

//@ts-ignore
fetchMock.enableMocks()
