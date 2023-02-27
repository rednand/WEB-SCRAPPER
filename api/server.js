const { request } = require("express");
const express = require("express");
const puppetter = require("puppeteer");
const server = express();

server.get("/", async (request, response) => {
  (async () => {
    response.send("Digite o nome no final da url");
  })();
});

server.get("/:query", async (request, response) => {
  const { query } = request.params;
  (async () => {
    const browser = await puppetter.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.youtube.com/results?search_query=${query}+review`
    );

    const pageContent = await page.evaluate(() => {
      const subtitle = document.querySelectorAll(
        "#title-wrapper > h3 #video-title"
      );
      const arrayTitle = [...subtitle];
      const list = arrayTitle.map((item) => ({
        titulo: item.innerText,
        link: item.data.watchEndpoint.videoId,
      }));
      return list;
    });
    //   await page.screenshot({ path: "exampleddd.png" });

    // await browser.close();
    response.send({
      pageContent,
    });
  })();
});

const port = 3005;
server.listen(port, () => {
  console.log(
    "Servidor subiu com sucessinho!",
    `Acesse em http://localhost:${port}`
  );
});
