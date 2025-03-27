import { http, HttpResponse } from "msw"
import { Post } from "../types/post"

const API_URL = "https://jsonplaceholder.typicode.com/posts"

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json([
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ])
  }),

  http.post(API_URL, async ({ request }) => {
    const { title, body } = (await request.json()) as Post
    return HttpResponse.json({
      id: 3,
      title,
      body,
      userId: 1,
    })
  }),

  http.put(`${API_URL}/:id`, async ({ request }) => {
    const response = (await request.json()) as Post
    return HttpResponse.json(response)
  }),

  http.delete(`${API_URL}/:id`, () => {
    return new HttpResponse(null, { status: 200 })
  }),
]
