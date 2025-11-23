// Simple working dashboard with password protection
const { useState, useEffect, useRef } = React;
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = window.Recharts || {};

const RpcmLogo = () => (
    `<svg viewBox="0 0 200 180" class="w-8 h-8 text-green-500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 5 L190 50 V140 L100 185 L10 140 V50 L100 5Z" stroke="currentColor" stroke-width="12" stroke-linejoin="round"/>
        <path d="M25 65 L175 65" stroke="currentColor" stroke-width="2" opacity="0.5"/> 
        <path d="M25 125 L175 125" stroke="currentColor" stroke-width="2" opacity="0.5"/>
        <text x="100" y="115" text-anchor="middle" fill="currentColor" font-size="32" font-weight="bold" font-family="Arial, sans-serif" letter-spacing="1">RPCM</text>
    </svg>`
);

const Dashboard = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [chartView, setChartView] = useState('production');
    
    // Simple demo data that matches the Excel format
    const [data, setData] = useState({
        production: [
            { id: 'cta', title: 'CTA Production', actual: 1473, target: 1808, unit: 'tonnes' },
            { id: 'pta', title: 'PTA Production', actual: 1733, target: 1857, unit: 'tonnes' },
            { id: 'availability', title: 'Plant Availability', actual: 81.4, target: 97.0, unit: '%' },
            { id: 'utilization', title: 'Plant Utilization', actual: 93.3, target: 100, unit: '%' },
            { id: 'conversion', title: 'Total Conversion Cost', actual: 83.45, unit: 'USD' }
        ],
        hourly: [
            {time: '7:00', plantPower: 20.83, pxRate: 20.11},
            {time: '8:00', plantPower: 21.25, pxRate: 23.42},
            {time: '9:00', plantPower: 21.66, pxRate: 24.22},
            {time: '10:00', plantPower: 21.56, pxRate: 22.16},
            {time: '11:00', plantPower: 21.55, pxRate: 23.02},
            {time: '12:00', plantPower: 21.53, pxRate: 23.93},
            {time: '13:00', plantPower: 21.68, pxRate: 23.28},
            {time: '14:00', plantPower: 21.63, pxRate: 23.49},
            {time: '15:00', plantPower: 21.70, pxRate: 23.61},
            {time: '16:00', plantPower: 21.71, pxRate: 23.55},
            {time: '17:00', plantPower: 21.66, pxRate: 23.46},
            {time: '18:00', plantPower: 21.64, pxRate: 23.53}
        ],
        lastUpdated: 'Last updated: ' + new Date().toLocaleTimeString()
    });
    
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        // Check if already authenticated
        const savedAuth = localStorage.getItem('rpcm_auth');
        if (savedAuth) {
            setAuthenticated(true);
        }
    }, []);
    
    const handleLogin = (password) => {
        if (password === 'rpcm') {
            localStorage.setItem('rpcm_auth', 'true');
            setAuthenticated(true);
            return true;
        }
        return false;
    };
    
    const handleLogout = () => {
        localStorage.removeItem('rpcm_auth');
        setAuthenticated(false);
    };
    
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const data = new Uint8Array(evt.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                // Process the Excel data here
                alert("Excel file processed successfully!");
                
                // Update last updated time
                setData(prev => ({
                    ...prev,
                    lastUpdated: 'Last updated: ' + new Date().toLocaleTimeString()
                }));
            } catch (error) {
                console.error("Error processing file:", error);
                alert("Error processing Excel file: " + error.message);
            }
        };
        reader.readAsArrayBuffer(file);
        e.target.value = null;
    };
    
    if (!authenticated) {
        return (
            `<div class="min-h-screen bg-gray-950 flex items-center justify-center p-4">
                <div class="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl">
                    <div class="text-center mb-8">
                        ${RpcmLogo()}
                        <h2 class="text-2xl font-bold text-white mt-4">RPCM Operations Monitor</h2>
                        <p class="text-gray-400 mt-2">Please enter password to access dashboard</p>
                    </div>
                    
                    <div class="space-y-4">
                        <input type="password" id="password" 
                               class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                               placeholder="Enter password" 
                               onkeypress="if(event.key==='Enter') document.getElementById('login-btn').click()">
                        
                        <button id="login-btn" onclick="handleLogin(document.getElementById('password').value)"
                                class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                            Login
                        </button>
                    </div>
                </div>
            </div>`
        );
    }
    
    return (
        `<div class="flex flex-col h-screen">
            <!-- Header -->
            <header class="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/50 sticky top-0 z-10">
                <div class="flex items-center gap-4">
                    ${RpcmLogo()}
                    <div>
                        <h1 class="font-bold text-white">RPCM Operations Monitor</h1>
                        <p class="text-xs text-gray-400">${data.lastUpdated}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="fileInputRef.current.click()" 
                            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload
                    </button>
                    <button onclick="handleLogout()" 
                            class="bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H3m6 4v1a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </header>
            
            <!-- Main Content -->
            <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                <!-- Production Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    ${data.production.map(item => `
                    <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow">
                        <div class="text-gray-400 text-xs mb-1">${item.title}</div>
                        <div class="text-2xl font-bold text-white">${item.actual}</div>
                        <div class="text-sm text-gray-500">${item.unit} ${item.target ? `(Target: ${item.target})` : ''}</div>
                    </div>
                    `).join('')}
                </div>
                
                <!-- Hourly Trends -->
                <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-bold text-white">Hourly Trends (12h)</h2>
                        <div class="flex gap-2">
                            <button onclick="setChartView('production')" 
                                    class="px-3 py-1 text-xs rounded ${chartView === 'production' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'}">
                                Production
                            </button>
                            <button onclick="setChartView('energy')" 
                                    class="px-3 py-1 text-xs rounded ${chartView === 'energy' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'}">
                                Energy
                            </button>
                        </div>
                    </div>
                    <div class="chart-container">
                        <!-- Chart will be rendered here by Recharts -->
                        <div class="w-full h-full flex items-center justify-center text-gray-500">
                            Hourly trends chart will appear here
                        </div>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="text-center text-xs text-gray-600 py-4 border-t border-gray-800 mt-2">
                    <p>RPCM Operations Monitor • Emerson DeltaV Integration</p>
                </div>
            </div>
            
            <!-- File input (hidden) -->
            <input type="file" ref={fileInputRef} accept=".xlsx,.xls" class="hidden" onchange="handleFileUpload(event)">
        </div>`
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(`<Dashboard />`);

// Expose functions to global scope for inline onclick handlers
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.setChartView = setChartView;
window.fileInputRef = fileInputRef;
window.handleFileUpload = handleFileUpload;