import 'ignore-styles';
import express from "express";
import React from 'react';
import fs from "fs";
import path from "path";
import { renderToPipeableStream } from "react-dom/server";
import App from "./src/App";

const app = express();

app.use(express.static(path.resolve(__dirname, "build")));

app.use("*", (req, res) => {
  console.log("Rendering app for ID:", req.params.id);

  fs.readFile(path.resolve("build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Some error happened");
    }

    let didError = false;

    const { pipe } = renderToPipeableStream(<App />, {
      onShellReady() {
        // First flush the initial HTML (up to the root div)
        const initialHtml = data.replace('<div id="root"></div>', '<div id="root">');
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-Type", "text/html");
        res.write(initialHtml);

        // Pipe the React stream
        pipe(res);

        // When it's done, end the HTML
        res.write("</div>");
        res.end();
      },
      onError(err) {
        didError = true;
        console.error("Stream error:", err);
      },
    });  
  });
});

app.use(express.static(path.resolve(__dirname, "build")));

app.listen(3000, () => {
  console.log("App is launched on port 3000");
});
