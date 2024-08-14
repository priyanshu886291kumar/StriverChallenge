import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      msg: "you are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const authorId = c.get("userId");
  try {
    const res = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        language: body.language,
        authorId: authorId,
        // date:Date.now()
      },
    });
    return c.json({
      id: res.id,
    });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.text("something went wrong1");
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const res = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        language: body.language,
      },
    });
    return c.json({
      id: res.id,
    });
  } catch (e) {
    c.status(403);
    return c.text("something went wrong");
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      language: true,
      date: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const res = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        language: true,
        date: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blog: res,
    });
  } catch (e) {
    c.status(403);
    return c.text("something went wrong");
  }
});

// blogRouter.delete("/:id", async (c) => {
//   const prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: c.env?.DATABASE_URL,
//       },
//     },
//   }).$extends(withAccelerate());
//   const id = c.req.param("id");
//   try {
//     const existingPost = await prisma.post.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     if (!existingPost) {
//       c.status(404);
//       return c.text("Blog not found");
//     }

//     await prisma.post.delete({
//       where: {
//         id: id,
//       },
//     });

//     return c.json({
//       message: "Blog deleted successfully",
//     });
//   } catch (e) {
//     c.status(500);
//     return c.text("Something went wrong");
//   }
// });
