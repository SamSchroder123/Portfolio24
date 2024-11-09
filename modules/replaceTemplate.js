module.exports = (template, project) => {
  let output = template.replace(/{%PROJECTNAME%}/g, project.name);
  output = output.replace(/{%IMGSRC%}/g, project.imageSrc);
  output = output.replace(/{%PROJECTLINK%}/g, project.link);

  return output;
};
