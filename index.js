// Code using express

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.get("/", function (req, res) {
  sendFileResponse(res, "index.html");
});

app.get("/about", function (req, res) {
  sendFileResponse(res, "about.html");
});

app.get("/contact-me", function (req, res) {
  sendFileResponse(res, "contact-me.html");
});

app.use(express.static(path.join(__dirname)));

app.use((req, res) => {
  send404Page(res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function sendFileResponse(res, filename) {
  const filePath = path.join(__dirname, filename);
  const contentType = getContentType(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.status(500).send(`Server Error: ${err.message}`);
    } else {
      res.contentType(contentType);
      res.send(content);
    }
  });
}

function send404Page(res) {
  const filePath = path.join(__dirname, "404.html");
  fs.readFile(filePath, (err, content) => {
    res.status(404).contentType("text/html").send(content);
  });
}

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpg";
    default:
      return "text/html";
  }
}

// Code below this only uses node.js

// const http = require("http");
// const path = require("path");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   let filePath = path.join(
//     __dirname,
//     req.url === "/"
//       ? "index.html"
//       : req.url === "/about"
//       ? "about.html"
//       : req.url === "/contact-me"
//       ? "contact-me.html"
//       : req.url
//   );

//   let extname = path.extname(filePath);

//   let contentType = "text/html";

//   switch (extname) {
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".css":
//       contentType = "text/css";
//       break;
//     case ".json":
//       contentType = "application/json";
//       break;
//     case ".png":
//       contentType = "image/png";
//       break;
//     case ".jpg":
//       contentType = "image/jpg";
//       break;
//   }

//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       if (err.code === "ENOENT") {
//         fs.readFile(
//           path.join(__dirname, "public", "404.html"),
//           (err, content) => {
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.end(content, "utf8");
//           }
//         );
//       } else {
//         res.writeHead(500);
//         res.end(`Server Error: ${err.code}`);
//       }
//     } else {
//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(content, "utf8");
//     }
//   });
// });

// server.listen(8080, () => console.log(`Server running on port 8080`));
