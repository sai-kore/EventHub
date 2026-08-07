# EventHub REST API Specification

## Auth Endpoints
* `POST /api/auth/register` - Create user account (Attendee/Admin)
* `POST /api/auth/login` - Authenticate & return JWT token
* `GET /api/auth/me` - Get current user profile (Protected)

## Public Event Endpoints
* `GET /api/events` - Get list of all upcoming events (Supports `?query=`)
* `GET /api/events/:id` - Get details for a single event

## Attendee Registration Endpoints
* `POST /api/registrations/:eventId` - Register logged-in user for an event (Protected)
* `GET /api/registrations/my-registrations` - Get user's active registrations (Protected)
* `DELETE /api/registrations/:eventId` - Cancel existing registration (Protected)

## Admin Management Endpoints
* `POST /api/admin/events` - Create new event (Admin)
* `PUT /api/admin/events/:id` - Update existing event (Admin)
* `DELETE /api/admin/events/:id` - Delete an event (Admin)
* `GET /api/admin/events/:eventId/participants` - List all attendees registered for event (Admin)
* `GET /api/admin/events/:eventId/export-csv` - Export registered attendees list as CSV file (Admin)
* `GET /api/admin/stats` - Fetch platform-wide dashboard metrics (Admin)