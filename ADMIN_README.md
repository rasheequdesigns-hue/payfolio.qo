# Admin Dashboard Documentation

## Accessing the Admin Panel

To access the admin panel, navigate to:
- Login Page: http://localhost:3000/admin/login
- Dashboard: http://localhost:3000/admin/dashboard (after login)

## Admin Credentials

Use the following credentials to log in to the admin panel:

- **Email**: rasheequ.designs@gmail.com
- **Password**: rasheequ.designs

## Features

The admin dashboard includes the following features:

1. **Overview Dashboard**
   - Statistics cards showing total users, questions, languages used
   - Most searched topics
   - Daily/monthly usage analytics

2. **Content Management**
   - Upload PDFs, DOCX, TXT files
   - View processed content
   - Enable/disable, trust/untrust, delete, update content
   - Re-index content for AI (RAG)

3. **AI Controls**
   - Enable/disable AI system
   - Toggle text & voice output
   - Set response length
   - Edit system prompt & refusal message

4. **Language & Voice**
   - Enable/disable Malayalam, English, Arabic, Urdu, Tamil, Kannada
   - Select voice per language
   - Control speed & clarity
   - Test TTS inside admin panel

5. **Logs & Analytics**
   - View user questions, answers, language, time
   - Filter by date/topic/language
   - Export logs (CSV/PDF)

6. **Security**
   - Change admin password
   - Optional 2-step verification
   - Emergency "Disable AI" switch
   - Backup & restore settings

7. **Settings**
   - Site name & logo
   - Maintenance mode
   - Dark/light theme
   - Footer text editor

## Security

- Sessions automatically expire after 1 hour of inactivity
- All admin routes are protected and require authentication
- JWT tokens are used for secure session management
- Auto-logout occurs on manual logout or session expiration

## API Endpoints

### Authentication
- POST /api/admin/login - Admin login
- All other admin endpoints require authentication

### Dashboard Data
- GET /api/admin/stats - Get dashboard statistics
- GET /api/admin/logs - Get user interaction logs
- GET /api/admin/messages - Get contact messages
- GET /api/admin/portfolio - Get portfolio items

### Actions
- POST /api/admin/portfolio - Add new portfolio item
- POST /api/admin/password - Update admin password
- POST /api/admin/content - Upload content

## Development Notes

This is a frontend prototype with simulated backend functionality. In a production environment:

1. Replace in-memory data storage with a proper database
2. Implement actual file upload and processing
3. Add real analytics and charting
4. Implement backup/restore functionality
5. Add proper error handling and validation
6. Enhance security measures