# Flight Search Engine

A responsive flight search application built with React Router v7, Material UI, and the Amadeus Self-Service API. Implements real-time flight search, price visualization, and advanced filtering.

## What It Does

Users can search for flights by origin, destination, and dates. Results are displayed in a grid with an interactive price graph. Multiple filters (stops, price range, airlines) can be applied simultaneously, updating both the flight list and price graph in real-time.

**Scope:**
- Flight search and results display
- Price graph showing distribution of current flight offers (not historical trends)
- Client-side filtering with instant updates
- Responsive design for mobile and desktop

**Out of Scope:**
- Historical price tracking
- User authentication or booking
- Payment processing

## Tech Stack

**Frontend:**
- React 19.2.3 with TypeScript
- React Router v7 (SSR support)
- Material UI v7 for components
- @mui/x-charts for price visualization
- React Query v3 for data fetching and caching

**Why These Choices:**
- React Router v7 provides SSR and API routes in one framework
- Material UI accelerates development while maintaining quality
- React Query handles caching, loading states, and request deduplication automatically
- @mui/x-charts integrates well with Material UI and provides the required visualization

## Architecture

### Server-Side API Proxy

All Amadeus API calls go through React Router loaders (`app/api/flights/search.ts`, `app/api/airports/search.ts`). This approach:

- **Keeps credentials secure**: API keys and secrets never reach the browser
- **Manages OAuth tokens**: Tokens are cached server-side with automatic refresh
- **Avoids CORS issues**: Server-to-server communication
- **Enables rate limiting**: Centralized control over API requests

### OAuth Handling

OAuth tokens are obtained and cached server-side in `app/api/amadeus/auth.ts`:

1. First request fetches a token using client credentials
2. Token is cached in memory with expiration timestamp
3. Subsequent requests use cached token
4. Token refreshes automatically 60 seconds before expiration

**Trade-off:** In-memory cache is lost on server restart. For production, consider Redis or similar persistent storage.

### Client-Side Filtering

Filters are applied in the browser after receiving API results. This approach:

- Provides instant UI updates without additional API calls
- Works around API limitations (e.g., no airline filter in query params)
- Improves user experience with real-time feedback

**Trade-off:** Only works with fetched results (currently max 10). For larger datasets, server-side filtering with pagination would be needed.

## Requirements Implementation

### 1. Flight Search & Results

**Search Form:**
- Origin/destination autocomplete with real-time airport search (debounced 300ms)
- Date pickers for departure and return dates
- Passenger count and trip type selection

**Results Display:**
- Responsive grid (1/2/3 columns based on screen size)
- Flight cards show times, airports, duration, price, and layovers
- Route visualization with arrows

**API Integration:**
- Airport search: `/v1/reference-data/locations`
- Flight search: `/v2/shopping/flight-offers` (max 10 results)

### 2. Live Price Graph

The price graph displays the **distribution of flight offers** returned by the API for the current search. Each point represents one flight's price.

**Important:** This does not show historical price trends. The Amadeus Test API provides current offers only, not historical data. The graph shows price spread across available flights and updates in real-time as filters change.

Implemented with `@mui/x-charts` LineChart, updating via `useMemo` when filtered flights change.

### 3. Complex Filtering

Three filters work simultaneously:
- **Max Stops**: Dropdown (0, 1, 2, 3+)
- **Price Range**: Dual-handle slider
- **Airlines**: Multi-select chips (extracted from flight data)

All filters update both the flight list and price graph instantly using `useMemo` for performance. Filter logic in `app/pages/Home/components/utils/flightFilters.ts`.

### 4. Responsive Design

Mobile-first approach with Material UI breakpoints:
- `xs`: < 600px (mobile)
- `sm`: ≥ 600px (tablet)
- `md`: ≥ 900px (desktop)
- `lg`: ≥ 1200px (large desktop)

Components adapt: forms stack on mobile, filters go vertical, grid adjusts column count, graph height scales.

## Running Locally

### Prerequisites
- Node.js 18+
- Amadeus API credentials (Test environment)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file in project root:
   ```env
   AMADEUS_API_URL=https://test.api.amadeus.com
   AMADEUS_API_KEY=your_api_key
   AMADEUS_API_SECRET=your_api_secret
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173`

### Available Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run typecheck` - Type checking

## Security

**API Credentials:**
- Stored in environment variables (`.env` file)
- Never committed to version control
- Only accessed server-side in React Router loaders

**OAuth Tokens:**
- Obtained and cached server-side only
- Never exposed to the browser
- Automatically refreshed before expiration

**Server Proxy:**
- All API calls go through server-side loaders
- Client never directly communicates with Amadeus API
- Credentials remain secure even if client code is inspected

## Project Structure

```
app/
├── api/                    # React Router API routes
│   ├── airports/search.ts
│   ├── amadeus/           # Amadeus integration
│   │   ├── auth.ts        # OAuth token management
│   │   ├── airports.ts
│   │   └── flights.ts
│   └── flights/search.ts
├── pages/Home/
│   ├── components/
│   │   ├── form/          # Form components
│   │   ├── hooks/         # useAirportSearch
│   │   ├── utils/         # filterFlights
│   │   ├── FlightFilters.tsx
│   │   ├── FlightResults.tsx
│   │   ├── FlightSearchForm.tsx
│   │   └── PriceGraph.tsx
│   ├── hooks/
│   │   └── useFlightSearch.ts
│   └── home.tsx
└── shared/helpers/         # API config, IATA validation
```

## Future Improvements

With more time, would add:

- **Enhanced Search**: Calendar view, flexible dates, multiple destinations
- **Better Filtering**: Duration, time windows, cabin class (currently collected but unused)
- **Performance**: Virtual scrolling, pagination, server-side filtering
- **UX**: Skeleton loaders, toast notifications, keyboard shortcuts
- **Testing**: Unit tests, E2E tests, error boundaries
- **Production**: Redis for token cache, monitoring, error tracking

## Requirements Compliance

| Requirement | Status | Notes |
|------------|--------|-------|
| Search & Results | ✅ | Form with autocomplete, date pickers, results grid |
| Live Price Graph | ✅ | Shows current offer distribution, updates with filters |
| Complex Filtering | ✅ | Stops, price, airlines with instant updates |
| Responsive Design | ✅ | Mobile-first, all breakpoints implemented |

All requirements met.

---

Built with React Router v7, TypeScript, and Material UI.

