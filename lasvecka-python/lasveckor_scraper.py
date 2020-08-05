import requests
import json
from bs4 import BeautifulSoup

url = 'https://student.portal.chalmers.se/sv/chalmersstudier/Sidor/Lasarstider.aspx'

response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

text = soup.findAll('span')

# Store dates when a period starts
data = {}
current_line = 0
for line in text:
    if line.string is not None:
        if "Läsperiod" in line.string:
            # print(text[current_line + 2].string)
            data[text[current_line + 2].string] = "study_period"
            # data.append((text[current_line + 2].string, "study_period"))
        if "Tentamensperiod" in line.string:
            # print(text[current_line + 2].string)
            # data.append((text[current_line + 2].string, "exam_period"))
            data[text[current_line + 2].string] = "exam_period"
        # if "Omtentamensperiod" in line.string:
            # print(text[current_line + 2].string)
            # data.append((text[current_line + 2].string, "reexam_period"))
            # data[text[current_line + 2].string] = "reexam_period"
    current_line = current_line + 1
with open('data.txt', 'w') as outfile:
    outfile.write(json.dumps(data))
