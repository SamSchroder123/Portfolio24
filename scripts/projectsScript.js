import projects from "../projects.json" with { type: "json" };

var projectArea = document.getElementById("projectArea");
//create row
var row = document.createElement("div");
row.setAttribute("class", "projectsRow");
for (let i = 0; i < Object.keys(projects).length; i++) {
    console.log(projects[Object.keys(projects)[i]]);
    //create project
    var project = new Image();
    project.setAttribute("class", "project");
    console.log("../" + projects[Object.keys(projects)[i]].imageSrc);
    project.src = projects[Object.keys(projects)[i]].imageSrc;
    project.setAttribute("_link", projects[Object.keys(projects)[i]].link);
    project.setAttribute("onclick", clicked);
    row.appendChild(project);
}
projectArea.appendChild(row);

function clicked() {
    console.log(this);  
    return "openInNewTab('" + this.getAttribute("_link") + "')"
}