# QR Code Generator

A modern React.js application that generates QR codes from personal details. Users can enter their name, email, phone number, and address, and the application will combine these details into a single string and encode it into a QR code.

## Features

- **Personal Details Form**: Input fields for name, email, phone number, and address with validation
- **QR Code Generation**: Uses `qrcode.react` library to generate QR codes
- **Download Options**: Download QR code as PNG or SVG format
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **Form Validation**: Client-side validation with error messages
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React.js 18.2.0
- qrcode.react 3.1.0
- html2canvas 1.4.1
- CSS3 with modern features (backdrop-filter, gradients, etc.)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Fill in the personal details form with your information
2. Click "Generate QR Code" to create the QR code
3. The QR code will be displayed on the right side of the screen
4. Use the download buttons to save the QR code as PNG or SVG
5. Click "Generate New QR Code" to start over

## Project Structure

```
src/
├── components/
│   ├── QRCodeGenerator.js      # Main component
│   ├── QRCodeGenerator.css
│   ├── PersonalDetailsForm.js  # Form component
│   ├── PersonalDetailsForm.css
│   ├── QRCodeDisplay.js        # QR code display component
│   └── QRCodeDisplay.css
├── App.js                      # Root component
├── App.css
├── index.js                    # Entry point
└── index.css                   # Global styles
```

## Features in Detail

### Form Validation
- All fields are required
- Email format validation
- Real-time error display
- Form submission only when all fields are valid

### QR Code Generation
- Combines all personal details into a single string
- Uses high-quality QR code generation (Level M)
- Includes margin for better scanning
- Renders as SVG for crisp display

### Download Functionality
- **PNG Download**: Uses html2canvas to convert QR code to PNG
- **SVG Download**: Exports the SVG directly for vector format
- High-resolution output (4x scale for PNG)

### Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly buttons and inputs
- Optimized for various screen sizes

## Customization

You can easily customize the application by:

1. **Styling**: Modify the CSS files to change colors, fonts, and layout
2. **QR Code Settings**: Adjust QR code size, error correction level, and margin
3. **Form Fields**: Add or remove form fields in `PersonalDetailsForm.js`
4. **Data Format**: Change how personal details are combined in `QRCodeGenerator.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
