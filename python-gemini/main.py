from google import genai

client = genai.Client(api_key="AIzaSyDhrgv_yXR1pPrpG4xZmq3wpCFLmVH3tpQ")
history = {}
while True:
    prompt = input("Type something: ")

    response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
    its_quiries.append(response)
    print("its response: " + response.text)
