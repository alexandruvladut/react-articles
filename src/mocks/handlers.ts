import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:8080/api/articles/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        title: `Test Article ${id}`,
        content: `Test Content ${id}`,
        author: 'John Doe',
        createdAt: '2025-03-11T07:39:06.605829'
      })
    );
  }),

  rest.put('http://localhost:8080/api/articles/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Article updated successfully' })
    );
  }),

  rest.get('http://localhost:8080/api/articles', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          { id: '1', title: 'Test Article 1', content: 'Test Content 1', author: 'John Doe' },
          { id: '2', title: 'Test Article 2', content: 'Test Content 2', author: 'Jane Doe' },
        ],
        totalPages: 1,
      })
    );
  }),
];
