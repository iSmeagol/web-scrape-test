import fs from "fs";

export const writeFile = (filename, data) => {
  fs.writeFile(`./files/${filename}`, data, (err) => {
    if (err) {
      console.log("There has been an error saving your configuration data.");
      console.log(err.message);
      return;
    }
    console.log("file saved successfully.");
  });
};

export const readFile = (file) => {
  try {
    return JSON.parse(fs.readFileSync(`/files/${file}`, "utf8"));
  } catch (error) {
    return null;
  }
};
