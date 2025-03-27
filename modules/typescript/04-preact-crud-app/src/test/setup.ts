import "@testing-library/jest-dom"
import { beforeAll, afterEach, afterAll } from "vitest"
import { setupServer } from "msw/node"
import { handlers } from "../mocks/handlers"

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
