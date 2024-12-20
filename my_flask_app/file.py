from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Endpoint for price negotiation logic
def negotiate_price(user_message):
    # Example logic for price negotiation
    if "discount" in user_message.lower():
        return "We can offer a 10% discount on your purchase."
    elif "final price" in user_message.lower():
        return "The final price is $450. Let us know if it works for you."
    else:
        return "Could you clarify your request regarding the price?"

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')  # This will render the HTML file

# API route to handle POST requests from the front-end
@app.route("/respond", methods=["POST"])
def respond():
    data = request.get_json()  # Get the JSON data from the front-end
    user_message = data.get("message", "")  # Extract message from JSON
    bot_response = negotiate_price(user_message)  # Get bot response
    return jsonify({"response": bot_response})  # Return the response as JSON

if __name__ == "__main__":
    app.run(debug=True)
