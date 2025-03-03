import fs from "fs";
import path from "path";

let file = fs.readFileSync(path.join(__dirname, "base.user.js"), "utf8");

const fileFilter = (file) => {
  return file.endsWith(".json");
};

const ROOT = path.join(__dirname, "..");

const tags = fs.readdirSync(path.join(ROOT, "tag")).filter(fileFilter);
const channels = fs.readdirSync(path.join(ROOT, "channel")).filter(fileFilter);
const cats = fs.readdirSync(path.join(ROOT, "category")).filter(fileFilter);

console.log(`Tags: ${tags.length}`);
console.log(`Channels: ${channels.length}`);
console.log(`Categories: ${cats.length}`);

let tag = tags
  .map((file) => {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "tag", file), "utf8"));
  })
  .flat();
let channel = channels
  .map((file) => {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "channel", file), "utf8"))
      .map((c) =>
        c
          .replace("https://chzzk.naver.com/", "")
          .replace("http://chzzk.naver.com/", "")
      )
      .filter((c) => c.length == 32);
  })
  .flat();
let cat = cats
  .map((file) => {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, "category", file), "utf8")
    );
  })
  .flat();

// remove duplicates
tag = [...new Set(tag)];
channel = [...new Set(channel)];
cat = [...new Set(cat)];

// each channel id is hex string of 32 characters
// compress it to base64
channel = channel.map((c) => {
  return Buffer.from(c, "hex").toString("base64").replace("==", "");
});

file = file.replace(`["$0"]`, JSON.stringify(tag));
file = file.replace(`$1`, channel.join("@"));
file = file.replace(`["$2"]`, JSON.stringify(cat));

console.log(`Tags: ${tag.length}`);
console.log(`Channels: ${channel.length}`);
console.log(`Categories: ${cat.length}`);

const pad2 = (num) => {
  return num.toString().padStart(2, "0");
};
const date = new Date();
const version = `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(
  date.getDate()
)}.${pad2(date.getHours())}${pad2(date.getMinutes())}${pad2(
  date.getSeconds()
)}.${(process.env.GITHUB_SHA || "devenv").slice(0, 6)}`;
file = file.replace(`$version`, version);

console.log(`Version: ${version}`);

if (!fs.existsSync(path.join(__dirname, "..", "deploy"))) {
  fs.mkdirSync(path.join(__dirname, "..", "deploy"));
}
fs.writeFileSync(path.join(__dirname, "..", "deploy", "dist.user.js"), file);
