
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['GET'])
def predict():
    """
    Placeholder for hyperlocal weather prediction.
    Takes lat and lon as query parameters.
    """
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({'error': 'lat and lon parameters are required'}), 400

    # Dummy forecast data
    dummy_forecast = {
        'location': {
            'lat': lat,
            'lon': lon
        },
        'forecast': [
            {
                'day': 'Today',
                'temp_max': 32,
                'temp_min': 25,
                'condition': 'Partly Cloudy'
            },
            {
                'day': 'Tomorrow',
                'temp_max': 33,
                'temp_min': 26,
                'condition': 'Sunny'
            },
            {
                'day': 'Day after tomorrow',
                'temp_max': 31,
                'temp_min': 24,
                'condition': 'Light Rain'
            }
        ]
    }

    return jsonify(dummy_forecast)

if __name__ == '__main__':
    app.run(debug=True)
