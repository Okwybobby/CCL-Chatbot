import requests
from bson import ObjectId
from flask import Flask, render_template, jsonify, request, session
from flask_pymongo import PyMongo
import openai

openai.api_key = "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"


app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb+srv://harry123:7*Q9KMh%409XHW4rg@mongoyoutube.nhtraxd.mongodb.net/chatgpt"
# app.config["MONGO_URI"] = "mongodb+srv://denazirite:<password>@cluster0.yr0yegx.mongodb.net/?retryWrites=true&w=majority"

app.secret_key = 'ccl_bot'

app.config["MONGO_URI"] = "mongodb+srv://denazirite:admin1server@cluster0.yr0yegx.mongodb.net/ccl-bot?retryWrites=true&w=majority"
mongo = PyMongo(app)

all_sections = {"introduction":"Introduction", "about_cyphercrescent":"About CyperCrescent", 
                "our_team":"Our Team", "our_commitment":"Our Commitment", "our_clients":"Our Clients",
                "overview_template":"Overview","problems":"Problems",
                "proposed_solution":"Proposed Solution", "importance":"Importance/ Business value", 
                "benefits":"Benefits", "executive_summary":"Executive Summary"}

keys = ['about_cyphercrescent', 'our_team', 'our_commitment', 'our_clients', 
        'overview_template', 'introduction', 'problems', 'proposed_solution', 'importance', 'benefits', 'executive_summary'] 




@app.route("/")
def home():
    chats = mongo.db.chats.find({})
    # chats = {'áaa':'áaa', 'bbb':'áaa','ccc':'áaa'}
    myChats = [chat for chat in chats]
    # print(myChats)

    # Initialize an empty list in the session if it doesn't exist
    session.setdefault('answer_data_list', [])
    session.setdefault('question_data_list', [])
    
    if 'chat_session' not in session:
        # If not present, set it to 0
        session.setdefault('chat_session', 0)

    if 'section_index' not in session:
        session.setdefault('section_index', 0)

    max_session_chat = mongo.db.chats.find_one(sort=[("session", -1)])

    if max_session_chat:
        max_session = max_session_chat["session"]
        print(f"The maximum session value is: {max_session}")
        session['chat_session'] = int(max_session) + 1
    else:
        print("No documents found in the 'chats' collection.")
        # session.setdefault('chat_session', 1)
        session['chat_session'] = 1
        print(session['chat_session'])
        print(session)



    return render_template("index.html", myChats=myChats)


@app.route("/api", methods=["GET", "POST"])
def qa():
    print("HEEEELLLLLLOOOOOO")
    if request.method == "POST":
        print(request.json)
        question = request.json.get("question")

        chat = mongo.db.chats.find_one({"question": question})
        print(chat)
        if chat:            
            # Exclude _id field from the retrieved chat document
            chat.pop('_id', None)
            data = {"session": session['chat_session'], "question": question, "answer": f"{chat['answer']}"}

            return jsonify(data)
        else:
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=question,
                temperature=0.7,
                max_tokens=256,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
            print(response)

            data = {"session": str(session['chat_session']), "question": question,
                    "answer": response["choices"][0]["text"]}
            # mongo.db.chats.insert_one({"question": question, "answer": response["choices"][0]["text"]})
            mongo.db.chats.insert_one(data)

            # Append the values to the session list

            session['answer_data_list'].append(data)
            # return jsonify(data)

            # Remove _id field from all documents in the session list
            for item in session['answer_data_list']:
                item.pop('_id', None)

            results = session['answer_data_list']
            print('openai RETURED: ')
            print(results)
            print(session)
            # print(session['answer_data_list'])
            return jsonify(results)
    data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}

    return jsonify(data)


@app.route("/next", methods=["GET", "POST"])
def getnext():
    url = "http://54.174.77.47/api/v1/"
    chat_box = ""
    if request.method == "POST":
        print(request.json)
        section_ids = request.json.get("sections")
        print(section_ids)

        preview_sections = []

        for sectId in section_ids:
            s_id = keys.index(sectId)
            print("s_id ", s_id, '~ ', sectId)
            url + "questions/" + str(s_id)                    
            response = requests.get(url + "questions/" + str(s_id))
            json_response = response.json()
            

            if json_response["questions"] == []:
                   
                # print("URL......", url + "templates/" + str(s_id))  
                response = requests.get(url + "templates/" + str(s_id))
                json_response = response.json()    

                print("JSON RESPONSE NEW......", json_response)
                chat_box = ""
                if json_response["templates"][0].strip("[]") != '':
                    try:
                        chat_box = "**" + json_response["templates"][0].strip("[]").split('~')[0] + "**" + "\n\n" + json_response["templates"][0].strip("[]").split('~')[1] + "\n\n"
                        print("chat_box ......", chat_box)

                        data = {"session": str(session['chat_session']), "question": "",
                        "answer": chat_box}
                        
                        preview_sections.append(data)

                        # session['answer_data_list'].append(chat_box)

                    except Exception as e:
                        # st.info("Some other problem happened!")
                        print("An error occurred:", str(e))
                        # json_response["templates"][0].replace(':', '~')
                        # print(json_response)
                        # chat_box = "**" + json_response["templates"][0].strip("[]").split('~')[0] + "**" + "\n\n" + json_response["templates"][0].strip("[]").split('~')[1]
                        chat_box = "...>"
                else:
                    chat_box = "..."           
            else:
                print('ddd')

        
    # data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}
    return jsonify(preview_sections)
# @app.route('/call_python_function', methods=["GET", "POST"])


# @app.route("/next", methods=["GET", "POST"])
# def getnext():
#     url = "http://54.174.77.47/api/v1/"
#     chat_box = ""
#     if request.method == "POST":
#         print(request.json)
#         section_ids = request.json.get("sections")
#         print(section_ids)

#         preview_sections = []

#         for sectId in keys:
#             s_id = keys.index(sectId)
#             print("s_id ", s_id, '~ ', sectId)
#             url + "questions/" + str(s_id)                    
#             response = requests.get(url + "questions/" + str(s_id))
#             json_response = response.json()
            

#             if json_response["questions"] == []:
                   
#                 # print("URL......", url + "templates/" + str(s_id))  
#                 response = requests.get(url + "templates/" + str(s_id))
#                 json_response = response.json()    

#                 print("JSON RESPONSE NEW......", json_response)
#                 chat_box = ""
#                 if json_response["templates"][0].strip("[]") != '':
#                     try:
#                         chat_box = "**" + json_response["templates"][0].strip("[]").split('~')[0] + "**" + "\n\n" + json_response["templates"][0].strip("[]").split('~')[1] + "\n\n"
#                         print("chat_box ......", chat_box)

#                         data = {"session": str(session['chat_session']), "question": "",
#                         "answer": chat_box}
                        
#                         preview_sections.append(data)

#                         # session['answer_data_list'].append(chat_box)

#                     except Exception as e:
#                         # st.info("Some other problem happened!")
#                         print("An error occurred:", str(e))
#                         # json_response["templates"][0].replace(':', '~')
#                         # print(json_response)
#                         # chat_box = "**" + json_response["templates"][0].strip("[]").split('~')[0] + "**" + "\n\n" + json_response["templates"][0].strip("[]").split('~')[1]
#                         chat_box = "...>"
#                 else:
#                     chat_box = "..."           
#             else:
#                 print('ddd')

        
#     # data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}
#     return jsonify(preview_sections)

# def call_python_function():
    # if request.method == "POST":
    #     print(request.json)
    #     question = request.json.get("question")
    #     # chat = mongo.db.chats.find_one({"question": question})
    #     chat = mongo.db.chats.find_one({"question": question})
    #     print(chat)
    #     if chat:
    #         data = {"question": question, "answer": f"{chat['answer']}"}
    #         return jsonify(data)
    #     else:
    #         response = openai.Completion.create(
    #                 model="text-davinci-003",
    #                 prompt=question,
    #                 temperature=0.7,
    #                 max_tokens=256,
    #                 top_p=1,
    #                 frequency_penalty=0,
    #                 presence_penalty=0
    #                 )
    #         print(response)
    #         data = {"question": question, "answer": response["choices"][0]["text"]}
    #         mongo.db.chats.insert_one({"question": question, "answer": response["choices"][0]["text"]})
    #         return jsonify(data)
    # data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}

    # return jsonify(data)

    # data = request.json

    # result =
    # # param1 = data.get('param1')
    # # param2 = data.get('param2')
    # # result = your_python_function(param1, param2)
    # return jsonify(result=result)


app.run(debug=True, port=5001)
