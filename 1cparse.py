import pythoncom
import win32com.client
import datetime
from flask import Flask, jsonify
from flask_cors import CORS

# Сюда путь к бд
CONSTR = 'File="C:\\Users\\champ\\Desktop\\InfoBase2";Usr="Administrator";Pwd="qwe123"'

def database_fetch(querytxt):
    # Создать подключение
    pythoncom.CoInitialize()
    V83 = win32com.client.Dispatch('V83.COMConnector').Connect(CONSTR)
    print('DBconnect done')

    # Запрос в бд
    query = V83.NewObject('Query', querytxt)
    query_result = query.Execute().Choose()
    return query_result


# ----------------------------Данные по преподам-----------------------------------
def get_teachers_data():
    querytxt = f'''SELECT * FROM Документ.Сотрудники WHERE Преподаватель = TRUE'''
    query_result = database_fetch(querytxt)
    teachers = []
    while query_result.next():
        name = query_result.Физлицо.Наименование
        teachers.append({'name': name})

    return teachers

# ----------------------------Данные по студентам----------------------------------
def get_students_data():
    querytxt = f''''''
    query_result = database_fetch(querytxt)
    students = []
    while query_result.next():
        pass

    return students

# ----------------------------Данные по кабинетам----------------------------------
def get_classroom_data(date):
    querytxt = f'''SELECT * FROM Документ.Занятие
                   JOIN Документ.Занятие.Студенты
                   ON Документ.Занятие.Ссылка = Документ.Занятие.Студенты.Ссылка
                   
                   WHERE Дата
                   BETWEEN DATETIME({date.year}, {date.month}, {date.day}, 0, 0, 0)
                   AND DATETIME({date.year}, {date.month}, {date.day}, 23, 59, 59)'''

    query_result = database_fetch(querytxt)

    lessons = [{}, {}, {}, {}, {}, {}]

    while query_result.next():
        lesson_number = query_result.НомерПары - 1
        group_name = query_result.Группа.Наименование
        student_name = query_result.Студент.ФизЛицо
        attendance = query_result.Явка

        if group_name not in lessons[lesson_number]:
            lessons[lesson_number][group_name] = {"present": [], "absent": [], "classroom": "", "teacher": ""}

        if attendance:
            lessons[lesson_number][group_name]["present"].append(student_name)
        else:
            lessons[lesson_number][group_name]["absent"].append(student_name)

    # Второй запрос 💀💀💀💀 (добавляет кабинеты к занятиям) 

    querytxt = f'''SELECT * FROM Документ.РасписаниеНаДату

                   JOIN Документ.РасписаниеНаДату.Расписание
                   ON Документ.РасписаниеНаДату.Ссылка = Документ.РасписаниеНаДату.Расписание.Ссылка

                   WHERE ДатаРасписания BETWEEN DATETIME({date.year}, {date.month}, {date.day}, 0, 0, 0)
                   AND DATETIME({date.year}, {date.month}, {date.day}, 23, 59, 59)'''

    query_result = database_fetch(querytxt)

    while query_result.next():
        lesson_number = query_result.НомерПары - 1
        group_name = query_result.УчебнаяГруппа.Наименование
        teacher = query_result.Преподаватель.Физлицо.Наименование
        classroom = "100"
        if query_result.Аудитория:
            classroom = query_result.Аудитория.Наименование
        
        lessons[lesson_number][group_name]["classroom"] = classroom
        lessons[lesson_number][group_name]["teacher"] = teacher



    return lessons



# -------------------Web API--------------------
app = Flask(__name__)
CORS(app)

@app.route('/getClassroomsData', methods=['GET'])
def getClassroomsData():
    lessons = get_classroom_data(datetime.date.today())

    classrooms = [[], [], [], [], [], []]

    for lesson in lessons:
        for group, data in lesson.items():
            classroom_data = {
                'classroom': data['classroom'],
                'group': group,
                'teacher': data['teacher'],
                'present': len(data['present'])
            }
            classrooms[lessons.index(lesson)].append(classroom_data)

    return jsonify(classrooms)

@app.route('/getTeachersData', methods=['GET'])
def getTeachersData():
    teachers = get_teachers_data()
    return jsonify(teachers)

@app.route('/getStudentsData', methods=['GET'])
def getStudentsData():
    students = get_students_data()
    return jsonify(students)

app.run(port=5000, debug=True)
