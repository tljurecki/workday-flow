var day = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        merideim: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: "",
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "9",
        hour: "06",
        time: "18",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "10",
        hour: "07",
        time: "19",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "11",
        hour: "08",
        time: "20",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "12",
        hour: "09",
        time: "21",
        meridiem: "pm",
        reminder: ""
    },
]
var getHeaderDate = function () {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
};

var saveTasks = function () {
    localStorage.setItem("day" , JSON.stringify(day));
};

var displayTasks = function() {
    day.forEach(function (_thisHour) {
        $(_thisHour.id).val(_thisHour.reminder);
    })
}

var loadTasks = function() {
    var storedTasks = JSON.parse(localStorage.getItem("day"));
    if (storedTasks) {
        day = storedTasks;
    }
    saveTasks();
    displayTasks();
}
getHeaderDate();

day.forEach(function(thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourSpace = $("<div>")
    .text(thisHour.hour, moment().format("hhA"))
    .attr({
        "class": "col-md-2 hour"
    });
    

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

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var taskList = $(this).siblings(".description").children("future").attr("id");
    day[taskList].reminder = $(this).siblings("description").children("future").val();
    saveTasks();
    displayTasks();
})