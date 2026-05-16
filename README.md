# GAA Frontend - React Application

A comprehensive React frontend for the GAA (Gestion des Artistes et Artisans) application that consumes a Spring Boot backend API.

## Features

- **Authentication**: Login page with JWT token-based authentication
- **Dashboard**: Responsive layout with collapsible sidebar navigation
- **Artists Management**: Full CRUD operations for managing artists
- **Suppliers Management**: Complete supplier database management
- **Search & Filter**: Real-time search and category filtering
- **Responsive Design**: Mobile-friendly interface matching Figma designs
- **Error Handling**: User-friendly error messages and loading states

## Project Structure

```
src/
├── pages/
│   ├── LoginPage.js          # Authentication page
│   ├── ArtistesPage.js       # Artists management dashboard
│   └── FournisseursPage.js   # Suppliers management dashboard
├── components/
│   ├── Sidebar.js            # Left navigation sidebar
│   ├── Navbar.js             # Top navigation bar
│   ├── ArtistesTable.js      # Artists data table
│   ├── FournisseursTable.js  # Suppliers data table
│   ├── ArtistModal.js        # Modal for adding/editing artists
│   └── FournisseurModal.js   # Modal for adding/editing suppliers
├── layout/
│   └── DashboardLayout.js    # Main dashboard wrapper
├── styles/                    # CSS files for all components
└── App.js                    # Main application routing
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Spring Boot backend running on `http://localhost:8080/api`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## API Endpoints Required

Ensure your Spring Boot backend provides these endpoints:

### Authentication
- `POST /api/auth/login` - User login

### Artists
- `GET /api/artistes` - Fetch all artists
- `POST /api/artistes` - Create new artist
- `PUT /api/artistes/{id}` - Update artist
- `DELETE /api/artistes/{id}` - Delete artist

### Suppliers
- `GET /api/fournisseurs` - Fetch all suppliers
- `POST /api/fournisseurs` - Create new supplier
- `PUT /api/fournisseurs/{id}` - Update supplier
- `DELETE /api/fournisseurs/{id}` - Delete supplier

## Authentication

The application uses JWT token-based authentication:

1. Login credentials are sent to `/api/auth/login`
2. Token and user data are stored in localStorage
3. Token is automatically included in all API requests via Authorization header
4. Automatic logout on token expiration

## Features

### Login Page
- Email and password authentication
- Error messages for failed login attempts
- Responsive layout matching Figma design

### Dashboard
- Collapsible sidebar navigation
- Top navigation bar with search, notifications, and user profile
- Protected routes requiring authentication

### Data Management
- Search functionality across all records
- Category-based filtering
- Add, edit, and delete operations with confirmation dialogs
- Modal forms for data entry
- Real-time table updates

## Technologies Used

- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2
- CSS3

## Environment Variables

Create a `.env` file in the root directory (optional):

```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## License

MIT
