const extension = './Projects/'
let projects = {"ongoing":[], "completed":[]};
const infoBox = document.getElementById("Information");
async function loadProjects(){
    const respA = await fetch('./Projects/PROJECTS.json');
    const projectList = await respA.json();

    for(p=0;p<projectList.length;p++){
        filename = extension + projectList[p] + ".json";
        const respB = await fetch(filename);
        const project = await respB.json();
        if(project.endDate){
            projects.completed.push(project);
        }else{
            project.endDate = "...";
            projects.ongoing.push(project);
        };
    };
};

function loadBox(project, isOngoing, index){
    const projectBox = document.createElement("div");
    projectBox.classList.add("ProjectBox", project.type);

    const title = document.createElement("h2");
    title.innerHTML = project.title;

    const date = document.createElement("p");
    date.classList.add("Date");
    extendedDate = project.startDate + " --> " + project.endDate;
    date.innerHTML = extendedDate;
    
    const info = document.createElement("p");
    info.innerHTML = project.information.overview;

    const skills = document.createElement("div");
    skills.classList.add("SkillsBox");
    const skillList = document.createElement("p");
    skillStuff = [];
    project.skills.forEach((skillObj) => {
        skillStuff.push(skillObj.skill);
    });
    skillText = skillStuff.join(', ');
    skillList.innerHTML = skillText;
    skills.appendChild(skillList);

    const link = document.createElement("BUTTON");
    link.classList.add("Link");
    link.textContent = "More Information";
    link.dataset.title = project.title;
    link.addEventListener('click', (event) => {
        event.preventDefault();
        updateInformationBox(link.dataset.title);
    });

    projectBox.appendChild(title);
    projectBox.appendChild(date);
    projectBox.appendChild(info);
    projectBox.appendChild(skills);
    projectBox.appendChild(link);
    
    return projectBox;
}

function findProject(title){
    relevantProject = null;
    projects.ongoing.forEach((project) => {
        if(project.title == title){
            relevantProject = project;
        };
    });
    projects.completed.forEach((project) => {
        if(project.title == title){
            relevantProject = project;
        };
    });
    return relevantProject;
}
function updateInformationBox(title){
    project = findProject(title)
    infoBox.scrollIntoView({ behavior: 'smooth' });

    infoBox.innerHTML = "";

    const infoTitle = document.createElement("h1");
    if(Object.keys(project).includes("link")){
        infoTitle.innerHTML = `<a href = "${project.link}">${project.title}</a>`;
    } else{
        infoTitle.innerHTML = project.title;
    }

    const infoHeader = document.createElement("h2");
    infoHeader.innerHTML = "Story/Methodology";

    const infoSection = document.createElement("p");
    infoSection.innerHTML = project.information.detailed;

    infoBox.appendChild(infoTitle);
    infoBox.appendChild(infoHeader);
    infoBox.appendChild(infoSection);

    const skillsHeader = document.createElement("h2");
    skillsHeader.innerHTML = "Skills";
    infoBox.appendChild(skillsHeader);

    for(s=0;s<project.skills.length;s++){
        thisSkill = project.skills[s]
        const skillBox = document.createElement("div");
        skillBox.classList.add("DetailedSkillsBox")
        const skillTitle = document.createElement("h3");
        skillTitle.innerHTML = thisSkill.skill;
        const skillExplanation = document.createElement("p");
        skillExplanation.innerHTML = thisSkill.explanation;

        skillBox.appendChild(skillTitle);
        skillBox.appendChild(skillExplanation);
        infoBox.appendChild(skillBox);
    };
};

async function wrapper(){
    await loadProjects();

    ongoingBox = document.getElementById("Ongoing");
    projects.ongoing.forEach((project) => {
        thisBox = loadBox(project);
        ongoingBox.appendChild(thisBox);
    });
    if(projects.ongoing.length === 0){
        const ongoingFiller = document.createElement("p");
        ongoingFiller.innerHTML = "No Ongoing Projects :)";
        ongoingBox.appendChild(ongoingFiller);
    };

    completedBox = document.getElementById("Completed");
    projects.completed.forEach((project) => {
        thisBox = loadBox(project);
        completedBox.appendChild(thisBox);
    });
    if(projects.completed.length === 0){
        const completedFiller = document.createElement("p");
        completedFiller.innerHTML = "No Completed Projects - Come Back Later :)";
        completedBox.appendChild(completedFiller);
    };
};

wrapper();