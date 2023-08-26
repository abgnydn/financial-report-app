# Financial Report UI

Welcome to the Financial Report UI repository! This project is designed to showcase a fully functioning financial report interface with dynamic data fetched from the backend. The interface allows users to view aggregated financial data and its breakdown, re-categorize transactions, and explore detailed transaction information.

## Tech Stack

- React
- React Query
- TypeScript
- Vite
- Tailwind CSS
- Heroicons

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/abgnydn/financial-report-app.git
   ```

2. **Navigate to the Project Directory:** Move into the project directory:

   ```bash
   cd financial-report-app
   ```

3. **Install Dependencies:** Install project dependencies using [pnpm](https://pnpm.io/):

   ```bash
   pnpm install
   ```

4. **Start the Development Server:** Launch the development server:

   ```bash
   pnpm dev
   ```

5. **Access the Application:** Open your web browser and navigate to [http://localhost:5173](http://localhost:5173) to access the application.

### Project Structure

The project structure is organized as follows:

```
src/
├── components/        # Reusable components
├── data/              # Mocked data and API responses
├── hooks/             # Custom hooks
├── icons/             # Custom icons
├── context/           # Contexts
├── utils/             # Helper functions
└── main.tsx           # Entry point
```

## Task 1: Backend API Definitions

We have defined the necessary APIs to fetch the data required for generating the financial report interface. These APIs are:

### API 1: Get Financial Report Data

- **Endpoint Name:** `/api/financial-report`
- **Request Method:** GET
- **Request Params:** None
- **Expected Response:**

```json
{
  "date": "2022-09",
  "categories": {
    "banks": {
      "name": "Banks",
      "amount": -14954,
      "breakdown": [
        {
          "name": "First Republic Savings",
          "amount": -13387,
          "transactions": [
            {
              "id": "egtdgn",
              "name": "Google",
              "service": "Google Ads",
              "date": "09/18/2022",
              "amount": -10000
            },
            {
              "id": "pysd63",
              "name": "Google",
              "service": "Google Workspace",
              "date": "09/15/2022",
              "amount": -2000
            },
            {
              "id": "slm8u6",
              "name": "Google",
              "service": "Google Domains",
              "date": "09/08/2022",
              "amount": -1387
            }
          ]
        }
      ]
    }
  }
}
```

## Task 2: Generating UI with Mock Data

With the mocked response data from the backend, I have generated the financial report UI. The UI includes:

- Categories: Banks,Credit Cards, Income, COGS, Expenses
- Additional Calculations: Available Starting Balance, Gross Profit, Net Income
- Expandable Sidebar and Dropdown Sidebar for detailed information, search and updating data.
- Table with selectable cells.

## Task 3: Displaying Transaction Details

When a user clicks on a specific cell, a pop-up is displayed showing the transactions that contributed to that cell.

### API 3: Get Transactions for Cell

- **Endpoint Name:** `/api/category/:categoryName/subcategory/:subcategory/date/:date`
- **Request Method:** GET
- **Request Params:** `categoryName, subcategory, date` (string[])
- **Expected Response:**

```json
{
        {
          "name": "First Republic Savings",
          "amount": -13387,
          "transactions": [
            {
              "id": "egtdgn",
              "name": "Google",
              "service": "Google Ads",
              "date": "09/18/2022",
              "amount": -10000
            },
            {
              "id": "pysd63",
              "name": "Google",
              "service": "Google Workspace",
              "date": "09/15/2022",
              "amount": -2000
            },
            {
              "id": "slm8u6",
              "name": "Google",
              "service": "Google Domains",
              "date": "09/08/2022",
              "amount": -1387
            }
          ]
        }
}
```

## Task 4: Transaction Recategorization

Users can now drag and drop transactions to different rows for re-categorization. This is achieved through the following APIs:

### API 3: Drag and Drop Transaction

- **Endpoint Name:** `/api/drag-and-drop`
- **Request Method:** PUT
- **Request Params:**

```json
{
  "date": string,
  "category": string,
  "subcategory": string,
  "id": string,
  "targetCategory": string,
  "targetSubcategory": string,
}
```

- **Expected Response:**

```json
{
  "success": true
}
```

## Task 5: Aggregate Value Changes

When a transaction is re-categorized, the aggregate values for the affected categories are automatically updated.

## Decisions and Trade-offs

- **Technology Stack:** I chose React, React Query, TypeScript, Vite, and Tailwind CSS for their modern and efficient development experience.
- **UI/UX:** I aimed to provide an intuitive and user-friendly interface focusing on functionality and user interactions.

- **Code Organization:** The codebase is organized into components, context, icons, and utility functions to ensure modularity and maintainability.

## Additional Notes

- I made design decisions to ensure a smooth and intuitive user experience.
- I used React Query for efficient data fetching and caching.
- The UI is built with Tailwind CSS for responsive and modern styling.
- Feel free to explore the codebase and let us know if you have any questions!

Thank you for considering my submission!
