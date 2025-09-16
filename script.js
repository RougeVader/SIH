document.addEventListener('DOMContentLoaded', () => {
    const stateSelect = document.getElementById('state-select');
    const citySelect = document.getElementById('city-select');
    const submitCropButton = document.getElementById('submit-crop');
    const plantedCropInput = document.getElementById('planted-crop');
    const nextStepsDiv = document.getElementById('next-steps');
    const languageSelect = document.getElementById('language-select');
    const weatherDataContainer = document.getElementById('weather-data');
    const recommendationDataContainer = document.getElementById('recommendation-data');

    // IMPORTANT: Add your OpenWeatherMap API key here
    const apiKey = "4fe2178b56af6cfe166e09ed346d46dd";

    const translations = {
        en: {
            title: "AgroWeather India",
            subtitle: "Your trusted partner in farming",
            select_location: "📍 Select Your Location",
            select_state: "Select State",
            select_city: "Select City",
            live_weather: "☀️ Live Weather Report",
            select_location_weather: "Select a location to see the weather.",
            crop_recommendation: "🌱 Crop Recommendation",
            crop_suggestions: "Weather-based crop suggestions will appear here.",
            your_crop_info: "🌾 Your Crop Information",
            what_crop: "What crop have you planted?",
            get_advice: "Get Advice",
            fetching_weather: "Fetching weather...",
            recommended_crops: "Recommended Crops for Current Weather:",
            no_crops: "No specific crop recommendations for the current weather."
        },
        hi: {
            title: "एग्रोवेदर इंडिया",
            subtitle: "खेती में आपका विश्वसनीय साथी",
            select_location: "📍 अपना स्थान चुनें",
            select_state: "राज्य चुनें",
            select_city: "शहर चुनें",
            live_weather: "☀️ लाइव मौसम रिपोर्ट",
            select_location_weather: "मौसम देखने के लिए एक स्थान चुनें।",
            crop_recommendation: "🌱 फसल की सिफारिश",
            crop_suggestions: "मौसम आधारित फसल सुझाव यहां दिखाई देंगे।",
            your_crop_info: "🌾 आपकी फसल की जानकारी",
            what_crop: "आपने कौन सी फसल लगाई है?",
            get_advice: "सलाह लें",
            fetching_weather: "मौसम की जानकारी ली जा रही है...",
            recommended_crops: "वर्तमान मौसम के लिए अनुशंसित फसलें:",
            no_crops: "वर्तमान मौसम के लिए कोई विशिष्ट फसल सिफारिशें नहीं हैं।"
        },
        bn: { // Bengali
            title: "এগ্রোওয়েদার ইন্ডিয়া",
            subtitle: "চাষে আপনার বিশ্বস্ত সঙ্গী",
            select_location: "📍 আপনার অবস্থান নির্বাচন করুন",
            select_state: "রাজ্য নির্বাচন করুন",
            select_city: "শহর নির্বাচন করুন",
            live_weather: "☀️ লাইভ আবহাওয়ার প্রতিবেদন",
            select_location_weather: "আবহাওয়া দেখতে একটি অবস্থান নির্বাচন করুন।",
            crop_recommendation: "🌱 ফসল সুপারিশ",
            crop_suggestions: "আবহাওয়া ভিত্তিক ফসলের পরামর্শ এখানে প্রদর্শিত হবে।",
            your_crop_info: "🌾 আপনার ফসল ಮಾಹಿತಿ",
            what_crop: "আপনি কোন ফসল রোপণ করেছেন?",
            get_advice: "পरामর্শ পান",
            fetching_weather: "আবহাওয়ার তথ্য আনা হচ্ছে...",
            recommended_crops: "বর্তমান আবহাওয়ার জন্য প্রস্তাবিত ফসল:",
            no_crops: "বর্তমান আবহাওয়ার জন্য কোন নির্দিষ্ট ফসল সুপারিশ নেই।"
        },
        mr: { // Marathi
            title: "अ‍ॅग्रोवेदर इंडिया",
            subtitle: "शेतीत तुमचा विश्वासू भागीदार",
            select_location: "📍 तुमचे स्थान निवडा",
            select_state: "राज्य निवडा",
            select_city: "शहर निवडा",
            live_weather: "☀️ थेट हवामान अहवाल",
            select_location_weather: "हवामान पाहण्यासाठी एक स्थान निवडा.",
            crop_recommendation: "🌱 पीक शिफारस",
            crop_suggestions: " हवामानावर आधारित पीक सूचना येथे दिसतील.",
            your_crop_info: "🌾 तुमची पीक माहिती",
            what_crop: "तुम्ही कोणते पीक लावले आहे?",
            get_advice: "सल्ला घ्या",
            fetching_weather: "हवामान माहिती आणत आहे...",
            recommended_crops: "सध्याच्या हवामानासाठी शिफारस केलेली पिके:",
            no_crops: "सध्याच्या हवामानासाठी कोणत्याही विशिष्ट पीक शिफारसी नाहीत."
        },
        te: { // Telugu
            title: "అగ్రోవెదర్ ఇండియా",
            subtitle: "వ్యవసాయంలో మీ నమ్మకమైన భాగస్వామి",
            select_location: "📍 మీ స్థానాన్ని ఎంచుకోండి",
            select_state: "రాష్ట్రాన్ని ఎంచుకోండి",
            select_city: "నగరాన్ని ఎంచుకోండి",
            live_weather: "☀️ ప్రత్యక్ష వాతావరణ నివేదిక",
            select_location_weather: "వాతావరణం చూడటానికి ఒక స్థానాన్ని ఎంచుకోండి.",
            crop_recommendation: "🌱 పంట సిఫార్సు",
            crop_suggestions: "వాతావరణ ఆధారిత పంట సూచనలు ఇక్కడ కనిపిస్తాయి.",
            your_crop_info: "🌾 మీ పంట సమాచారం",
            what_crop: "మీరు ఏ పంటను నాటారు?",
            get_advice: "సలహా పొందండి",
            fetching_weather: "వాతావరణ సమాచారం పొందుతోంది...",
            recommended_crops: "ప్రస్తుత వాతావరణానికి సిఫార్సు చేయబడిన పంటలు:",
            no_crops: "ప్రస్తుత వాతావరణానికి నిర్దిష్ట పంట సిఫార్సులు లేవు."
        },
        ta: { // Tamil
            title: "அக்ரோவெதர் இந்தியா",
            subtitle: "விவசாயத்தில் உங்கள் நம்பகமான கூட்டாளர்",
            select_location: "📍 உங்கள் இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்",
            select_state: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
            select_city: "நகரத்தைத் தேர்ந்தெடுக்கவும்",
            live_weather: "☀️ நேரடி வானிலை அறிக்கை",
            select_location_weather: "வானிலையைப் பார்க்க ஒரு இடத்தைத் தேர்ந்தெடுக்கவும்.",
            crop_recommendation: "🌱 பயிர் பரிந்துரை",
            crop_suggestions: "வானிலை அடிப்படையிலான பயிர் பரிந்துரைகள் இங்கே தோன்றும்.",
            your_crop_info: "🌾 உங்கள் பயிர் தகவல்",
            what_crop: "நீங்கள் என்ன பயிர் நட்டுள்ளீர்கள்?",
            get_advice: "ஆலோசனை பெறுங்கள்",
            fetching_weather: "வானிலை தகவல் பெறப்படுகிறது...",
            recommended_crops: "தற்போதைய வானிலைக்கான பரிந்துரைக்கப்பட்ட பயிர்கள்:",
            no_crops: "தற்போதைய வானிலைக்கு குறிப்பிட்ட பயிர் பரிந்துரைகள் எதுவும் இல்லை."
        },
        gu: { // Gujarati
            title: "એગ્રોવેધર ઇન્ડિયા",
            subtitle: "ખેતીમાં તમારા વિશ્વાસુ ભાગીદાર",
            select_location: "📍 તમારું સ્થાન પસંદ કરો",
            select_state: "રાજ્ય પસંદ કરો",
            select_city: "શહેર પસંદ કરો",
            live_weather: "☀️ જીવંત હવામાન અહેવાલ",
            select_location_weather: "હવામાન જોવા માટે એક સ્થાન પસંદ કરો.",
            crop_recommendation: "🌱 પાકની ભલામણ",
            crop_suggestions: "હવામાન આધારિત પાક સૂચનો અહીં દેખાશે.",
            your_crop_info: "🌾 તમારી પાકની માહિતી",
            what_crop: "તમે કયો પાક વાવ્યો છે?",
            get_advice: "સલાહ મેળવો",
            fetching_weather: "હવામાન માહિતી મેળવી રહી છે...",
            recommended_crops: "વર્તમાન હવામાન માટે ભલામણ કરેલ પાક:",
            no_crops: "વર્તમાન હવામાન માટે કોઈ વિશિષ્ટ પાક ભલામણો નથી."
        },
        ur: { // Urdu
            title: "ایگرو ویدر انڈیا",
            subtitle: "کھیتی باڑی میں آپ کا قابل اعتماد ساتھی",
            select_location: "📍 اپنا مقام منتخب کریں",
            select_state: "ریاست منتخب کریں",
            select_city: "شہر منتخب کریں",
            live_weather: "☀️ براہ راست موسم کی رپورٹ",
            select_location_weather: "موسم دیکھنے کے لیے ایک مقام منتخب کریں۔",
            crop_recommendation: "🌱 فصل کی سفارش",
            crop_suggestions: "موسم پر مبنی فصل کی تجاویز یہاں ظاہر ہوں گی۔",
            your_crop_info: "🌾 آپ کی فصل کی معلومات",
            what_crop: "آپ نے کون سی فصل لگائی ہے؟",
            get_advice: "مشورہ لیں",
            fetching_weather: "موسم کی معلومات حاصل کی جا رہی ہیں۔..",
            recommended_crops: "موجودہ موسم کے لیے تجویز کردہ فصلیں:",
            no_crops: "موجودہ موسم کے لیے کوئی خاص فصل کی سفارشات نہیں ہیں۔"
        },
        kn: { // Kannada
            title: "ಅಗ್ರೋವೆದರ್ ಇಂಡಿಯಾ",
            subtitle: "ಕೃಷಿಯಲ್ಲಿ ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಪಾಲುದಾರ",
            select_location: "📍 ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            select_state: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            select_city: "ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            live_weather: "☀️ ప్రత్యక్ష ಹವಾಮಾನ ವರದಿ",
            select_location_weather: "ಹವಾಮಾನವನ್ನು ನೋಡಲು ఒక ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
            crop_recommendation: "🌱 ಬೆಳೆ ಶಿಫಾರಸು",
            crop_suggestions: "ಹವಾಮಾನ ಆಧಾರಿತ ಬೆಳೆ ಸಲಹೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
            your_crop_info: "🌾 ನಿಮ್ಮ ಬೆಳೆ ಮಾಹಿತಿ",
            what_crop: "ನೀವು ಯಾವ ಬೆಳೆಯನ್ನು ನೆಟ್ಟಿದ್ದೀರಿ?",
            get_advice: "ಸಲಹೆ ಪಡೆಯಿರಿ",
            fetching_weather: "ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ತರಲಾಗುತ್ತಿದೆ...",
            recommended_crops: "ಪ್ರಸ್ತುತ ಹವಾಮಾನಕ್ಕಾಗಿ ಶಿಫಾರಸು ಮಾಡಲಾದ ಬೆಳೆಗಳು:",
            no_crops: "ಪ್ರಸ್ತುತ ಹವಾಮಾನಕ್ಕೆ ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಬೆಳೆ ಶಿಫಾರಸುಗಳಿಲ್ಲ."
        }
    };

    const indianStatesAndCities = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore"],
        "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila"],
        "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
        "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
        "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala"],
        "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
        "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
        "Manipur": ["Imphal", "Bishnupur", "Churachandpur", "Thoubal"],
        "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
        "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
        "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
        "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
        "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"]
    };

    const cropDatabase = [
        { name: "Rice", ideal_temp: [20, 37], ideal_condition: ["Rain", "Clouds", "Drizzle"] },
        { name: "Wheat", ideal_temp: [10, 25], ideal_condition: ["Clear", "Clouds"] },
        { name: "Cotton", ideal_temp: [21, 35], ideal_condition: ["Clear"] },
        { name: "Sugarcane", ideal_temp: [20, 30], ideal_condition: ["Clear", "Rain"] },
        { name: "Maize", ideal_temp: [21, 27], ideal_condition: ["Clear", "Clouds"] },
        { name: "Potato", ideal_temp: [15, 25], ideal_condition: ["Clear", "Clouds"] },
        { name: "Soybean", ideal_temp: [25, 32], ideal_condition: ["Clear", "Clouds"] },
        { name: "Mustard", ideal_temp: [10, 25], ideal_condition: ["Clear", "Clouds"] }
    ];

    // Populate states
    for (const state in indianStatesAndCities) {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }

    // Handle state change
    stateSelect.addEventListener('change', () => {
        const selectedState = stateSelect.value;
        const cities = indianStatesAndCities[selectedState] || [];
        citySelect.innerHTML = `<option value="">${translations[languageSelect.value].select_city}</option>`;
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
        // Clear weather and recommendations
        weatherDataContainer.innerHTML = `<p data-translate="select_location_weather">${translations[languageSelect.value].select_location_weather}</p>`;
        recommendationDataContainer.innerHTML = `<p data-translate="crop_suggestions">${translations[languageSelect.value].crop_suggestions}</p>`;
    });

    const weatherSpinner = weatherDataContainer.querySelector('.spinner');
    const recommendationSpinner = recommendationDataContainer.querySelector('.spinner');

    // Handle city change to fetch weather and recommendations
    citySelect.addEventListener('change', () => {
        const city = citySelect.value;
        if (!city) return;

        // Show spinners and hide text
        weatherSpinner.classList.remove('hidden');
        recommendationSpinner.classList.remove('hidden');
        weatherDataContainer.querySelector('p').classList.add('hidden');
        recommendationDataContainer.querySelector('p').classList.add('hidden');

        if (apiKey === "YOUR_API_KEY" || apiKey.length < 30) {
             weatherDataContainer.innerHTML = `<p style="color: red;">API Key not configured.</p>`;
             recommendationDataContainer.innerHTML = `<p style="color: red;">Cannot get recommendations without weather data.</p>`;
             return;
        }

        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(weatherApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not found.');
                }
                return response.json();
            })
            .then(data => {
                // Hide spinners
                weatherSpinner.classList.add('hidden');
                recommendationSpinner.classList.add('hidden');

                // Display weather
                const temp = Math.round(data.main.temp);
                const condition = data.weather[0].main;
                const icon = getWeatherIcon(condition);
                weatherDataContainer.innerHTML = `<p class="weather-info">${icon} ${temp}°C, ${condition}</p>`;

                // Generate and display crop recommendations
                const recommendedCrops = cropDatabase.filter(crop =>
                    temp >= crop.ideal_temp[0] && temp <= crop.ideal_temp[1] && crop.ideal_condition.includes(condition)
                );

                if (recommendedCrops.length > 0) {
                    let recommendationHtml = `<h5>${translations[languageSelect.value].recommended_crops}</h5><ul>`;
                    recommendedCrops.forEach(crop => {
                        recommendationHtml += `<li>${crop.name}</li>`;
                    });
                    recommendationHtml += '</ul>';
                    recommendationDataContainer.innerHTML = recommendationHtml;
                } else {
                    recommendationDataContainer.innerHTML = `<p>${translations[languageSelect.value].no_crops}</p>`;
                }
            })
            .catch(error => {
                // Hide spinners
                weatherSpinner.classList.add('hidden');
                recommendationSpinner.classList.add('hidden');

                weatherDataContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
                recommendationDataContainer.innerHTML = `<p style-color: red;>Could not fetch recommendations.</p>`;
            });
    });


    const getHyperlocalForecastButton = document.getElementById('get-hyperlocal-forecast');
    const hyperlocalDataContainer = document.getElementById('hyperlocal-data');

    // Handle "Get Hyperlocal Forecast" button click
    getHyperlocalForecastButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Call the placeholder API
                fetch(`http://127.0.0.1:5000/predict?lat=${lat}&lon=${lon}`)
                    .then(response => response.json())
                    .then(data => {
                        let forecastHtml = '<h5>Your Hyperlocal Forecast:</h5><ul>';
                        data.forecast.forEach(day => {
                            forecastHtml += `<li><strong>${day.day}:</strong> ${day.condition}, ${day.temp_max}°C / ${day.temp_min}°C</li>`;
                        });
                        forecastHtml += '</ul>';
                        hyperlocalDataContainer.innerHTML = forecastHtml;
                    })
                    .catch(error => {
                        hyperlocalDataContainer.innerHTML = `<p style="color: red;">Could not fetch hyperlocal forecast.</p>`;
                        console.error('Error fetching hyperlocal forecast:', error);
                    });
            });
        } else {
            hyperlocalDataContainer.innerHTML = `<p style="color: red;">Geolocation is not supported by this browser.</p>`;
        }
    });

    // Handle "Get Advice" button click
    submitCropButton.addEventListener('click', () => {
        const plantedCrop = plantedCropInput.value;
        const selectedCity = citySelect.value;

        if (plantedCrop.trim() === '') {
            nextStepsDiv.innerHTML = '<p style="color: red;">Please enter the crop you have planted.</p>';
            return;
        }

        if (selectedCity === '') {
            nextStepsDiv.innerHTML = '<p style="color: red;">Please select a city first.</p>';
            return;
        }

        window.location.href = `advice.html?crop=${encodeURIComponent(plantedCrop)}&city=${encodeURIComponent(selectedCity)}`;
    });

    // Handle language change
    languageSelect.addEventListener('change', () => {
        const lang = languageSelect.value;
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    });

    function getWeatherIcon(condition) {
        switch (condition) {
            case 'Clear': return '☀️';
            case 'Clouds': return '☁️';
            case 'Rain': return '🌧️';
            case 'Drizzle': return '🌦️';
            case 'Thunderstorm': return '⛈️';
            case 'Snow': return '❄️';
            default: return '🌫️';
        }
    }

    console.log("script.js loaded");
});