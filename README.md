# Blog Api

## Description:

A learning project with a focus on JWT authentication, using passport with the jwt strategy.

---

## Endpoint:

```
https://arito-blog-api.herokuapp.com/
```

## Authentication:

JWT

```
Authorization: Bearer <Token>
```

---

| Method | Route                              | Description                  | Body Format                           | Req Auth |
| ------ | ---------------------------------- | ---------------------------- | ------------------------------------- | :------: |
| POST   | /login                             | Login                        | { username, password }                |    No    |
| POST   | /register                          | Register                     | { username, password, rpassword }     |    No    |
| GET    | /posts                             | Get all posts                |                                       |          |
| GET    | /posts/:id                         | Get single post by id        |                                       |          |
| GET    | /posts/:id/comments                | Get all comments for a post  |                                       |          |
| POST   | /posts                             | Create a new post            | { title, body [, published:boolean] } |   Yes    |
| POST   | /posts/:id/comments                | Add a comment to a post      | { name, comment }                     |          |
| PUT    | /posts/:id                         | Update a post by id          | { [title][,body][,published]}         |   Yes    |
| DELETE | /posts/:id                         | Delete a post by id          |                                       |          |
| DELETE | /posts/:postId/comments/:commentId | Delete a comment from a post |                                       |          |
