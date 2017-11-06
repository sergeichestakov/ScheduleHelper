$.ajaxPrefilter( function (options) { // Injects a proxy into the browser so that it has cross domain access.
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
});
var link, name, quality, i, setoff = 0, count = 1, difficult, first, last, pageCount = 219;
// http://www.ratemyprofessors.com/find/professor/?institution=University+of+California+Davis&page=1&query=Jelmer%20Eerkens&queryoption=TEACHER
for (i=0; i < pageCount; i++) {
  setTimeout(getPage(), 5000); //5 second delay
}
console.log("running");
function getPage(){
  console.log(i);
  $.get({
     async: false,
     url: 'http://www.ratemyprofessors.com/search.jsp?query=&queryoption=HEADER&stateselect=&country=&dept=&queryBy=teacherName&facetSearch=&schoolName=University+of+California+Davis&offset='+ setoff +'&max=50',
     success: function(response){
          data = $(response).find('.listings').children('li').each(function () {
             link = jQuery(this).children("a").attr('href');
             name = jQuery(this).find("span .main").text();
                $.ajax({
                   async: false,
                   url: 'http://www.ratemyprofessors.com' + link,
                   success: function(data){
                     quality = $(data).find(".grade")[0].innerText;
                     difficult = $(data).find(".grade")[2].innerText;
                     first = $(data).find(".pfname")[0].innerText;
                     last = $(data).find(".plname")[0].innerText;
                     console.log(count + "   " + name + " - Qual: " + quality + " - Diff: " + difficult + " - Link: " + link + " " + first + " " + last);
                     var xmlhttp = new XMLHttpRequest();
                     xmlhttp.onreadystatechange = function() {
                         if (this.readyState == 4 && this.status == 200) {}
                     };
                     xmlhttp.open("GET", "http://104.236.158.81/api/rateprofessorAPI.php?url=" + link + "&first=" + first.trim() + "&last=" + last.trim() + "&quality=" + quality + "&diff=" + difficult, true);
                     xmlhttp.send();
                   }
                 });
            count++;
          });
      setoff += 20;
    }
  });
}
