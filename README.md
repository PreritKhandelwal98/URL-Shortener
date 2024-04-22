# URL Shortener Web App

This web application is a simple URL shortener built with Node.js and hosted on Render. It allows users to shorten URLs, visit the shortened links, and view analytics for each shortened URL.

## Usage

### 1. Shorten URL

- **Route**: `/url`
- **Method**: POST
- **Parameters**:
  - `url`: The original URL to be shortened.
- **Response**:
  - `shortUrl`: The shortened URL.
  - `id`: The unique URL id.

### 2. Visit Shortened URL

- Simply click on the provided shortened URL to visit the original website.

### 3. View Analytics

- **Route**: `url/analytics/:shortId`
- **Method**: GET
- **Parameters**:
  - `shortId`: The unique Id associated with the shortened URL.
- **Response**:
  - `clicks`: Number of times the shortened URL has been clicked.
  - `timestamp`: Timestamp of each click.
  - `ipAddress`: IP address of the visitor.
  - `deviceType`: Device type of the visitor (e.g., mobile, desktop).

## Hosted URL

You can access the web application at: [Hosted URL](https://url-shortener-ojkp.onrender.com/url)

Feel free to try it out using any API testing service like Postman, RapidAPI, or Thunder Client.

For any questions or feedback, please contact Prerit Khandelwal at prerit.web@gmail.com .
