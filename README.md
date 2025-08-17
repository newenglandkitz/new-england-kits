# New England Kits - Soccer Jersey Store

A modern, responsive website for showcasing soccer jerseys. Built with HTML, CSS, and JavaScript, featuring a clean design and interactive elements.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Dynamic Inventory**: CSV-based jersey management system
- **Interactive Elements**: 
  - Mobile-friendly navigation
  - Add to cart functionality
  - Quick view modals
  - Contact forms
  - Newsletter subscription
- **Performance Optimized**: 
  - Lazy loading images
  - Smooth scrolling
  - Intersection Observer animations
- **Cross-browser Compatible**: Works on all modern browsers

## 📁 File Structure

```
website/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and responsive design
├── script.js               # JavaScript functionality
├── jerseys.csv             # Jersey inventory data
├── img/                    # Jersey images
├── server.py               # Local development server
├── start_server.bat        # Windows server startup
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🛠️ Local Development Setup

### Option 1: Python Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/new-england-kits.git
cd new-england-kits

# Start the local server
python server.py
```

### Option 2: Windows Batch File
```bash
# Double-click start_server.bat or run:
start_server.bat
```

### Option 3: Manual Python Server
```bash
python -m http.server 8000
```

The website will open automatically at `http://localhost:8000`

## 🎨 Customization Guide

### Managing Jersey Inventory
Edit `jerseys.csv` to update your inventory:

```csv
image,name,team,price,available
img/jersey1.jpg,Arsenal Home,Arsenal FC,40,true
img/jersey2.jpg,Barcelona Away,Barcelona FC,45,true
```

### Adding New Jerseys
1. **Upload** jersey images to the `img/` folder
2. **Add entry** to `jerseys.csv` with correct image path
3. **Set available** to `true` to display on website

### Updating Prices
Simply change the `price` value in `jerseys.csv` and refresh the page.

## 🚀 Deployment Options

### GitHub Pages (Free)
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Save

3. **Your site will be available at**:
   `https://yourusername.github.io/new-england-kits`

### Netlify (Free)
1. **Connect GitHub repository** to Netlify
2. **Deploy automatically** on every push
3. **Custom domain** support available

### Vercel (Free)
1. **Import GitHub repository** to Vercel
2. **Automatic deployments** on push
3. **Global CDN** for fast loading

## 📧 Contact Forms

The contact and newsletter forms are currently set up for demonstration. To make them functional:

1. **Backend Integration**: Connect to your preferred backend service
2. **Email Service**: Use services like:
   - Formspree
   - Netlify Forms
   - EmailJS
   - Custom PHP/Node.js backend

## 🛒 E-commerce Integration

To add full e-commerce functionality:

1. **Shopping Cart**: Integrate with platforms like:
   - Shopify
   - WooCommerce
   - Stripe Checkout
   - PayPal

2. **Payment Processing**: Add payment gateways:
   - Stripe
   - PayPal
   - Square

## 🔒 Security Considerations

- Use HTTPS for production
- Validate form inputs
- Sanitize user data
- Implement CSRF protection for forms

## 📈 Analytics

Add analytics to track performance:
- Google Analytics
- Facebook Pixel
- Hotjar for user behavior

## 🎨 Design System

The website follows a consistent design system:
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Colors**: Blue primary, red accent, green success
- **Shadows**: Subtle elevation effects
- **Border Radius**: 8px for cards, 15px for larger elements

## 🤝 Support

For customization help or questions:
1. Check the code comments for guidance
2. Review the CSS classes for styling options
3. Test changes in a development environment first

## 📄 License

This template is free to use and modify for your soccer jersey business.

---

**Happy selling! ⚽**
