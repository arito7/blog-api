# Blog Api

## Description: 

A learning project with a focus on JWT authentication, using passport with the jwt strategy.

---

## Endpoint:  
```
https://arito-blog-api.herokuapp.com/
```

---

|     | Method |                                   | Description                  | Format |
| --- | ------ | --------------------------------- | ---------------------------- | ------ |
| [x] | GET    | /posts                            | Get all posts                | |
| [x] | GET    | /posts/:id                        | Get single post by id        | |
| [x] | GET    | /posts/:id/comments               | Get all comments for a post  | | 
| [ ] | POST   | /posts                            | Create a new post            | { title, body } |
| [ ] | POST   | /posts/:id/comments                | Add a comment to a post      | { name, comment } |
| [ ] | PUT    | /posts/:id                        | Update a post by id          | |
| [ ] | DELETE | /posts/:id                        | Delete a post by id          | |
| [ ] | DELETE | /posts/:postId/comments/:commentId | Delete a comment from a post | |
