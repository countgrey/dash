import pythoncom
import win32com.client
import datetime
from flask import Flask, jsonify
from flask_cors import CORS

#Сюда путь к бд
CONSTR = 'File="C:\\Users\\admin\\Desktop\\InfoBase2";Usr="Administrator";Pwd="qwe123"'


def init():
    pythoncom.CoInitialize()
    V83 = win32com.client.Dispatch('V83.COMConnector').Connect(CONSTR)
    print('DBconnect done')
    return V83

#---------------------------Главная Функция--------------------------------
def getData(date):
    querytxt = f'''SELECT * FROM Документ.Занятие
                   JOIN Документ.Занятие.Студенты
                   ON Документ.Занятие.Ссылка = Документ.Занятие.Студенты.Ссылка
                   LEFT JOIN Документ.РасписаниеНаДату.Расписание
                   ON Документ.Занятие.Группа = Документ.РасписаниеНаДату.Расписание.УчебнаяГруппа
                   WHERE Документ.Занятие.Дата
                   BETWEEN DATETIME({date.year}, {date.month}, {date.day}, 0, 0, 0) 
                   AND DATETIME({date.year}, {date.month}, {date.day}, 23, 59, 59)'''

    query = init().NewObject('Query', querytxt)
    query_result = query.Execute().Choose()

    lessons = [{}, {}, {}, {}, {}, {}]

    while query_result.next():
        lesson_number = query_result.НомерПары - 1
        group_name = query_result.Группа.Наименование
        student_name = query_result.Студент.ФизЛицо.Наименование
        attendance = query_result.Явка
        classroom = "100"
        if(query_result.Аудитория):
            classroom = query_result.Аудитория.Код


        if group_name not in lessons[lesson_number]:
            lessons[lesson_number][group_name] = {"present": [], "absent": [], "classroom": classroom}

        if attendance:
            lessons[lesson_number][group_name]["present"].append(student_name)
        else:
            lessons[lesson_number][group_name]["absent"].append(student_name)

    return lessons


#--------------------------------Вывод в консоль------------------------------------------------
lessons = getData(datetime.date.today())
for lesson_number, lesson_data in enumerate(lessons):
    print("="*20)
    print(f"Пара {lesson_number + 1}:")
    for group_name, student_groups in lesson_data.items():
        present_students = student_groups["present"]
        absent_students = student_groups["absent"]
        classroom = student_groups["classroom"]
        num_students = len(present_students) + len(absent_students)

        print(
            f"  {group_name} ({num_students} Студентов, {len(present_students)} присуствуют, {len(absent_students)} отсутствуют) - Кабинет {classroom}")

        if present_students:
            print("    Присутствующие:")
            for student in present_students:
                print(f"      - {student}")

        if absent_students:
            print("    Отсутствующие:")
            for student in absent_students:
                print(f"      - {student}")
    print("=" * 20)


#-------------------Web API--------------------
app = Flask(__name__)
CORS(app)

@app.route('/getLessonsData', methods=['GET'])
def getLessonsData():
    return jsonify(getData(datetime.date.today()))

@app.route('/getClassroomsData', methods=['GET'])
def getClassroomsData():
    lessons = getData(datetime.date.today())

    classrooms = [[],[],[],[],[],[]]

    for lesson in lessons:
        for group, data in lesson.items():
            classroom_data = {
                'classroom': data['classroom'],
                'group': group,
                'present': len(data['present'])
            }
            classrooms[lessons.index(lesson)].append(classroom_data)

    return jsonify(classrooms)


app.run(port=5000, debug=True)
