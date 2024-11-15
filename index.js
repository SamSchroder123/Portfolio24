const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");
const express = require("express");
const path = require("path");
const app = express();

const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/projects.json`, "utf-8");
const dataObject = JSON.parse(data);
console.log(dataObject);

const home = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");
const projectCard = fs.readFileSync(
  `${__dirname}/templates/projectCard.html`,
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
    for (let i = 0; i < Object.keys(dataObject).length; i += 3) {
      const rowHtml = Object.keys(dataObject)
        .slice(i, i + 3)
        .map((el) => replaceTemplate(projectCard, dataObject[el]))
        .join("");
      output = output + `<span>${rowHtml}</span>`;
    }
    return output;
  };
  console.log(projectsHtml);
  const output = home.replace("{%PROJECTS%}", projectsHtml);
  res.end(output);
});

// const server = http.createServer((req, res) => {
//   const { query, pathname } = url.parse(req.url, true);
//   console.log(query, pathname);

//   // overview page
//   if (pathname === "/" || pathname === "/home") {
//     res.writeHead(200, {
//       "content-type": "text/html",
//     });
//     projectsHtml = Object.keys(dataObject)
//       .map((el) => replaceTemplate(projectCard, dataObject[el]))
//       .join("");
//     console.log(projectsHtml);
//     const output = home.replace("{%PROJECTS%}", projectsHtml);
//     res.end(output);

//     // product page
//   } else if (pathname === "/product") {
//     const product = dataObject[query.id];
//     console.log(product);
//     const output = replaceTemplate(templateProduct, product);
//     res.end(output);

//     // api
//   } else if (pathname === "/api") {
//     res.writeHead(200, {
//       "Content-type": "application/json",
//     });
//     res.end(data);

//     // page not found page
//   } else {
//     res.writeHead(404, {
//       "content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found</h1>");
//   }
// });

app.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});
