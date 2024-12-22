const slugify = require("slugify");

module.exports = (template, project) => {
  let output = template.replace(/{%PROJECTNAME%}/g, project.name);
  output = output.replace(/{%IMGSRC%}/g, project.imageSrc);
  output = output.replace(/{%PROJECTLINK%}/g, project.link);
  output = output.replace(
    /{%PROJECTPAGE%}/g,
    `/project/${slugify(project.name)}`
  );
  output = output.replace(/{%REPOLINK%}/g, project.repolink);

  return output;
};
