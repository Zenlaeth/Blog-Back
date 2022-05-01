import PostsModel from "../db/models/Posts.js";

const postsRoute = ({ app }) => {
  // POST
  app.post("/posts", async (req, res) => {
    const {
      body: { title, content, isPublished, user_id },
    } = req;

    const post = await PostsModel.query().insertAndFetch({
      title,
      content,
      isPublished,
      user_id,
    });
    res.send(post);
  });

  // GET
  app.get("/posts", async (req, res) => {
    res.send(await PostsModel.query());
  });

  // GET ID
  app.get("/posts/:postId", async (req, res) => {
    const {
      params: { postId },
    } = req;

    const post = await PostsModel.query().findById(postId);

    if (!post) {
      res.status(404).send("Post not found");

      return;
    }

    res.send(post);
  });

  // PUT
  app.put("/posts/edit/:postId", async (req, res) => {
    const {
      params: { postId },
      body: { title, content, isPublished },
    } = req;

    const post = await PostsModel.query().findById(postId);

    if (!post) {
      res.status(404).send("Post not found");

      return;
    }

    // if (post.user_id != auth) {
    //   res.status(403).send("You cannot modify this post, it isn't yours!");

    //   return;
    // }

    await PostsModel.query()
      .update({
        title: title,
        content: content,
        isPublished: isPublished,
      })
      .where("id", postId);
    res.send("Post updated n °" + postId);
  });

  // DELETE
  app.delete("/posts/:postId", async (req, res) => {
    const {
      params: { postId },
    } = req;

    const findPost = await PostsModel.query().findById(postId);

    if (!findPost) {
      res.status(404).send("Post not found");

      return;
    }
    await PostsModel.query().deleteById(postId);

    res.send("Deleted post " + postId);
  });
};

export default postsRoute;
