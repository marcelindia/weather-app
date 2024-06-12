from flask import Flask, request, render_template, jsonify
import requests
from config import API_KEY
from flask_cors import CORS
from flask import url_for


app = Flask(__name__, template_folder="../FE/templates", static_folder='../FE/static')

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.form.get('city')
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        temp = data['main']['temp']
        desc = data['weather'][0]['description']
        temp_fahrenheit = (temp - 273.15) * 9/5 + 32
        rounded_temp=round(temp_fahrenheit)
        return jsonify({'temperature': rounded_temp, 'description': desc})
    else:
        return jsonify({'error': response.status_code, 'message': response.json().get("message", "")})

if __name__ == '__main__':
    app.run(debug=True)
