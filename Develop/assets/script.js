//variable for time on the calendar
var day = [
    {
        id: "0",
        hour: "09am",
        time: "09",
        reminder: ""
    },
    {
        id: "1",
        hour: "10am",
        time: "10",
        reminder: ""
    },
    {
        id: "2",
        hour: "11am",
        time: "11",
        reminder: "",
    },
    {
        id: "3",
        hour: "12pm",
        time: "12",
        reminder: ""
    },
    {
        id: "4",
        hour: "01pm",
        time: "13",
        reminder: ""
    },
    {
        id: "5",
        hour: "02pm",
        time: "14",
        reminder: ""
    },
    {
        id: "6",
        hour: "03pm",
        time: "15",
        reminder: ""
    },
    {
        id: "7",
        hour: "04pm",
        time: "16",
        reminder: ""
    },
    {
        id: "8",
        hour: "05pm",
        time: "17",
        reminder: ""
    },
    {
        id: "9",
        hour: "06pm",
        time: "18",
        reminder: ""
    },
    {
        id: "10",
        hour: "07pm",
        time: "19",
        reminder: ""
    },
    {
        id: "11",
        hour: "08pm",
        time: "20",
        reminder: ""
    },
    {
        id: "12",
        hour: "09pm",
        time: "21",
        reminder: ""
    },
]
//get current date/time
var getHeaderDate = function () {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
};

//function to save task items
var saveTasks = function () {
    localStorage.setItem("day" , JSON.stringify(day));
};

//function to display saved tasks
var displayTasks = function() {
    day.forEach(function (_thisHour) {
        $(_thisHour.id).val(_thisHour.reminder);
    })
}

//function to return saved tasks to display
var loadTasks = function() {
    var storedTasks = JSON.parse(localStorage.getItem("day"));
    if (storedTasks) {
        day = storedTasks;
    }
    saveTasks();
    displayTasks();
}
getHeaderDate();

//generates the rows with each hour displayed on the calendar
day.forEach(function(thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourSpace = $("<div>")
    .text(thisHour.hour, moment().hour())
    .attr({
        "class": "col-md-2 hour"
    });
    
//changes the color of the hour blocks based on current time
    var hourData = $("<div>")
    .attr( {
        "class": "col-md-9 description p-0"
    });
    var planData = $("<textarea>");
    hourData.append(planData);
    planData.attr("id" , thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr({
            "class": "past",
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    var saveButton = $("<i class= 'far fa-save fa-lg'></i>");
    var savePlan = $("<button>")
    .attr({
        "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourSpace, hourData, savePlan);
})
loadTasks();

//event listener to save tasks
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var taskList = $(this).siblings(".description").children("future").attr("id");
    day[taskList].reminder = $(this).siblings("description").children("future").val();
    saveTasks();
    displayTasks();
})