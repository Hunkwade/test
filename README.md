# BikeLoo - Premium Bike Showcase Website

A modern, futuristic bike showcasing website inspired by bikedekho.com. Built with vanilla HTML, CSS, and JavaScript for optimal performance and ease of use.

## Features

### 🏍️ Comprehensive Bike Database

- 50+ bikes from 10+ premium brands
- Detailed specifications for each model
- High-quality images and descriptions
- Multiple categories: Sport, Cruiser, Commuter, Adventure, Electric, Scooter

### 🔍 Advanced Search & Filtering

- Real-time search across bike names, brands, and categories
- Filter by brand, price range, and category
- Sort by popularity, price, mileage, and power
- Instant results with smooth animations

### ⚖️ Bike Comparison Tool

- Compare up to 3 bikes side-by-side
- Detailed specification comparison
- Easy-to-read comparison table
- Visual bike cards for quick reference

### 📱 Fully Responsive Design

- Optimized for all screen sizes
- Mobile-first approach
- Smooth animations and transitions
- Touch-friendly interface

### 🎨 Modern UI/UX

- Futuristic design with vibrant orange gradient effects
- Clean light theme with excellent readability
- Smooth scroll animations
- Interactive elements with hover effects
- Custom scrollbar styling
- Accessible design with proper focus states

### 🚀 Performance Optimized

- Static website for fast loading
- Lazy loading for images
- Optimized CSS with CSS variables
- Minimal JavaScript for better performance

## Brands Included

- Honda
- Yamaha
- Royal Enfield
- KTM
- Bajaj
- TVS
- Suzuki
- Kawasaki
- Ducati
- Harley-Davidson

## How to Use

### Running Locally

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process required!

### Customization

#### Adding New Bikes

Edit `bikes-data.js` and add a new bike object:

```javascript
{
    id: 51,
    brand: "Brand Name",
    name: "Model Name",
    category: "sport", // sport, cruiser, commuter, adventure, electric, scooter
    price: 250000,
    image: "image-url",
    engine: "250cc",
    power: "30 HP",
    mileage: "40 km/l",
    topSpeed: "150 km/h",
    weight: "160 kg",
    fuelCapacity: "12 L",
    brakes: "Dual Channel ABS",
    transmission: "6-Speed",
    torque: "25 Nm",
    cooling: "Liquid Cooled",
    starter: "Electric",
    description: "Bike description here",
    features: ["Feature 1", "Feature 2"],
    colors: ["Color 1", "Color 2"],
    popular: false
}
```

#### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --primary: #ff6b35; /* Main orange color */
  --secondary: #ff8c42; /* Secondary orange */
  --accent: #ffa94d; /* Accent color */
  --light: #ffffff; /* Background */
  --text: #212529; /* Text color */
  /* ... more variables */
}
```

#### Modifying Layout

All layouts use CSS Grid and Flexbox for easy customization. Edit `styles.css` to adjust spacing, sizes, and breakpoints.

## File Structure

```
bikeloo/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── bikes-data.js       # Bike database
└── README.md          # Documentation
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** - No frameworks for optimal performance
- **Font Awesome** - Icon library
- **Google Fonts** - Orbitron & Rajdhani fonts
- **Unsplash** - Placeholder images (replace with actual bike images)

## Design Features

### Color Scheme

- **Primary Orange**: #ff6b35 - Vibrant and energetic
- **Secondary Orange**: #ff8c42 - Warm accent
- **Light Theme**: Clean white background with subtle grays
- **Text**: Dark text on light background for optimal readability

### Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 968px - 1199px
- **Mobile Large**: 640px - 967px
- **Mobile Small**: 480px - 639px
- **Mobile XS**: Below 480px

### Mobile Optimizations

- Touch-friendly button sizes (minimum 44px)
- Stacked layouts for better content flow
- Larger text for readability
- Optimized images and spacing
- Hamburger menu for navigation
- Swipeable comparison tables

## Key Features Explained

### Search Functionality

- Type in the search box to filter bikes instantly
- Search works across bike names, brands, and categories
- Two search boxes: one in hero section, one in bikes section

### Filtering System

- **Brand Filter**: Filter bikes by manufacturer
- **Price Filter**: Choose price range (Under 1L, 1-2L, 2-5L, Above 5L)
- **Category Filter**: Click category cards to filter
- **Sort Options**: Popular, Price (Low/High), Best Mileage, Most Powerful

### Comparison Feature

1. Click checkboxes on bike cards to select bikes
2. Select 2-3 bikes for comparison
3. Click "Compare" button in navigation
4. View detailed side-by-side comparison

### Bike Details

- Click "View Details" on any bike card
- See full specifications, features, and colors
- Add to comparison directly from details page

### Mobile Navigation

- Hamburger menu for mobile devices
- Touch-friendly interface
- Optimized layouts for small screens

## Performance Tips

1. **Replace Image URLs**: Use optimized, compressed images
2. **Enable Caching**: Configure your web server for browser caching
3. **Minify Files**: Minify CSS and JavaScript for production
4. **CDN**: Use CDN for Font Awesome and Google Fonts
5. **Lazy Loading**: Images already use lazy loading attributes

## Future Enhancements

- Add bike reviews and ratings
- Implement user accounts and favorites
- Add dealer locator
- Include EMI calculator
- Add video reviews
- Implement advanced filters (fuel type, seat height, etc.)
- Add booking/inquiry form
- Include news and blog section with real content

## Credits

- Design inspired by bikedekho.com
- Icons from Font Awesome
- Fonts from Google Fonts
- Images from Unsplash (for demo purposes)

## License

Free to use for personal and commercial projects.

---

**Made with ❤️ for bike enthusiasts**

For questions or suggestions, feel free to reach out!
