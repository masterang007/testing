# RPCM Operations Monitor

A real-time plant operations dashboard for RPCM with Excel data integration and cloud synchronization capabilities.

## Features

- **Real-time Plant Monitoring**: Track key operational parameters including power, steam, and flow metrics
- **Hourly Trends**: Visualize 12-hour trends across production, energy, and steam parameters
- **Excel Integration**: Upload Excel reports to update dashboard metrics
- **Cloud Sync**: Hybrid mode supports both cloud (Firebase) and local storage synchronization
- **Password Protection**: Secured access with "rpcm" password and optional device authentication
- **Mobile-First Design**: Fully responsive interface that works on all device sizes
- **Home Screen Installation**: iPhone home screen icon support

## Setup Instructions

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Enter the password "rpcm" to access the dashboard
4. Upload an Excel report file to update metrics

## File Structure

- `index.html` - Main HTML file
- `styles.css` - All CSS styles
- `firebase.js` - Firebase configuration and initialization
- `dashboard.js` - Main dashboard logic and React components
- `README.md` - This documentation

## Dependencies

All dependencies are loaded via CDN:
- React 18
- ReactDOM 18
- Babel (for JSX)
- Tailwind CSS
- Recharts 2.5.0
- SheetJS (for Excel parsing)
- Firebase SDKs

## Usage

1. **Initial Setup**: Open the dashboard in a browser
2. **Authentication**: Enter password "rpcm" on first access
3. **Data Upload**: Click the Upload button to select an Excel file
4. **Data Refresh**: Click the Refresh button to reload data from storage
5. **View Trends**: Toggle between Production, Energy, and Steam tabs in the hourly trends chart

## Technical Details

- **Authentication**: Uses sessionStorage with optional "Remember me" feature
- **Data Storage**: Hybrid approach with Firebase Cloud Firestore and localStorage fallback
- **Chart Library**: Recharts for data visualization
- **Excel Parsing**: SheetJS for Excel file processing
- **Responsive Design**: Tailwind CSS for mobile-friendly layout

## Support

For technical issues or feature requests, please contact the development team.

© 2025 RPCM Operations Team
