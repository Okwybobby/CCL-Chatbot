import os
import markdown

import requests
from bson import ObjectId
from flask import Flask, render_template, jsonify, request, session, Response
from flask_pymongo import PyMongo
import openai

openai.api_key = "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"


app = Flask(__name__)
app.secret_key = 'ccl_bot'

app.config["MONGO_URI"] = "mongodb+srv://denazirite:admin1server@cluster0.yr0yegx.mongodb.net/ccl-bot?retryWrites=true&w=majority"
mongo = PyMongo(app)

all_sections = {"introduction": "Introduction", "about_cyphercrescent": "About CyperCrescent",
                "our_team": "Our Team", "our_commitment": "Our Commitment", "our_clients": "Our Clients",
                "overview_template": "Overview", "problems": "Problems",
                "proposed_solution": "Proposed Solution", "importance": "Importance/ Business value",
                "benefits": "Benefits", "executive_summary": "Executive Summary"}

keys = ['about_cyphercrescent', 'our_team', 'our_commitment', 'our_clients',
        'overview_template', 'introduction', 'problems', 'proposed_solution', 'importance', 'benefits', 'executive_summary']


@app.route("/")
def home():    
    
    url = "http://54.174.77.47/api/v1/chat"
    i = str(1)
    url = "http://54.174.77.47/api/v1/conversations/user/" + i

    headers = {'accept': 'application/json'}

    response = requests.get(url, headers=headers)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()  # Assuming the response is in JSON format        
    else:
        print(f"Error: {response.status_code}")        

    prompts_array = []
    # Extracting the 'prompts' array from the first item in the 'data' list
    try:
        
        # prompts_array = data[0]['prompts']        
        prompts_array = [item["conversation_name"].strip() for item in data]
        # prompts_array = data[0]['conversation_name']
        # print(prompts_array)
    except Exception as e:
        prompts_array = []  
        print('error', e)  

    # chats = prompts_array
    myChats = prompts_array
    
    # myChats = [chat for chat in chats]    
    print(myChats)

    # # Initialize an empty list in the session if it doesn't exist
    # session.setdefault('answer_data_list', [])
    # session.setdefault('answer_letter', [])
    # session.setdefault('question_data_list', [])

    # if 'nda_question_list' not in session:
    #     # print('DELETING nda_question_list!!!!')
    #     session.setdefault('nda_question_list', [])

    # if 'chat_session' not in session:
    #     # If not present, set it to 0
    #     session.setdefault('chat_session', 0)

    # if 'section_index' not in session:
    #     session.setdefault('section_index', 0)

    # max_session_chat = mongo.db.chats.find_one(sort=[("session", -1)])

    # if max_session_chat:
    #     max_session = max_session_chat["session"]
    #     # print(f"The maximum session value is: {max_session}")
    #     session['chat_session'] = int(max_session) + 1
    # else:
    #     # print("No documents found in the 'chats' collection.")        
    #     session['chat_session'] = 1
    #     # print(session['chat_session'])
    #     # print(session)

    return render_template("index.html", myChats=myChats)


@app.route("/api", methods=["GET", "POST"])
def chat2():
    host="54.174.77.47"
    # host ="localhost:8000"
    # api_url = f"http://{host}/api/v1/chat/stream"
    api_url = f"http://{host}/api/v1/chat/stream"
    
    if request.method == 'POST':          
        print('Entered POST...')
        print(request.json)
        messages = request.json['messages']
        prompt_data = messages[0]

        try:
            response = requests.post(
                api_url,
                json=prompt_data,
                stream=True,
                headers={"accept": "application/json"},
            )

            if response.status_code == 200:
                print('Returned 200 ...')
                def event_stream():
                    print('Entered event_stream...')
                    for chunk in response.iter_content():
                        if chunk:
                            try:
                                print(str(chunk, encoding="utf-8"), end="")
                                # return str(chunk, encoding="utf-8")
                                line = str(chunk, encoding="utf-8")
                                text = line
                                if len(text): 
                                    yield text
                                    
                            except Exception as e:
                                print(e)
                return Response(event_stream(), mimetype='text/event-stream')         
            else:
                print(f"Error: {response.status_code}\n{response.text}")
                return (f"Error: {response.status_code}\n{response.text}")

        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")

    return 'Nothing...'        
       

@app.route("/api2", methods=["GET", "POST"])
def qaddd():
    results = ''
    # print("API :::::")
    url = "http://54.174.77.47/api/v1/chat"

    headers = {
        "Content-Type": "application/json",
    }

    if request.method == "POST":       

        data = request.json
        response = requests.post(url, json=data, headers=headers)

        if response.status_code == 200:
            # Request was successful
            response_json = response.json()

            # print("API response:", response_json)
            # print("API response:.........:::::::", response_json.get("AI"))
            # session['answer_data_list'].append(response_json.get("AI"))
            # session['question_data_list'].append(response_json.get("Human"))
            results = response_json
        else:
            # Request failed
            print(f"Error: {response.status_code} - {response.text}")

            # Combine lists into a dictionary
            # results = dict(zip(session['question_data_list'], session['answer_data_list']))       

    return jsonify(results)

@app.route("/proposal", methods=["GET", "POST"])
def getproposal():
    url = "http://54.174.77.47/api/v1/generate/proposal/stream"
    chat_box = ""
    if request.method == "POST":
        # print(request.json)
        # section_ids = request.json.get("sections")
        # print(section_ids)        

        headers = {
        "Content-Type": "application/json",
        }
        # data = request.json['context']
        data = request.json
        print('data....', data)


        try:
            response = requests.post(
                url,
                json=data,
                stream=True,
                headers={"Content-Type": "application/json"},
            )


        # response = requests.post(url, json=data, headers=headers)

        

            if response.status_code == 200:

                print('Returned 200 ...')
                # print(response.json())
                # print('response ......')
                # print(response.text )
                # Request was successful

                def event_stream():
                    print('Entered event_stream...')
                    for chunk in response.iter_content():
                        if chunk:
                            try:
                                print(str(chunk, encoding="utf-8"), end="")
                                # return str(chunk, encoding="utf-8")
                                line = str(chunk, encoding="utf-8")
                                text = line
                                if len(text): 
                                    yield text
                                        
                            except Exception as e:
                                    print(e)
                return Response(event_stream(), mimetype='text/event-stream')         
            else:
                print(f"Error: {response.status_code}\n{response.text}")
                return (f"Error: {response.status_code}\n{response.text}")

        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
    return 'Request failed...'




###############################
    #         response_json = response.text
    #         return jsonify(response_json)
    #     else:
    #         # Request failed
    #         print(f"Error: {response.status_code} - {response.text}")                

    # # data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}
    # return jsonify("Nothing...")



@app.route("/next", methods=["GET", "POST"])
def getnext():
    url = "http://54.174.77.47/api/v1/"
    chat_box = ""
    if request.method == "POST":
        # print(request.json)
        section_ids = request.json.get("sections")
        # print(section_ids)

        preview_sections = []

        for sectId in section_ids:
            s_id = keys.index(sectId)
            # print("s_id ", s_id, '~ ', sectId)
            url + "questions/" + str(s_id)
            response = requests.get(url + "questions/" + str(s_id))
            json_response = response.json()

            if json_response["questions"] == []:                
                response = requests.get(url + "templates/" + str(s_id))
                json_response = response.json()

                # print("JSON RESPONSE NEW......", json_response)
                chat_box = ""
                if json_response["templates"][0].strip("[]") != '':
                    try:
                        chat_box = "**" + json_response["templates"][0].strip("[]").split(
                            '~')[0] + "**" + "\n\n" + json_response["templates"][0].strip("[]").split('~')[1] + "\n\n"
                        # print("chat_box ......", chat_box)

                        data = {"session": str(session['chat_session']), "question": "",
                                "answer": markdown.markdown(chat_box)}

                        preview_sections.append(data)                        

                    except Exception as e:
                        # st.info("Some other problem happened!")
                        # print("An error occurred:", str(e))
                        # json_response["templates"][0].replace(':', '~')                        
                        # chat_box = "**" + json_response["templates"][0].strip("[]").split('~')[0] + "**" + "\n\n" + json_response["templates"][0].strip("[]").split('~')[1]
                        chat_box = "...>"
                else:
                    chat_box = "..."
            elif json_response["section_name"] == "overview_template":
                chat_box = "**OVERVIEW** + \n\n CypherCrescent's Cutting-Edge Production Optimization System tackles Nigeria's oil industry challenges with precision. By integrating advanced tech and adaptive algorithms, it delivers real-time data analytics for informed decision-making. What sets us apart is tailored solutions to individual operational nuances, ensuring a dynamic, sustainable, and efficient production optimization that stands ahead in the market."
                data = {"session": str(session['chat_session']), "question": "",
                        "answer": markdown.markdown(chat_box)}

                preview_sections.append(data)
                
            elif json_response["section_name"] == "introduction":
                chat_box = "**INTRODUCTION** + \n\n In the dynamic landscape of Nigeria's oil industry, CypherCrescent introduces the Cutting-Edge Production Optimization System. This groundbreaking solution leverages advanced technology and adaptive algorithms, promising unparalleled precision in wellhead simulations. As manufacturing efficiency takes center stage, CypherCrescent emerges as a transformative force, revolutionizing production optimization."
                data = {"session": str(session['chat_session']), "question": "",
                        "answer": markdown.markdown(chat_box)}

                preview_sections.append(data)
            elif json_response["section_name"] == "problems":
                chat_box = "**PROBLEMS** + \n\n The challenges facing Nigeria's oil companies demand a revolutionary solution. CypherCrescent's Cutting-Edge Production Optimization System addresses critical issues in wellhead simulation and manufacturing efficiency. Through advanced technology and adaptive algorithms, it offers a tailored approach to individual operational challenges, setting a new benchmark in the industry."
                data = {"session": str(session['chat_session']), "question": "",
                        "answer": markdown.markdown(chat_box)}

                preview_sections.append(data)
            elif json_response["section_name"] == "executive_summary":
                chat_box = "**EXECUTIVE SUMMARY** + \n\n CypherCrescent's Cutting-Edge Production Optimization System presents a paradigm shift for Nigeria's oil companies. By seamlessly integrating advanced technology and adaptive algorithms, our solution ensures real-time precision in wellhead simulations. Tailored to address unique operational challenges, it stands as a dynamic, sustainable, and efficient production optimization system, poised to redefine industry standards."
                data = {"session": str(session['chat_session']), "question": "",
                        "answer": markdown.markdown(chat_box)}

                preview_sections.append(data)

    # data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}
    return jsonify(preview_sections)


@app.route("/letter", methods=["GET", "POST"])
def qletter():
    host="54.174.77.47"
    # host ="localhost:8000"   

    api_url = f"http://{host}/api/v1/letter/stream"
    
    if request.method == 'POST':          
        print('Entered POST...')
        print(request.json)
        # messages = request.json['messages']
        data = request.json
        prompt_data = messages[0]

        prompt_data = {
            "context": data
        }

        try:
            response = requests.post(
                api_url,
                json=prompt_data,
                stream=True,
                headers={"accept": "application/json"},
            )

            if response.status_code == 200:
                print('Returned 200 ...')
                def event_stream():
                    print('Entered event_stream...')
                    for chunk in response.iter_content():
                        if chunk:
                            try:
                                print(str(chunk, encoding="utf-8"), end="")
                                # return str(chunk, encoding="utf-8")
                                line = str(chunk, encoding="utf-8")
                                text = line
                                if len(text): 
                                    yield text
                                    
                            except Exception as e:
                                print(e)
                return Response(event_stream(), mimetype='text/event-stream')         
            else:
                print(f"Error: {response.status_code}\n{response.text}")
                return (f"Error: {response.status_code}\n{response.text}")

        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")

    return 'Nothing...'        
      

# def qletter():
#     # print("HEEEELLLLLLOOOOOO")
#     if request.method == "POST":
#         # print(request.json)
#         # response_json = request.json.get("context")

#         url = "http://54.174.77.47/api/v1/letter"

#         headers = {
#         "Content-Type": "application/json",
#         }
#         # data = request.json['context']
#         data = request.json
#         response = requests.post(url, json=data, headers=headers)

#         if response.status_code == 200:

#             # print(response.json())
#             # Request was successful
#             response_json = response.json().get("text")
#             return jsonify(response_json)
#         else:
#             # Request failed
#             print(f"Error: {response.status_code} - {response.text}")

    
#     return jsonify('no results')


@app.route("/nda", methods=["GET", "POST"])
def qnda():
    print("HEEEELLLLLLOOOOOO")
    url = 'http://54.174.77.47/api/v1/NDA/generate/stream'
    chat_box = ""
    preview_sections = []

    if request.method == "POST":
        # print(request.json)

        json_payload = request.json

        # data = {'answers': json_payload}            
        data = json_payload          

        headers = {
            "Content-Type": "application/json",
        }

        print('nda_answer_list....:::', data)
        response = requests.post(url, json=data, headers=headers)
        # Check the response
        if response.status_code == 200:

            print('Success!')
            # print(response.json())
            print(response)
            response_json = response.json().get("NDA")                        
            return jsonify(response_json)
        else:
            print('Error:', response.status_code)
            # print(response.text)
      
    return jsonify('an error occured')
   

port = int(os.environ.get('PORT', 5001))

# app.run(debug=True)
