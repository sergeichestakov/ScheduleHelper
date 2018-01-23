import os
import lxml.html
import requests
from urllib2 import urlopen
from bs4 import BeautifulSoup

search = 'http://www.ratemyprofessors.com/search.jsp?query=&queryoption=HEADER&stateselect=&country=&dept=&queryBy=teacherName&facetSearch=&schoolName=University+of+California+Davis&offset='
pageCount = 219
offset = 0
count = 0

def scrapeProf(professor):
    #get their link and name
    link = professor.find("a", href=True)['href']
    name = professor.find("span", {"class": "main"}).text.split(',')
    if len(name):
        last = name[0].strip().encode('utf-8')
        first = name[1].strip().encode('utf-8')

    #open up each professors page to scrape their ratings
    profLink = 'http://www.ratemyprofessors.com' + link
    profPage = urlopen(profLink)
    professorSoup = BeautifulSoup(profPage, "lxml")

    ratings = professorSoup.find_all("div", {"class": "grade"})
    if len(ratings) > 2:
        overall = ratings[0].text.strip().encode('utf-8')
        difficulty = ratings[2].text.strip().encode('utf-8')

    #output
    global count
    count += 1
    if overall:
        print(count, first, last, overall, difficulty)
        #send over the data to populate db via get request
        data = {'url':link, 'first':first,'last':last, 'quality':overall, 'diff':difficulty}
        request = requests.get('https://getschedulehelper.com/api/rateprofessorAPI.php', params=data)


def scrapePage(offset):
    #open up the page
    results = search + str(offset)
    page = urlopen(results)
    soup = BeautifulSoup(page, "html.parser")
    listings = soup.find_all("li", {"class": "listing PROFESSOR"})

    #loop through each professor in results
    for professor in listings:
        scrapeProf(professor)


for index in range(pageCount):
    scrapePage(offset)
    offset += 20
