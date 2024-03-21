from flask import Flask, jsonify
from flask_cors import CORS

import requests

classrooms_data = [
    {"number": 101, "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
    {"number": 102, "capacity": 25, "students": 10, "groups": ["1м1"]},
    {"number": 103, "capacity": 20, "students": 20, "groups": ["2бу1"]},
]

def fetch_classrooms(api_url):
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            classrooms = data.get('classrooms', [])
            return classrooms
        else:
            print("Ошибка при получении данных:", response.status_code)
            return None
    except requests.exceptions.RequestException as e:
        print("Ошибка при выполнении запроса:", e)
        return None

def main():
    api_url = 'http://your_1c_api_url/classrooms'  # URL API 1С
    classrooms = fetch_classrooms(api_url)
    if classrooms:
        #bim bim bam bam
        pass
    else:
        print("Не удалось получить данные о кабинетах.")

app = Flask(__name__)
CORS(app)



@app.route('/classrooms')
def get_classrooms():
    return jsonify({'classrooms': classrooms_data})

if __name__ == '__main__':
    #main()
    app.run(debug=True)