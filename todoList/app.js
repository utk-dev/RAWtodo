/**
 * Pending Todos [also called 'Tasks' in this doc]
 * Each element of this array will be a javascript object with the format:
 * ` { name: "sampleName", desc: "description" } `
 */
var tasks = [];


// ------------ OBJECTS REPRESENTING VARIOUS FREQUENTLY ACCESSED HTML ELEMENTS ----------
/** Navigation Area */
var nav = {
    heading: id("taskListHeading"),
    emptyPrompt: id("noTasks"),
    taskList: id("taskList"),
    addNewButton: id("addNewButton")
};

/** Main Section */
var main = {
    emptySection: id("empty"),
    newSection: id("addNewTask"),
    detailedSection: id("taskView"),
    /**
     * Brings one section into view and hides all others
     * @param {HTMLElement} section The section to show
     */
    switchTo: function(section) {
        // is this really the best way to switching between the sections?
        if(section === main.emptySection) {
            show(main.emptySection);
            hide(main.newSection);
            hide(main.detailedSection);
        } else if(section === main.newSection) {
            show(main.newSection);
            hide(main.detailedSection);
            hide(main.emptySection);
        } else if(section === main.detailedSection) {
            show(main.detailedSection);
            hide(main.emptySection);
            hide(main.newSection);
        }
    }
};

/** The 'New Todo' Form */
var form = {
    name: id("tname"),
    desc: id("tdesc"),
    submit: id("submit")
};


// ------------ FUNCTIONS FOR VARIOUS SUB-TASKS IN THE APP ------------
/**
 * This function (a) Fills Task List and (b) Updates the 
 * pending tasks counter at the bottom of the page
 */
function updateState() {
    fillTaskList();
    updatePendingCount();
}

/**
 * Opens a detailed view of the task provided
 * @param {Number} i ID of the task 
 */
function openDetails(i) {
    // switch to detailed view section
    hide(main.newSection);
    hide(main.emptySection);
    show(main.detailedSection);

    // fill the view with the contents of task[i]
    id("dispName").textContent = tasks[i].name;
    id("dispDesc").innerHTML = tasks[i].desc;
    id("markAsDone").setAttribute("data-id", String(i));
}

/**
 * Fills the task list every time an element is 
 * added or removed and also handles the case 
 * when the list is empty
 */
function fillTaskList() {
    if (tasks.length === 0) {        
        // there are no pending tasks
        hide(nav.taskList);
        show(nav.emptyPrompt);
        main.switchTo(main.emptySection);  // switch to empty view
    }
    else {
        show(nav.taskList);
        hide(nav.emptyPrompt);
        nav.taskList.innerHTML = "";
        for (var i = 0; i < tasks.length; i++) {
            nav.taskList.appendChild(createLiElement(i, tasks[i].name));
            (nav.taskList.children[i]).addEventListener("click", function () {
                openDetails(Number(this.getAttribute("id")));
            });
        }
    }
}

/**
 * Updates the 'pending tasks' counter at the bottom
 */
function updatePendingCount() {
    id("pendingCount").textContent = tasks.length;
}


// ------------  EVENT LISTENERS ------------
id("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var cname = form.name.value;
    var cdesc = form.desc.value;
    tasks.push({ name: cname, desc: cdesc });
    this.reset();
    updateState();
});

(nav.addNewButton).addEventListener("click", function () {
    main.switchTo(main.newSection);    // switch to the 'New Task' form
});

id("markAsDone").addEventListener("click", function () {
    var num = Number(this.getAttribute("data-id"));
    tasks.splice(num, 1);
    main.switchTo(main.emptySection);
    updateState();
});


// ------------ UTILITY FUNCTIONS ------------
/**
 * Hides an element from the view
 * @param {HTMLElement} elem Element object
 */
function hide(elem) { elem.classList.add("hide"); }

/**
 * Brings an element into the view
 * @param {HTMLElement} elem Element object
 */
function show(elem) { elem.classList.remove("hide"); }

/**
 * returns a HTML element with the given ID
 * @param {String} x ID of the element
 */
function id(x) { return document.getElementById(x); }

/**
 * If a string is more than 20 characters long, this function
 * returns a 20 character truncated part with `...`
 * @param {String} str string to be checked
 */
function trunc(str) {
    if (str.length > 20) {
        return str.substr(0, 20) + "...";
    }
    else {
        return str;
    }
}

/**
 * Returns a new HTML `li` element with provided id and text
 * @param {Number} id id attribute
 * @param {String} name text content
 */
function createLiElement(id, name) {
    var x = document.createElement("li");
    x.setAttribute("id", String(id));
    x.textContent = trunc(name);
    return x;
}


// ------------ ACTUAL EXECUTION STARTS FROM HERE ------------
updateState();