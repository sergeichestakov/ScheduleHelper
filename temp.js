var selectedSchedule = [];
var finals = [];
var ratings = null;

function Course(name, times, days){
	this.classTitle = name;
	this.days = days;
	this.start = convertTime(times.slice(0,8));
	this.end = convertTime(times.slice(10));
	this.conflicts = function(class2){ //Check if two classes conflict
		for(var day = 0; day < days.length; day++){ //Check the days
			var sameDay = class2.days.includes(this.days.charAt(day));
			var sameTime = this.start <= class2.end && this.end >= class2.start;
			if(sameDay && sameTime){
				return true;
			}
		}
		return false;
	}
}

function Final(date, time){
	this.date = date;
	this.startTime = convertTime(time);
	this.endTime = this.startTime + 200;
	this.conflicts = function(final2){
		return this.date == final2.date &&
		this.startTime <= final2.endTime && this.endTime >= final2.startTime;
	}
}

//Converts to 24hr time
function convertTime(time12h) {
	time12h = time12h.trim();
	const [time, modifier] = time12h.split(' ');
  	let [hours, minutes] = time.split(':');
  	if (modifier === 'PM') {
    	hours = parseInt(hours, 10) + 12;
  	}
 	return Number(hours + minutes);
}

$(document).ready(function(){
	//Preload your schedule into an array
	loadSchedule();

	var button = $(".btn.btn-mini.btn-primary.uppercase");
	//User clicks search
	$(button).on("keypress click", function(e){
		if(e.which === 13 || e.type === "click"){
			findConflicts();
		}
	});
	loadRatings();
});

function loadRatings()
{
	$.ajax({
			'async': false,
			'global': false,
			'url': "https://crossorigin.me/http://104.236.158.81/api/rateapi/index.php",
			'dataType': "json",
			'success': function (data) {
					ratings = data;
			}
	});


	console.log(ratings);
}

function insertRating(element, meetings)
{

	// Starts the process to find the prof link and ratings.
	var professor = element.find(".data-item-long.active").find(".data-row.clearfix").find(".float-left").find(".clearfix").find(".data-column")[4].childNodes[0];
	if (professor.innerText != undefined){
	var fullname = professor.innerText.replace(/\./g,' ').split(/[ ,]+/);
	var first = fullname[0], last = fullname[1];
	//professor.href = "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + ratings[last][first]['url'];
	professor.setAttribute('target', "_blank");
}

	if ($(meetings[0]).children()[4].style.width != "16%"){
		$(meetings[0]).children()[4].style.width = "16%";
		$(meetings[0]).append('<div class="data-column" style="width: 8%;">Overall: '+ ratings[last][first]['quality'] +'</div>');
	}

	if ($(meetings[1]).children()[4].style.width != "16%"){
		$(meetings[1]).children()[4].style.width = "16%";
		$(meetings[1]).append('<div class="data-column" style="width: 8%;">Difficulty: '+ ratings[last][first]['diff'] +'</div>');
	}

	console.log(meetings.length);
}

//This is the main function: Marks the classes that conflict with your currently selected schedule
function findConflicts(){
	var prevlen;
	// Will modify the schedule header names
	setInterval(function(){
		var searchResults = $("#inlineCourseResultsDiv").children();
		var length = searchResults.length;
		if(searchResults && length !== prevlen){

			var header = document.getElementsByClassName('data-column column-header align-left');
			if (header[5].style.width != "10%") {
			header[5].style.width = "10%";
			header[5].parentNode.innerHTML += '<div class="data-column column-header align-left" style="width:8%;">Rating(s):</div>';
			console.log(header);
			}

			searchResults.each(function(){ //For every class in search results
				var conflicts = false;
				var meetings = $(this).find(".meetings").children();
				insertRating($(this), meetings);
				for(var i = 0; ($(meetings[i]).children()[1]) && !conflicts; i++){ //Check every meeting (lecture, discussion, lab)
					var times = $(meetings[i]).children()[1].innerHTML;
					var days = $(meetings[i]).children()[2].innerHTML;
					days = days.replace(/,/g, '');
					var potential = new Course("", times, days);
					//Loop through current schedule to check for conficts
					for(var curr = 0; curr < selectedSchedule.length; curr++){
						conflicts = potential.conflicts(selectedSchedule[curr]);
						if(conflicts){break;}
					}
				}
				if(conflicts || finalsConflict(this)){
					$(this).css({"background-color": "#ffdcdc"}); //Change to red
				} else if (isFull(this)){
					$(this).css({"background-color": "#fff470"}); //Change to yellow
				} else {
					$(this).css({"background-color": "#ceffce"}); //Change to green
				}


			});


			prevlen = length;
		}
	}, 25);
}

//Checks if a final conflicts with any of the selected finals
function finalsConflict(element){
	var final = getFinal(element, ".details", ".title");
	if(final){
		for(var i = 0; i < finals.length; i++){
			if(final.conflicts(finals[i])){return true;}
		}
	}
	return false;
}

//Returns if a class is full or not
function isFull(element){
	var data = $(element).find(".float-left")[0];
	data = $(data).children()[1];
	var seats = $(data).children()[2].innerHTML;
	return seats.charAt(0) == "0";
}

//Preloads the currently selected schedule into two arrays: one for classes and one for finals
function loadSchedule(){
	var schedule = $('.CourseItem.gray-shadow-border.clearfix');
	schedule.each(function(index, element){ //For every class in your schedule
		var name = $(".classTitle.height-justified");
		var classTitle = name[index].innerHTML;
		var sections = $(this).find(".meeting.clearfix");
		//Get the final
		var final = getFinal(this, ".classDescription", ".boldTitle");
		finals.push(final);
		sections.each(function(){ //For every meeting (lecture, discussion, lab)
			var sectionInfo = $(this).children();
			var times = sectionInfo[1].innerHTML;
			var days = sectionInfo[2].innerHTML;
			if(days){ //Not an empty string, so add to schedule
				days = days.replace(/,/g, ''); //Remove commas
				var newClass = new Course(classTitle, times, days);
				selectedSchedule.push(newClass);
			}
		});
	});
}

//Gets the time and date of a final and creates a new object
function getFinal(element, div, title){
	var data = $(element).find(div);
	var finalText = $(data[0]).find(title + ":contains('Final')").parent();
	if(finalText.length){
		var string = finalText[0].innerHTML;
		var firstDigit = string.search(/\d/);
		string = string.substr(firstDigit);
		var space = string.search(" ");
		var date = string.substr(0, space);
		var time = string.substr(space + 1);
		return new Final(date, time);
	}
}