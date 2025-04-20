import React from 'react';
import register from '@babel/register';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import fetch from 'node-fetch'; // or use axios if preferred
import App from './src/App'; // updated to accept HTML as prop
import { getDesignsURL } from './utils/methods';
import { generateDesign } from './utils/generator';
import { readFile } from 'fs/promises';

register({
  extensions: ['.ts', '.tsx'],
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
});

const app = express();
app.use(express.static(path.resolve(__dirname, "build")));

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const apiRes = await fetch(getDesignsURL(id));
    const jsonData = await apiRes.json();

    if (id === "j2308jq") {
      jsonData.banner.properties.backgroundColor.contentScale = 3.43929;
    }

    console.log("Rendering for json : ", jsonData);
    const generatedDesign = renderToString(generateDesign(jsonData));
    const renderedComponent = renderToString(<App html={generatedDesign} />);

    const htmlTemplate = await readFile(path.resolve("build/index.html"), "utf-8");

    const finalHtml = htmlTemplate.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedComponent}</div>`
    );

    res.send(finalHtml);

  } catch (err) {
    console.error("Data fetch error:", err);
    res.status(500).send("Data fetch error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
