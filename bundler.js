import fs from "fs";
import path from "path";

let file = fs.readFileSync(path.join(__dirname, "base.js"), "utf8");

const fileFilter = (file) => {
  return file.endsWith(".json");
};

const tags = fs.readdirSync(path.join(__dirname, "tag")).filter(fileFilter);
const channels = fs
  .readdirSync(path.join(__dirname, "channel"))
  .filter(fileFilter);
const cats = fs
  .readdirSync(path.join(__dirname, "category"))
  .filter(fileFilter);

const tag = tags
  .map((file) => {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, "tag", file), "utf8")
    );
  })
  .flat();
const channel = channels
  .map((file) => {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, "channel", file), "utf8")
    );
  })
  .flat();
const cat = cats
  .map((file) => {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, "category", file), "utf8")
    );
  })
  .flat();

file = file.replace(`["$0"]`, JSON.stringify(tag));
file = file.replace(`["$1"]`, JSON.stringify(channel));
file = file.replace(`["$2"]`, JSON.stringify(cat));

if (!fs.existsSync(path.join(__dirname, "deploy"))) {
  fs.mkdirSync(path.join(__dirname, "deploy"));
}
fs.writeFileSync(path.join(__dirname, "deploy", "dist.js"), file);
