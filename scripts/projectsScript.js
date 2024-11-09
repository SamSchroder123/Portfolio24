import projects from "../projects.json" with { type: "json" };

var projectArea = document.getElementById("projectArea");
//create row
var row = document.createElement("div");
row.className = "projectsRow";
for (let i = 0; i < Object.keys(projects).length; i++) {
    console.log(projects[Object.keys(projects)[i]]);
    //create project
    var project = new Image();
    project.className = "project";
    console.log("../" + projects[Object.keys(projects)[i]].imageSrc);
    project.src = projects[Object.keys(projects)[i]].imageSrc;
    project.setAttribute("_link", projects[Object.keys(projects)[i]].link);
    project.setAttribute("onclick", clicked);
    row.appendChild(project);
}
projectArea.appendChild(row);

resizeProjects();

function clicked() {
    console.log(this);  
    return "openInNewTab('" + this.getAttribute("_link") + "')"
}

function resizeProjects() {
    var projects = document.getElementsByClassName("project");
    console.log(projects);
    let count = projects.length;
    const projectAreaHeight = 400;
    let projectHeight = projectAreaHeight / count;
    const viewportWidth = document.documentElement.clientWidth;
    console.log(viewportWidth);
    const projectAreaWidth = Math.floor(viewportWidth * 0.8);
    let totalProjectsWidth = 0;


    for (let i=0; i < projects.length; i++) {
        projects[i].setAttribute("style", "height: " + projectHeight.toString() + "px;");
        totalProjectsWidth += projects[i].offsetWidth;
        console.log(projects[i].clientWidth);
    }
    console.log("totalProjectsWidth: " + totalProjectsWidth);
}