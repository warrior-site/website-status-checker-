import express from "express"
import { authMiddleware } from "./middleware"
import { prismaClient } from "db/client"

const app = express();

app.use(express.json());

app.post("/api/v1/website", authMiddleware, async (req, res) => {

  const userId = req.userId!;
  const { url } = req.body;


  const data = await prismaClient.website.create({
    data: {
      userId,
      url
    }
  })

  res.json({ id: data.id })

})

app.get("/api/v1/website/status", authMiddleware, async (req, res) => {

  const websiteId = req.query.websiteId!;
  const userId = req.userId!;

  const data = await prismaClient.website.findFirst({
    where: {
      id: String(websiteId),
      userId,
      disable: false
    },
    include: {
      ticks: true
    }
  });

  res.json(data)
})

app.get("/api/v1/websites", authMiddleware, async (req, res) => {
  const userId = req.userId!;
  const data = await prismaClient.website.findMany({
    where: {
      userId,
      disable: false
    },
    include: {
      ticks: true
    }
  });

  res.json(data)
})

app.delete("/api/v1/website/", authMiddleware, async (req, res) => {
  const websiteId = req.query.websiteId!;
  const userId = req.userId!;

  const website = await prismaClient.website.update({
    where: {
      id: String(websiteId),
      userId
    },
    data: {
      disable: true
    }
  });

 
  res.json({ success: true });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});