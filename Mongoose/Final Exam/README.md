# Employee Attendance API

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start MongoDB locally.
3. Run the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/attendance/mark`
- `GET /api/attendance/today`
- `GET /api/attendance?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
