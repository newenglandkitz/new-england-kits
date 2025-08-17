#!/usr/bin/env python3
"""
Simple HTTP server for the Boston Kits website
Run this script to serve the website locally and avoid CORS issues
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Get the current directory
current_dir = Path(__file__).parent
os.chdir(current_dir)

# Server configuration
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

# Add CORS headers
class CORSRequestHandler(Handler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    print(f"Starting server at http://localhost:{PORT}")
    print(f"Serving files from: {current_dir}")
    print("Press Ctrl+C to stop the server")
    
    # Create server
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        
        # Open browser automatically
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.shutdown()

if __name__ == "__main__":
    main()
