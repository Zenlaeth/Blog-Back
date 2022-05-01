import CommentsModel from "../db/models/Comments.js";

const commentsRoute = ({ app }) => {
  // POST
  app.post("/comments", async (req, res) => {
    const {
      body: { content, user_id, post_id },
    } = req;

    const comment = await CommentsModel.query().insertAndFetch({
      content,
      user_id,
      post_id,
    });
    res.send(comment);
  });

  // GET
  app.get("/comments", async (req, res) => {
    res.send(await CommentsModel.query());
  });

  // GET ID
  app.get("/comments/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req;

    const comment = await CommentsModel.query().findById(commentId);

    if (!comment) {
      res.status(404).send("Comment not found");

      return;
    }

    res.send(comment);
  });

  // PUT
  app.put("/comments/edit/:commentId", async (req, res) => {
    const {
      params: { commentId },
      body: { content },
    } = req;

    const comment = await CommentsModel.query().findById(commentId);

    if (!comment) {
      res.status(404).send("Comment not found");

      return;
    }

    await CommentsModel.query()
      .update({
        content: content,
      })
      .where("id", commentId);
    res.send("Comment updated n °" + commentId);
  });

  // DELETE
  app.delete("/comments/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req;

    const findComment = await CommentsModel.query().findById(commentId);

    if (!findComment) {
      res.status(404).send("Comment not found");

      return;
    }
    await CommentsModel.query().deleteById(commentId);

    res.send("Deleted comment " + commentId);
  });
};

export default commentsRoute;
