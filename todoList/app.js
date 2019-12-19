function hide(elem) { elem.classList.add("hide"); }
function show(elem) { elem.classList.remove("hide"); }
function toggle(elem) { elem.classList.toggle("hide"); }

function id(x) { return document.getElementById(x); }

var tasks = [];

updateState();

function updateState() {
    fillTaskList();
    updatePendingCount();
}

function trunc(str) {
    if(str.length > 20) {
        return str.substr(0, 20) + "...";
    }
    else {
        return str;
    }
}

function openDetails(i) {
    var nTask = id("addNewTask")
    var emp = id("empty");
    hide(nTask);
    hide(emp);
    var name = id("dispName");
    var desc = id("dispDesc");
    var tView = id("taskView");

    show(tView);
    name.textContent = tasks[i].name;
    desc.innerHTML = tasks[i].desc;

    id("markAsDone").setAttribute("data-id", String(i));
}

function fillTaskList() {
    var list = id("taskList");
    var noTasks = id("noTasks");
    if(tasks.length === 0) {
        console.log("This runs!")
        show(noTasks);
        hide(id("taskView"));
        hide(id("addNewTask"));
        hide(list);
        show(id("empty"));
    }
    else {
        show(list);
        hide(noTasks);
        list.innerHTML = "";
        for(var i = 0; i < tasks.length; i++) {
            //list.innerHTML += li(trunc(tasks[i].name),i);
            // create new HTML Element and append it.
            var x = document.createElement("li");
            x.setAttribute("id", String(i));
            x.textContent = trunc(tasks[i].name);
            list.appendChild(x);
            (list.children[i]).addEventListener("click", function() {
                openDetails(Number(this.getAttribute("id")));
            });
        }
    }
}


function updatePendingCount() {
    id("pendingCount").textContent = tasks.length;
}

id("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var cname = id("tname").value;
    var cdesc = id("tdesc").value;
    tasks.push({name: cname, desc: cdesc});
    this.reset();
    updateState();
});

id("addNewButton").addEventListener("click", function() {
    hide(id("empty"));
    hide(id("taskView"));
    show(id("addNewTask"));
});

id("markAsDone").addEventListener("click", function() {
    var num = Number(this.getAttribute("data-id"));
    tasks.splice(num, 1);
    hide(id("taskView"));
    show(id("empty"));
    updateState();
});

