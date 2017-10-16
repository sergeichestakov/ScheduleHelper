/*
This is a redeclaration of the function that displays the main search results with the added features listed below
To go through all the changes simply Ctrl + F "Schedule Helper"

Modifications:
Lines 204 - 252: Find conflicts and color the data-item divs with corresponding color
Lines 277 - 279: Added the tooltip for conflicting classes
Lines 317 - 327: Rate my professor links
Lines 524 - 556: Adjusted widths for some divs and appended ratings
*/
UCD.SAOT.COURSES_SEARCH.textSearch_success = function SAOTtextSearch_success(data){
	var messageContainer = document.getElementById("courseResultsAlerts");
	var callerString = arguments.callee.toString();
	try{
		/**/
		var ThisButton = $("#CoursesSearch .modal-footer .btn.btn-primary")[0];
		var OtherButton = $("#CoursesSearch .modal-body .btn.btn-primary")[0];
		var CourseResultsContainer = document.getElementById("courseResultsDiv");
		var currentDescription = "";
		var currentPrerequisites = "";
		var currentGE2Credit = "";
		var currentGE3Credit = "";
		var currentFinalExamStartDate = null;
		var currentAllowedDropDesc = "";
		var currentDropDate = null;
		var currentCrossListing = "";
		var currentCreditLimitation = "";
		var currentCourseSpecificNotesData = "";
		var currentCourseSpecificNotesDataObject = null;
		var currentCourseDeptSpecificNotesData = "";
		var currentCourseDeptSpecificNotesDataObject = null;
		var currentCourseSubjectSpecificNotesData = "";
		var currentCourseSubjectSpecificNotesDataObject = null;
		var instructors = null;
		var currentBlendSeatsAvail = "";
		var currentBlendWaitCount = "";
		var currentSection = "";
		var currentTitle = "";

		/**/
		$("#courseResultsContainer").first().each(function(){
			if($(this).hasClass("hide")){
				$(this).removeClass("hide");
			}
		});

		var NewInnerHTML = "";
		var i,j;
		if(CourseResultsContainer!=null && data!=null && typeof data.Results !== "undefined" && typeof data.Results.DATA !== "undefined"){
			CourseSearchResults = data.Results;

			if(data.Results.DATA.length<=0){
				NewInnerHTML = NewInnerHTML + "<div class=\"data-item\">No results found that matched your search criteria</div>";

				/*if this step fulfills a possible step in a help tour, process for that */
				//ScheduleBuilder.Help.Tours.processTourSteps("SAOTtextSearch-Error");
			}

			for(i=0;i < data.Results.DATA.length;i++){
				currentDescription = "";
				currentGE2Credit = "";
				currentGE3Credit = "";
				currentFinalExamStartDate = null;
				currentPrerequisites = "";
				currentAllowedDropDesc = "";
				currentDropDate = null;
				currentCrossListing = "";
				currentCreditLimitation = "";
				currentCreditLimitation = "";
				currentCourseSpecificNotesData = "";
				currentCourseSpecificNotesDataObject = null;
				currentCourseDeptSpecificNotesData = "";
				currentCourseDeptSpecificNotesDataObject = null;
				currentCourseSubjectSpecificNotesData = "";
				currentCourseSubjectSpecificNotesDataObject = null;
				instructors = null;
				currentBlendSeatsAvail = "";
				currentBlendWaitCount = "";
				currentSection = "";
				currentTitle = "";


				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"blend_seats_avail")!=null && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"blend_seats_avail")) ){
					currentBlendSeatsAvail = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"blend_seats_avail");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"blend_wait_count")!=null && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"blend_wait_count")) ){
					currentBlendWaitCount = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"blend_wait_count");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"description")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"description")!="null"
					&& UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"description")!=""){
					currentDescription = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"description");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"title")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"title")!="null"
					&& UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"title")!=""){
					currentTitle = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"title");
				}

                if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_LIMITATION")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_LIMITATION")!="null"
					&& UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_LIMITATION")!=""){
					currentCreditLimitation = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_LIMITATION");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"Prerequisites")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"Prerequisites")!="null"
					&& UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"Prerequisites")!=""){
					currentPrerequisites = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"Prerequisites");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE2Credit")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE2Credit")!="null"
					&& UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE2Credit")!=""){
					currentGE2Credit = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE2Credit");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE3Credit")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE3Credit")!="null"
					&& UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE3Credit")!=""){
					currentGE3Credit = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"GE3Credit");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"FinalExamStartDate")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"FinalExamStartDate")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"FinalExamStartDate")!="" ){
					currentFinalExamStartDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"FinalExamStartDate"));

					if(isNaN(currentFinalExamStartDate.valueOf())){
						currentFinalExamStartDate = null;
					}
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"DROP_DATE")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"DROP_DATE")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"DROP_DATE")!="" ){
					currentDropDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"DROP_DATE"));

					if(isNaN(currentDropDate.valueOf())){
						currentDropDate = null;
					}else{
						currentDropDate.setHours(23);
						currentDropDate.setMinutes(59);
						currentDropDate.setSeconds(59);
					}
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"AllowedDropDesc")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"AllowedDropDesc")!="null" ){
					currentAllowedDropDesc = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"AllowedDropDesc");
				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseDeptSpecificNotesData")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseDeptSpecificNotesData")!="null" ){
					currentCourseDeptSpecificNotesData = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseDeptSpecificNotesData");

					/**/
					if(currentCourseDeptSpecificNotesData!=null && currentCourseDeptSpecificNotesData!=""){
						try{
							currentCourseDeptSpecificNotesDataObject = JSON.parse(currentCourseDeptSpecificNotesData).QUERY;
						}catch(e){
							/**/
							UCD.SAOT.Exceptions.errorHandler({
								"errorMessage":"JSON.parse could not parse variable currentCourseDeptSpecificNotesData as ["+currentCourseDeptSpecificNotesData+"]."
								,"errorLineNumber":""
								,"errorFilename":""
								,"callerString":callerString/*arguments.callee.caller.toString()*/
								,"EmailError":1
								,"ShowDebug":ShowDebug
								,"timeout":UCD.SAOT.AJAX_TIMEOUT
								,"success":null
								,"error":null
								,"callerLineNumberErrorObject":new Error(""),"callerCFLineNumber":"4349"
								,"ActualServer":UCD.SAOT.Exceptions.ErrorData.actualServer
							});
						}
					}

				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseSubjectSpecificNotesData")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseSubjectSpecificNotesData")!="null" ){
					currentCourseSubjectSpecificNotesData = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseSubjectSpecificNotesData");

					/**/
					if(currentCourseSubjectSpecificNotesData!=null && currentCourseSubjectSpecificNotesData!=""){
						try{
							currentCourseSubjectSpecificNotesDataObject = JSON.parse(currentCourseSubjectSpecificNotesData).QUERY;
						}catch(e){
							/**/
						}
					}

				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseSpecificNotesData")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseSpecificNotesData")!="null" ){
					currentCourseSpecificNotesData = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseSpecificNotesData");

					/**/
					if(currentCourseSpecificNotesData!=null && currentCourseSpecificNotesData!=""){
						try{
							currentCourseSpecificNotesDataObject = JSON.parse(currentCourseSpecificNotesData).QUERY;
						}catch(e){
							/**/
						}
					}

				}

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"sec")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"sec")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"sec")!="null"){
					currentSection = UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"sec");
				}

				//Find and mark conflicting, full, and selected classes (Schedule Helper)
				var color;
				var conflicts = false;

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")!=""){
					var meetings = JSON.parse(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")).QUERY;
					if(currentFinalExamStartDate){
						var finalDate = UCD.SAOT.getDateString(currentFinalExamStartDate);
						var finalTime = UCD.SAOT.getTimeString(currentFinalExamStartDate);
						var potentialFinal = new Final(finalDate, finalTime);
					}

					if(eval("typeof Schedules[ThisScheduleIndex].SelectedList.t"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"PASSEDCRN")+"!=='undefined'")){
						color = BLUE; //In your schedule
					} else {
						for(var j=0; j < meetings.DATA.length && !conflicts; j++){ //Loop thru schedule until it conflicts
							var start = Number(meetings.DATA[j][2]);
							var end = Number(meetings.DATA[j][3]);
							var days = meetings.DATA[j][16];
							var potential = new Course("", start, end, days);
							for(var curr = 0; curr < selectedSchedule.length; curr++){
								conflicts = potential.conflicts(selectedSchedule[curr]);
								if(conflicts){break;}
							}
						}
						if(!conflicts && currentFinalExamStartDate){
							for(var a = 0; a < finals.length; a++){
								if(potentialFinal.conflicts(finals[a])){
									conflicts = finals[a].name;
									break;
								}
							}
						}

						if(conflicts){
							color = RED;
						}
						else if(!currentBlendSeatsAvail){
							color = YELLOW;
						}
						else {
							color = GREEN;
						}
					}

				}

				//Adds corresponding background color to data-item div
				NewInnerHTML = NewInnerHTML + "<div class=\"data-item\" style=\"background-color: " + color + ";\">\
								<div class=\"data-row clearfix\">\
									<div id=\"CourseSearchResultsRow"+i+"_ErrorContainer\" class=\"data-column\" style=\"width:100%;\">\
									</div>\
								</div>";



				/*///////////////////////////////////////////////// long */

				NewInnerHTML = NewInnerHTML + "<div class=\"data-item-long\">\
									<div class=\"data-row clearfix\">\
										<div class=\"float-left\" style=\"width:86%;\">";

				/**/
				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==1){
					NewInnerHTML = NewInnerHTML + "<div class=\"data-column title\" title=\"Denotes consent of instructor required. Contact department for the Course Registration Number (CRN).\" style=\"width:8%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"dspcrn")+"</div>";
				}else{
					NewInnerHTML = NewInnerHTML + "<div class=\"data-column title\" style=\"width:8%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"dspcrn")+"</div>";
				}

				NewInnerHTML = NewInnerHTML + "<div class=\"clearfix\">\
											<div class=\"data-column title\" style=\"width:12%;\"";

				//Added tooltip to notify which class conflicts (Schedule Helper)
				if(conflicts){
					NewInnerHTML = NewInnerHTML + " data-balloon=\"Conflicts With: " + conflicts + "\" data-baloon-pos=\"up\"";
				}

				NewInnerHTML = NewInnerHTML + ">" +UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"subject_code")+" "+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"course_number")+" "+currentSection+"</div>";

				NewInnerHTML = NewInnerHTML + "<div class=\"data-column title\" style=\"width:38%;\">"+currentTitle+"&nbsp;</div>";

				NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:12%;\">"+currentBlendSeatsAvail;
				if(!isNaN(currentBlendSeatsAvail) && !isNaN(currentBlendWaitCount)){
					NewInnerHTML = NewInnerHTML + " / ";
				}
				NewInnerHTML = NewInnerHTML + currentBlendWaitCount + "</div>";

				NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:12%;\">";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"ISVARIABLEUNIT")==1 && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW")) && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH")) && parseFloat(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW")) > 0 && parseFloat(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH")) > 0){
					NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW") + " - " + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH");
				}else if(!isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW"))){
					NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW");
				}

				NewInnerHTML = NewInnerHTML + "</div>\
										<div class=\"data-column\" style=\"width:18%;\">";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"INSTRUCTORS")!=""){
					instructors = null;
					try{
						instructors = JSON.parse(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"INSTRUCTORS")).QUERY;
					}catch(e){
						/*don't do anything other than log the error*/
					}

					if(instructors!=null){
						for(j=0;j < instructors.DATA.length;j++){
							if(j > 0){
								NewInnerHTML = NewInnerHTML + ", ";
							}
							if(UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")!=""){
								// Replaces mailing link with ratemyprofessor link if available (Schedule Helper)
								var first = UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"FIRST_NAME").substr(0,1);
								var last = UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"LAST_NAME");
								var link;
								if (ratings && ratings[last] && ratings[last][first]){
									link = "<a href=\"http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + ratings[last][first]['url'] + "\" target=\"_blank\">";
								} else {
									link = "<a href=\"mailto:"+UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")+"\">";
								}
								NewInnerHTML = NewInnerHTML + link;
							}
							NewInnerHTML = NewInnerHTML + first + ". " + last;
							if(UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")!=""){
								NewInnerHTML = NewInnerHTML + "</a>";
							}
						}

						if(instructors.DATA.length==0){
							NewInnerHTML = NewInnerHTML + "TBA";
						}
					}else{
						NewInnerHTML = NewInnerHTML + "TBA";
					}
				}else{
					NewInnerHTML = NewInnerHTML + "TBA";
				}

				NewInnerHTML = NewInnerHTML + "</div>";
				NewInnerHTML = NewInnerHTML + "</div>";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==1){
					NewInnerHTML = NewInnerHTML + "<div class=\"consent-of-instructor-text\">@ Denotes consent of instructor required. Contact department for the Course Registration Number (CRN).</div>";
				}

				if(currentDescription!="" || currentPrerequisites!="" || currentGE2Credit!="" || currentGE3Credit!="" || currentFinalExamStartDate!=null || (UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0) || currentDropDate!=null || currentCrossListing!="" || currentCreditLimitation!="" || currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){

					NewInnerHTML = NewInnerHTML + "<div class=\"details hide\" id=\"CourseSearchResultsRow"+i+"_Details_Long\">";

					/**/
					if(currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){

						if(currentCourseDeptSpecificNotesDataObject!=null && currentCourseDeptSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">Department Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseDeptSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseDeptSpecificNotesDataObject,j,"SCRCDTX_TEXT") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}

						if(currentCourseSubjectSpecificNotesDataObject!=null && currentCourseSubjectSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">Course Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseSubjectSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseSubjectSpecificNotesDataObject,j,"scrtext_text") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}

						if(currentCourseSpecificNotesDataObject!=null && currentCourseSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">CRN Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseSpecificNotesDataObject,j,"ssrtext_text") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}
					}

					if(currentDescription!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Description:</span> "+currentDescription+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

                    if(currentCreditLimitation!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Credit Limitation:</span> "+currentCreditLimitation+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentPrerequisites!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Prerequisites:</span> "+currentPrerequisites+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentGE3Credit!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">New GE Courses (Start Fall 2011 catalog rights):</span> "+currentGE3Credit+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					if(currentGE2Credit!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Former GE Credit (Prior to Fall 2011 catalog rights):</span> "+currentGE2Credit+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentFinalExamStartDate!=null){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Final Exam:</span> "+UCD.SAOT.getDateString(currentFinalExamStartDate) + " " + UCD.SAOT.getTimeString(currentFinalExamStartDate)+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";

					NewInnerHTML = NewInnerHTML + "<div class=\"data-column\">";
					if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0 ){
						NewInnerHTML = NewInnerHTML + "<span class=\"title\">Course Materials: </span><a target=\"_blank\" href=\"http://ucdavisstores.com/SelectCourses.aspx?src=2&type=2&stoid=192&trm="+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")+"&cid="+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"passedcrn") + "\">UC Davis Bookstore</a>";
					}
					NewInnerHTML = NewInnerHTML + "</div>";
					NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/

					if(currentDropDate!=null){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Drop Date:</span> ";
						NewInnerHTML = NewInnerHTML + UCD.SAOT.getDateString(currentDropDate);
						if(currentAllowedDropDesc!=""){
							NewInnerHTML = NewInnerHTML + " (" +currentAllowedDropDesc + ")";
						}
						NewInnerHTML = NewInnerHTML + "</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					if(currentCrossListing!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Cross Listing:</span> "+currentCrossListing+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><a href=\"http://catalog.ucdavis.edu\" target=\"_blank\">View the UC Davis online catalog</a></div></div>";

					NewInnerHTML = NewInnerHTML + "</div>";/*CourseSearchResultsRow?_details*/
				}


				NewInnerHTML = NewInnerHTML + "<div class=\"\" style=\"width:100%;\">";
				NewInnerHTML = NewInnerHTML + "<div class=\"meetings\">";
				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")!=""){
					var meetings = JSON.parse(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")).QUERY;
					var CurrentMeetingStartDate = null;
					var CurrentMeetingBeginTime = null;
					var meeting_start_time = null;
					var meeting_end_time = null;
					var STARTTIME;
					var ENDTIME;

					//Find the professors name to append the ratings and added variables to keep track of appendages(Schedule Helper)
					var first = last = "";
					if(instructors && instructors.DATA.length == 1){
						first = UCD.SAOT.Util.JSON2CFQueryLookup(instructors,0,"FIRST_NAME").substr(0,1);
						last = UCD.SAOT.Util.JSON2CFQueryLookup(instructors,0,"LAST_NAME");
					}

					var appendOverall = appendDifficulty = false;

					for(j=0;j < meetings.DATA.length;j++){
						CurrentMeetingStartDate = null;
						CurrentMeetingBeginTime = null;
						meeting_start_time = null;
						meeting_end_time = null;
						STARTTIME = null;
						ENDTIME = null;

						if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time")!="null"){
							CurrentMeetingStartDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date"));
							CurrentMeetingBeginTime = UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time");

							/**/
							if(CurrentMeetingBeginTime!=null && CurrentMeetingBeginTime!="" && typeof CurrentMeetingBeginTime.toString !== "undefined"){
								CurrentMeetingBeginTime = CurrentMeetingBeginTime.toString();
							}
							if(CurrentMeetingBeginTime!=null && CurrentMeetingBeginTime!=""){
								STARTTIME = new Date(CurrentMeetingStartDate.getFullYear(), CurrentMeetingStartDate.getMonth(), CurrentMeetingStartDate.getDay(), CurrentMeetingBeginTime.substr(0,2).replace(/^0+/, ''), CurrentMeetingBeginTime.substr(2,2).replace(/^0+/, ''), 0, 0);
							}
						}

						if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!="null"){
							CurrentMeetingEndDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date"));
							CurrentMeetingEndTime = UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_time");

							if(CurrentMeetingEndTime!=null && CurrentMeetingEndTime!="" && typeof CurrentMeetingEndTime.toString !== "undefined"){
								CurrentMeetingEndTime = CurrentMeetingEndTime.toString();
							}
							if(CurrentMeetingEndTime!=null && CurrentMeetingEndTime!=""){
								ENDTIME = new Date(CurrentMeetingEndDate.getFullYear(), CurrentMeetingEndDate.getMonth(), CurrentMeetingEndDate.getDay(), CurrentMeetingEndTime.substr(0,2).replace(/^0+/, ''), CurrentMeetingEndTime.substr(2,2).replace(/^0+/, ''), 0, 0);
							}
						}

						if((ENDTIME!=null && STARTTIME!=null) || (UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")!="") || (UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="TBA")){
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">\
											<div class=\"data-column\" style=\"width:12%;\">&nbsp;</div>";

							if(ENDTIME!=null && STARTTIME!=null){
								//Changed width from 28% (Schedule Helper)
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:26%;\">"+UCD.SAOT.getTimeString(STARTTIME)+" - "+UCD.SAOT.getTimeString(ENDTIME)+"</div>";
							}else{
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:26%;\">TBA</div>";
							}

							//Changed width from 15% (Schedule Helper)
							NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:13%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")+"</div>";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:20%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"MEET_TYPE_DESC")+"</div>";

							if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="TBA"){
								//Changed width from 25% (Schedule Helper)
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:20%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")+" "+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"room")+"</div>";
							}else{
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:20%;\">TBA</div>";
							}
							//Append Ratings! (Schedule Helper)
							if(j == 0 && last && ratings && ratings[last] && ratings[last][first]){
								NewInnerHTML = NewInnerHTML + '<div class="data-column" style="width: 8%;">Overall: '+ ratings[last][first]['quality'] +'</div>';
								appendOverall = true;
								if(meetings.DATA.length == 1){ //Added another for classes with only a lecture to still be able to display difficulty rating
									NewInnerHTML = NewInnerHTML + '<div class="data-row clearfix"><div class="data-column" style="width:12%;">&nbsp;</div><div class="data-column" style="width:28%;">&nbsp;</div><div class="data-column" style="width:15%;">&nbsp;</div><div class="data-column" style="width:20%;">&nbsp;</div><div class="data-column" style="width: 16%;">&nbsp;</div><div class="data-column" style="width: 8%;">Difficulty: '+ ratings[last][first]['diff'] +'</div></div>';
								}
							} else if(j == 1 && last && ratings && ratings[last] && ratings[last][first]){ //Append difficulty
								NewInnerHTML = NewInnerHTML + '<div class="data-column" style="width: 8%;">Difficulty: '+ ratings[last][first]['diff'] +'</div>';
								appendDifficulty = true;
							}

							NewInnerHTML = NewInnerHTML + "</div>";
						}
						else if(j == 1 && last && appendOverall && !appendDifficulty){ //Added another row for special cases to still display ratings (Schedule Helper)
							NewInnerHTML = NewInnerHTML + '<div class="data-row clearfix"><div class="data-column" style="width:12%;">&nbsp;</div><div class="data-column" style="width:28%;">&nbsp;</div><div class="data-column" style="width:15%;">&nbsp;</div><div class="data-column" style="width:20%;">&nbsp;</div><div class="data-column" style="width: 16%;">&nbsp;</div><div class="data-column" style="width: 8%;">Difficulty: '+ ratings[last][first]['diff'] +'</div></div>';
						}
					}
				}

				NewInnerHTML = NewInnerHTML + "</div>\
											</div>\
										</div>\
										<div class=\"float-right menu\" style=\"width:14%;\">\
											<div class=\"data-column\" style=\"text-align:right;\">\
											<button type=\"button\" class=\"btn btn-mini";

				if(eval("typeof Schedules[ThisScheduleIndex].SelectedList.t"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"PASSEDCRN")+"!=='undefined'")){
					NewInnerHTML = NewInnerHTML + " btn-success\" >Saved <i class=\"icon-ok icon-white\"></i></button>";
				}else{
					NewInnerHTML = NewInnerHTML + " white-on-navyblue btn-save\" onclick=\"javascript:UCD.SAOT.COURSES_SEARCH.addCourse("+i+",this);\">Save</button>";
				}

				if(currentDescription!="" || currentPrerequisites!="" || currentGE2Credit!="" || currentGE3Credit!="" || currentFinalExamStartDate!=null || (UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0) || currentDropDate!=null || currentCrossListing!="" || currentCreditLimitation!="" || currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
					NewInnerHTML = NewInnerHTML + "<br/>";
					if(currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
						NewInnerHTML = NewInnerHTML + "<button type=\"button\" class=\"btn btn-mini btn-warning course-alerts\" onclick=\"javascript:HideShowContainerByID('CourseSearchResultsRow"+i+"_Details_Long',this,'Hide Important Details','Show Important Details','toggle');\" title=\"View Course Iimportant Details\" style=\"text-decoration:none;\">Show Important Details</button>";
					}else{
						NewInnerHTML = NewInnerHTML + "<button type=\"button\" class=\"btn btn-mini white-on-navyblue\" onclick=\"javascript:HideShowContainerByID('CourseSearchResultsRow"+i+"_Details_Long',this,'Hide&nbsp;Details','Show&nbsp;Details','toggle');\" title=\"View Course Details\" style=\"text-decoration:none;\">Show&nbsp;Details</button>";
					}
				}

				NewInnerHTML = NewInnerHTML + "</div>\
										</div>";

				NewInnerHTML = NewInnerHTML + "</div>";
				NewInnerHTML = NewInnerHTML + "</div>";



				/*///////////////////////////////////////////////// medium*/

				NewInnerHTML = NewInnerHTML + "<div class=\"data-item-medium\">\
									<div class=\"data-row clearfix\">\
										<div class=\"float-left\" style=\"width:82%;\">\
										<div class=\"clearfix\">\
											<div class=\"data-column title\" style=\"width:50%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"dspcrn")+" - "+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"subject_code")+" "+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"course_number")+" "+currentSection+" - "+currentTitle+"</div>\
										<div class=\"data-column\" style=\"width:23%;\">";

				NewInnerHTML = NewInnerHTML +currentBlendSeatsAvail;
				NewInnerHTML = NewInnerHTML + " / ";
				NewInnerHTML = NewInnerHTML + currentBlendWaitCount;
				NewInnerHTML = NewInnerHTML + " / ";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"ISVARIABLEUNIT")==1 && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW")) && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH")) && parseFloat(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW")) > 0 && parseFloat(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH")) > 0){
					NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW") + " - " + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH");
				}else if(!isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW"))){
					NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW");
				}

				NewInnerHTML = NewInnerHTML + "</div>\
										<div class=\"data-column\" style=\"width:27%;\">";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"INSTRUCTORS")!=""){
					var instructors = JSON.parse(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"INSTRUCTORS")).QUERY;
					for(j=0;j < instructors.DATA.length;j++){
						if(j > 0){
							NewInnerHTML = NewInnerHTML + ", ";
						}
						if(UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")!=""){
							NewInnerHTML = NewInnerHTML + "<a href=\"mailto:"+UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")+"\">";
						}
						NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"FIRST_NAME").substr(0,1) + ". " + UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"LAST_NAME");
						if(UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")!=""){
							NewInnerHTML = NewInnerHTML + "</a>";
						}
					}

					if(instructors.DATA.length==0){
						NewInnerHTML = NewInnerHTML + "TBA";
					}
				}else{
					NewInnerHTML = NewInnerHTML + "TBA";
				}

				NewInnerHTML = NewInnerHTML + "</div>";
				NewInnerHTML = NewInnerHTML + "</div>";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==1){
					NewInnerHTML = NewInnerHTML + "<div class=\"consent-of-instructor-text\">@ Denotes consent of instructor required. Contact department for the Course Registration Number (CRN).</div>";
				}

				if(currentDescription!="" || currentPrerequisites!="" || currentGE2Credit!="" || currentGE3Credit!="" || currentFinalExamStartDate!=null || (UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0) || currentDropDate!=null || currentCrossListing!="" || currentCreditLimitation!="" || currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
					NewInnerHTML = NewInnerHTML + "<div class=\"details hide\" id=\"CourseSearchResultsRow"+i+"_Details_Medium\">";

					/*NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
					NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">CRN:</span> "+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"dspcrn")+"</div>";
					NewInnerHTML = NewInnerHTML + "</div>";//data-row*/

					/**/
					if(currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
						if(currentCourseDeptSpecificNotesDataObject!=null && currentCourseDeptSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">Department Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseDeptSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseDeptSpecificNotesDataObject,j,"SCRCDTX_TEXT") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}

						if(currentCourseSubjectSpecificNotesDataObject!=null && currentCourseSubjectSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">Course Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseSubjectSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseSubjectSpecificNotesDataObject,j,"scrtext_text") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}

						if(currentCourseSpecificNotesDataObject!=null && currentCourseSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">CRN Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseSpecificNotesDataObject,j,"ssrtext_text") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}
					}

					if(currentDescription!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Description:</span> "+currentDescription+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

                    if(currentCreditLimitation!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Credit Limitation:</span> "+currentCreditLimitation+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentPrerequisites!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Prerequisites:</span> "+currentPrerequisites+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentGE3Credit!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">New GE Courses (Start Fall 2011 catalog rights):</span> "+currentGE3Credit+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					if(currentGE2Credit!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Former GE Credit (Prior to Fall 2011 catalog rights):</span> "+currentGE2Credit+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentFinalExamStartDate!=null){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Final Exam:</span> "+UCD.SAOT.getDateString(currentFinalExamStartDate) + " " + UCD.SAOT.getTimeString(currentFinalExamStartDate)+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
					NewInnerHTML = NewInnerHTML + "<div class=\"data-column\">";
					if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0 ){
						NewInnerHTML = NewInnerHTML + "<span class=\"title\">Course Materials: </span><a target=\"_blank\" href=\"http://ucdavisstores.com/SelectCourses.aspx?src=2&type=2&stoid=192&trm="+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")+"&cid="+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"passedcrn") + "\">UC Davis Bookstore</a>";
					}
					NewInnerHTML = NewInnerHTML + "</div>";
					NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/

					if(currentDropDate!=null){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Drop Date:</span> ";
						NewInnerHTML = NewInnerHTML + UCD.SAOT.getDateString(currentDropDate);
						if(currentAllowedDropDesc!=""){
							NewInnerHTML = NewInnerHTML + " (" +currentAllowedDropDesc + ")";
						}
						NewInnerHTML = NewInnerHTML + "</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					if(currentCrossListing!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Cross Listing:</span> "+currentCrossListing+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}


					NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><a href=\"http://catalog.ucdavis.edu\" target=\"_blank\">View the UC Davis online catalog</a></div></div>";

					NewInnerHTML = NewInnerHTML + "</div>";/*CourseSearchResultsRow?_details*/
				}

				NewInnerHTML = NewInnerHTML + "<div class=\"\" style=\"width:100%;\">";
				NewInnerHTML = NewInnerHTML + "<div class=\"meetings\">";
				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")!=""){
					var meetings = JSON.parse(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")).QUERY;
					var CurrentMeetingStartDate = null;
					var CurrentMeetingBeginTime = null;
					var meeting_start_time = null;
					var meeting_end_time = null;
					var STARTTIME;
					var ENDTIME;

					for(j=0;j < meetings.DATA.length;j++){
						CurrentMeetingStartDate = null;
						CurrentMeetingBeginTime = null;
						meeting_start_time = null;
						meeting_end_time = null;
						STARTTIME = null;
						ENDTIME = null;

						if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time")!="null"){
							CurrentMeetingStartDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date"));
							CurrentMeetingBeginTime = UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time");

							/**/
							if(CurrentMeetingBeginTime!=null && CurrentMeetingBeginTime!="" && typeof CurrentMeetingBeginTime.toString !== "undefined"){
								CurrentMeetingBeginTime = CurrentMeetingBeginTime.toString();
							}
							if(CurrentMeetingBeginTime!=null && CurrentMeetingBeginTime!=""){
								STARTTIME = new Date(CurrentMeetingStartDate.getFullYear(), CurrentMeetingStartDate.getMonth(), CurrentMeetingStartDate.getDay(), CurrentMeetingBeginTime.substr(0,2).replace(/^0+/, ''), CurrentMeetingBeginTime.substr(2,2).replace(/^0+/, ''), 0, 0);
							}
						}

						if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!="null"){
							CurrentMeetingEndDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date"));
							CurrentMeetingEndTime = UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_time");

							if(CurrentMeetingEndTime!=null && CurrentMeetingEndTime!="" && typeof CurrentMeetingEndTime.toString !== "undefined"){
								CurrentMeetingEndTime = CurrentMeetingEndTime.toString();
							}
							if(CurrentMeetingEndTime!=null && CurrentMeetingEndTime!=""){
								ENDTIME = new Date(CurrentMeetingEndDate.getFullYear(), CurrentMeetingEndDate.getMonth(), CurrentMeetingEndDate.getDay(), CurrentMeetingEndTime.substr(0,2).replace(/^0+/, ''), CurrentMeetingEndTime.substr(2,2).replace(/^0+/, ''), 0, 0);
							}
						}

						if((ENDTIME!=null && STARTTIME!=null) || (UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")!="") || (UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="TBA")){
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">\
											<div class=\"data-column\" style=\"width:2%;\">&nbsp;</div>";

							if(ENDTIME!=null && STARTTIME!=null){
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:40%;\">"+UCD.SAOT.getTimeString(STARTTIME)+" - "+UCD.SAOT.getTimeString(ENDTIME)+"</div>";
							}else{
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:40%;\">TBA</div>";
							}

							NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:15%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")+"</div>";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:10%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"meet_type_desc_short")+"</div>";

							if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="TBA"){
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:33%;\">"+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")+" "+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"room")+"</div>";
							}else{
								NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:33%;\">TBA</div>";
							}

							NewInnerHTML = NewInnerHTML + "</div>";
						}
					}
				}

				NewInnerHTML = NewInnerHTML + "</div>\
											</div>\
										</div>\
										<div class=\"float-right menu\" style=\"width:18%;\">\
											<div class=\"data-column\" style=\"text-align:right;\">\
											<button type=\"button\" class=\"btn btn-mini";

				if(eval("typeof Schedules[ThisScheduleIndex].SelectedList.t"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"PASSEDCRN")+"!=='undefined'")){
					NewInnerHTML = NewInnerHTML + " btn-success\" >\Saved <i class=\"icon-ok icon-white\"></i></button>";
				}else{
					NewInnerHTML = NewInnerHTML + " white-on-navyblue btn-save\" onclick=\"javascript:UCD.SAOT.COURSES_SEARCH.addCourse("+i+",this);\">Save</button>";
				}

				if(currentDescription!="" || currentPrerequisites!="" || currentGE2Credit!="" || currentGE3Credit!="" || currentFinalExamStartDate!=null || (UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0) || currentDropDate!=null || currentCrossListing!="" || currentCreditLimitation!="" || currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
					NewInnerHTML = NewInnerHTML + "<br/>";
					if(currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
						NewInnerHTML = NewInnerHTML + "<button type=\"button\" class=\"btn btn-mini btn-warning course-alerts\" onclick=\"javascript:HideShowContainerByID('CourseSearchResultsRow"+i+"_Details_Medium',this,'Hide Important Details','Show Important Details','toggle');\" title=\"View Course Important Details\" style=\"text-decoration:none;\">Show Important Details</button>";
					}else{
						NewInnerHTML = NewInnerHTML + "<button type=\"button\" class=\"btn btn-mini white-on-navyblue\" onclick=\"javascript:HideShowContainerByID('CourseSearchResultsRow"+i+"_Details_Medium',this,'Hide&nbsp;Details','Show&nbsp;Details','toggle');\" title=\"View Course Details\" style=\"text-decoration:none;\">Show&nbsp;Details</button>";
					}
				}

				NewInnerHTML = NewInnerHTML + "</div>\
										</div>";

				NewInnerHTML = NewInnerHTML + "</div>";
				NewInnerHTML = NewInnerHTML + "</div>";


				/*///////////////////////////////////////////////// short*/

				NewInnerHTML = NewInnerHTML + "<div class=\"data-item-short\">\
									<div class=\"data-row clearfix\">\
										<div class=\"data-column title\" style=\"width:95%;\" saot-include-header=\"CRN - Subj Course Sec - Title:\">"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"dspcrn")+" - "+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"subject_code")+" "+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"course_number")+" "+currentSection+" - "+currentTitle+"</div>";

				NewInnerHTML = NewInnerHTML + "</div>";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==1){
					NewInnerHTML = NewInnerHTML + "<div class=\"consent-of-instructor-text\">@ Denotes consent of instructor required. Contact department for the Course Registration Number (CRN).</div>";
				}

				NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
				NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:95%;\">";
				NewInnerHTML = NewInnerHTML + "<div class=\"column-header title\" style=\"display:inline;\">Open / Waitlist:</div> ";
				NewInnerHTML = NewInnerHTML +currentBlendSeatsAvail;
				NewInnerHTML = NewInnerHTML + " / ";
				NewInnerHTML = NewInnerHTML + currentBlendWaitCount;
				NewInnerHTML = NewInnerHTML + "</div>";

				NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
				NewInnerHTML = NewInnerHTML + "<div class=\"data-column\" style=\"width:95%;\">";
				NewInnerHTML = NewInnerHTML + "<div class=\"column-header title\" style=\"display:inline;\">Units:</div> ";

				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"ISVARIABLEUNIT")==1 && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW")) && !isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH")) && parseFloat(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW")) > 0 && parseFloat(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH")) > 0){
					NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW") + " - " + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_HIGH");
				}else if(!isNaN(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW"))){
					NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CREDIT_HOURS_LOW");
				}

				NewInnerHTML = NewInnerHTML + "</div>\
									</div>";



				NewInnerHTML = NewInnerHTML + "<div class=\"data-column align-center menu\" style=\"width:100%;\">";

				if(currentDescription!="" || currentPrerequisites!="" || currentGE2Credit!="" || currentGE3Credit!="" || currentFinalExamStartDate!=null || (UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0) || currentDropDate!=null || currentCrossListing!="" || currentCreditLimitation!="" || currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
					if(currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
						NewInnerHTML = NewInnerHTML + "<button type=\"button\" class=\"btn btn-mini btn-warning course-alerts\" onclick=\"javascript:HideShowContainerByID('CourseSearchResultsRow"+i+"_Details_Short',this,'Hide Important Details','Show Important Details','toggle');\" title=\"View Course Important Details\" style=\"text-decoration:none;\">Show Important Details</button>";
					}else{
						NewInnerHTML = NewInnerHTML + "<button type=\"button\" class=\"btn btn-mini white-on-navyblue\" onclick=\"javascript:HideShowContainerByID('CourseSearchResultsRow"+i+"_Details_Short',this,'Hide&nbsp;Details','Show&nbsp;Details','toggle');\" title=\"View Course Details\" style=\"text-decoration:none;\">Show&nbsp;Details</button>";
					}
				}

				NewInnerHTML = NewInnerHTML + "<button type=\"button\" class=\"btn btn-mini";

				if(eval("typeof Schedules[ThisScheduleIndex].SelectedList.t"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"PASSEDCRN")+"!=='undefined'")){
					NewInnerHTML = NewInnerHTML + " btn-success\" >Saved <i class=\"icon-ok icon-white\"></i></button>";
				}else{
					NewInnerHTML = NewInnerHTML + " white-on-navyblue btn-save\" onclick=\"javascript:UCD.SAOT.COURSES_SEARCH.addCourse("+i+",this);\">Save</button>";
				}

				NewInnerHTML = NewInnerHTML + "</div>";



				if(currentDescription!="" || currentPrerequisites!="" || currentGE2Credit!="" || currentGE3Credit!="" || currentFinalExamStartDate!=null || (UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0) || currentDropDate!=null || currentCrossListing!="" || currentCreditLimitation!="" || currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
					NewInnerHTML = NewInnerHTML + "<div class=\"details hide\" id=\"CourseSearchResultsRow"+i+"_Details_Short\">";

					/**/
					if(currentCourseSpecificNotesDataObject!=null || currentCourseDeptSpecificNotesDataObject!=null || currentCourseSubjectSpecificNotesDataObject!=null){
						if(currentCourseDeptSpecificNotesDataObject!=null && currentCourseDeptSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">Department Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseDeptSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseDeptSpecificNotesDataObject,j,"SCRCDTX_TEXT") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}

						if(currentCourseSubjectSpecificNotesDataObject!=null && currentCourseSubjectSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">Course Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseSubjectSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseSubjectSpecificNotesDataObject,j,"scrtext_text") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}

						if(currentCourseSpecificNotesDataObject!=null && currentCourseSpecificNotesDataObject.DATA.length > 0){
							/**/
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"alert fade in MessageItem\">";
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"bold-text\">CRN Alerts/Notes:</span></div></div>";
							for(j=0;j < currentCourseSpecificNotesDataObject.DATA.length;j++){
								NewInnerHTML = NewInnerHTML + "<div class=\"MessageItemContent\">" +UCD.SAOT.Util.JSON2CFQueryLookup(currentCourseSpecificNotesDataObject,j,"ssrtext_text") + "</div>";
							}
							NewInnerHTML = NewInnerHTML + "</div>";
							NewInnerHTML = NewInnerHTML + "</div></div>";
						}
					}


					NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><span class=\"title\">Instructor(s):</span> ";
					if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"INSTRUCTORS")!=""){
						instructors = JSON.parse(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"INSTRUCTORS")).QUERY;
						for(j=0;j < instructors.DATA.length;j++){
							if(j > 0){
								NewInnerHTML = NewInnerHTML + ", ";
							}
							if(UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")!=""){
								NewInnerHTML = NewInnerHTML + "<a href=\"mailto:"+UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")+"\">";
							}
							NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"FIRST_NAME").substr(0,1) + ". " + UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"LAST_NAME");
							if(UCD.SAOT.Util.JSON2CFQueryLookup(instructors,j,"EMAIL")!=""){
								NewInnerHTML = NewInnerHTML + "</a>";
							}
						}

						if(instructors.DATA.length==0){
							NewInnerHTML = NewInnerHTML + "TBA";
						}
					}else{
						NewInnerHTML = NewInnerHTML + "TBA";
					}
					NewInnerHTML = NewInnerHTML + "</div></div>";/*data-row*/

					if(currentDescription!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Description:</span> "+currentDescription+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

                    if(currentCreditLimitation!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Credit Limitation:</span> "+currentCreditLimitation+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentPrerequisites!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Prerequisites:</span> "+currentPrerequisites+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentGE3Credit!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">New GE Courses (Start Fall 2011 catalog rights):</span> "+currentGE3Credit+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					if(currentGE2Credit!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Former GE Credit (Prior to Fall 2011 catalog rights):</span> "+currentGE2Credit+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/
					}

					if(currentFinalExamStartDate!=null){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Final Exam:</span> "+UCD.SAOT.getDateString(currentFinalExamStartDate) + " " + UCD.SAOT.getTimeString(currentFinalExamStartDate)+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
					NewInnerHTML = NewInnerHTML + "<div class=\"data-column\">";
					if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="null" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CONSENTOFINSRUCTORREQUIRED")==0 ){
						NewInnerHTML = NewInnerHTML + "<span class=\"title\">Course Materials: </span><a target=\"_blank\" href=\"http://ucdavisstores.com/SelectCourses.aspx?src=2&type=2&stoid=192&trm="+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"CourseMaterialsTerm")+"&cid="+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"passedcrn") + "\">UC Davis Bookstore</a>";
					}
					NewInnerHTML = NewInnerHTML + "</div>";
					NewInnerHTML = NewInnerHTML + "</div>";/*data-row*/

					if(currentDropDate!=null){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Drop Date:</span> ";
						NewInnerHTML = NewInnerHTML + UCD.SAOT.getDateString(currentDropDate);
						if(currentAllowedDropDesc!=""){
							NewInnerHTML = NewInnerHTML + " (" +currentAllowedDropDesc + ")";
						}
						NewInnerHTML = NewInnerHTML + "</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					if(currentCrossListing!=""){
						NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">";
						NewInnerHTML = NewInnerHTML + "<div class=\"data-column\"><span class=\"title\">Course Cross Listing:</span> "+currentCrossListing+"</div>";
						NewInnerHTML = NewInnerHTML + "</div>";
					}

					NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\"><div class=\"data-column\"><a href=\"http://catalog.ucdavis.edu\" target=\"_blank\">View the UC Davis online catalog</a></div></div>";

					NewInnerHTML = NewInnerHTML + "</div>";/*CourseSearchResultsRow?_details*/
				}


				NewInnerHTML = NewInnerHTML + "<div class=\"meetings\" style=\"font-size:10px;\">";
				if(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")!=""){
					var meetings = JSON.parse(UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,i,"COURSEMEETINGDATA")).QUERY;
					var CurrentMeetingStartDate = null;
					var CurrentMeetingBeginTime = null;
					var meeting_start_time = null;
					var meeting_end_time = null;
					var STARTTIME;
					var ENDTIME;

					for(j=0;j < meetings.DATA.length;j++){
						CurrentMeetingStartDate = null;
						CurrentMeetingBeginTime = null;
						meeting_start_time = null;
						meeting_end_time = null;
						STARTTIME = null;
						ENDTIME = null;

						if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date")!="null"){
							CurrentMeetingStartDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"start_date"));
							CurrentMeetingBeginTime = UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"begin_time");

							/**/
							if(CurrentMeetingBeginTime!=null && CurrentMeetingBeginTime!="" && typeof CurrentMeetingBeginTime.toString !== "undefined"){
								CurrentMeetingBeginTime = CurrentMeetingBeginTime.toString();
							}
							if(CurrentMeetingBeginTime!=null && CurrentMeetingBeginTime!=""){
								STARTTIME = new Date(CurrentMeetingStartDate.getFullYear(), CurrentMeetingStartDate.getMonth(), CurrentMeetingStartDate.getDay(), CurrentMeetingBeginTime.substr(0,2).replace(/^0+/, ''), CurrentMeetingBeginTime.substr(2,2).replace(/^0+/, ''), 0, 0);
							}

						}

						if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!=""
							&& UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date")!="null"){
							CurrentMeetingEndDate = new Date(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_date"));
							CurrentMeetingEndTime = UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"end_time");

							if(CurrentMeetingEndTime!=null && CurrentMeetingEndTime!="" && typeof CurrentMeetingEndTime.toString !== "undefined"){
								CurrentMeetingEndTime = CurrentMeetingEndTime.toString();
							}
							if(CurrentMeetingEndTime!=null && CurrentMeetingEndTime!=""){
								ENDTIME = new Date(CurrentMeetingEndDate.getFullYear(), CurrentMeetingEndDate.getMonth(), CurrentMeetingEndDate.getDay(), CurrentMeetingEndTime.substr(0,2).replace(/^0+/, ''), CurrentMeetingEndTime.substr(2,2).replace(/^0+/, ''), 0, 0);
							}

						}


						if((ENDTIME!=null && STARTTIME!=null) || (UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS")!="") || (UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!=null && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="TBA")){
							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">\
											<div class=\"data-column\" style=\"width:100%;\">";

							if(ENDTIME!=null && STARTTIME!=null){
								NewInnerHTML = NewInnerHTML +UCD.SAOT.getTimeString(STARTTIME)+" - "+UCD.SAOT.getTimeString(ENDTIME);
							}

							NewInnerHTML = NewInnerHTML + " " + UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"WEEKDAYS") + " ";

							NewInnerHTML = NewInnerHTML + "</div></div>";

							NewInnerHTML = NewInnerHTML + "<div class=\"data-row clearfix\">\
											<div class=\"data-column\" style=\"width:100%;\">";

							NewInnerHTML = NewInnerHTML + UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"MEET_TYPE_DESC_short") + " ";

							if(UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="" && UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")!="TBA"){
								NewInnerHTML = NewInnerHTML + " " +UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"bldg_desc")+" "+UCD.SAOT.Util.JSON2CFQueryLookup(meetings,j,"room");
							}else{
								NewInnerHTML = NewInnerHTML + "TBA";
							}

							NewInnerHTML = NewInnerHTML + "</div></div>";
						}
					}
				}

				NewInnerHTML = NewInnerHTML + "</div>";

				NewInnerHTML = NewInnerHTML + "</div>\
								</div>\
							</div>";
			}

			CourseResultsContainer.innerHTML = NewInnerHTML;

			/**/
			UCD.SAOT.DATA.LAYOUTS.LongShort.setLayouts(document.getElementById("courseResultsDiv"));

			var ThisButton = $("#CoursesSearch").data("SubmitButton");
			UCD.SAOT.SpinJS.swapOutSpinner(ThisButton);
			UCD.SAOT.SpinJS.swapOutSpinner(OtherButton);

			/**/
			document.location.hash = "#CourseSearchResults";

			/*if this step fulfills a possible step in a help tour, process for that */
			if(data.Results.DATA.length>0){
				//ScheduleBuilder.Help.Tours.processTourSteps("SAOTtextSearch-Success");
			}

			/*if the search looked like a PTA number, and only one result comes back, ask them if they want to register*/
			if(data.Results.DATA.length==1){
				var course_number = document.getElementById("course_number");
				if(typeof course_number!=="undefined" && typeof course_number.value!=="undefined" && course_number.value.length==9 && !isNaN(course_number.value) && UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,0,"crn")==course_number.value.substr(0,5) ){
					/*only show the window if the course isn't already registered for (though waitlisted should still show the window)*/
					if(typeof CourseDetails["t"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,0,"passedcrn")]==="undefined" || CourseDetails["t"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,0,"passedcrn")]===null || CourseDetails["t"+UCD.SAOT.Util.JSON2CFQueryLookup(data.Results,0,"passedcrn")].REGISTRATION_STATUS!=="Registered" ){
						showCoursesSearchPTAWindow(data.Results,0);
					}
				}
			}

		}else{
			/*if this step fulfills a possible step in a help tour, process for that */
			//ScheduleBuilder.Help.Tours.processTourSteps("SAOTtextSearch-Error");

			var data = {};
			data.Success = 0;
			data.Error = {"Message":"The courses search is temporarily unavailable. Please try again.","Type":"GeneralException","AdditionalLoggingMessage":"coursesSearchdiv is missing."};
			onAJAXError(data,messageContainer,"The courses search is temporarily unavailable. Please try again.",ThisButton,1);
			UCD.SAOT.SpinJS.swapOutSpinner(OtherButton);
		}
	}catch(e){
		UCD.SAOT.Exceptions.errorHandlerTryCatchHelper(e,arguments.callee.toString(),new Error(""),"5266",document.getElementById("courseResultsAlerts"),"","",UCD.SAOT.AJAX_TIMEOUT,ShowDebug);
	}
};
