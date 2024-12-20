const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");
const express = require("express");
const path = require("path");

const replaceTemplate = require("./modules/replaceTemplate");

const app = express();

const data = fs.readFileSync(`${__dirname}/projects.json`, "utf-8");
const dataObject = JSON.parse(data);
console.log(dataObject);
const projectsArr = dataObject.projects;

let projectSlugsArr = [];
for (let i = 0; i < projectsArr.length; i++) {
  projectSlugsArr[i] = slugify(projectsArr[i].name);
}
const home = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");
const projectCard = fs.readFileSync(
  `${__dirname}/templates/projectCard.html`,
  "utf-8"
);
const projectPage = fs.readFileSync(
  `${__dirname}/templates/projectPage.html`,
  "utf-8"
);
const projectNotFoundPage = fs.readFileSync(
  `${__dirname}/templates/projectNotFound.html`,
  "utf-8"
);
// Serve static files from the 'images' and 'styling' folders
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/styling", express.static(path.join(__dirname, "styling")));

app.get("/", (req, res) => {
  res.writeHead(200, {
    "content-type": "text/html",
  });
  projectsHtml = () => {
    let output = "";
    for (let i = 0; i < projectsArr.length; i += 3) {
      const rowHtml = projectsArr
        .slice(i, i + 3)
        .map((el) => replaceTemplate(projectCard, projectsArr[i]))
        .join("");
      output = output + `<span>${rowHtml}</span>`;
    }
    return output;
  };
  const output = home.replace("{%PROJECTS%}", projectsHtml);
  res.end(output);
});

app.get("/project/*", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  let projectRequested = req.url.slice(
    req.url.lastIndexOf("/") + 1,
    req.url.length
  );
  if (projectSlugsArr.includes(projectRequested)) {
    projectIndex = projectSlugsArr.indexOf(projectRequested);
    const outputHtml = replaceTemplate(projectPage, projectsArr[projectIndex]);
    res.end(outputHtml);
  } else {
    res.end(projectNotFoundPage);
  }
});

app.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});
