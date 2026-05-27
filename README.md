# Budget Buddy

A personal finance tracker built with React and Flask. Tracks income and expenses by category with a dashboard summary.

Built this to practice full stack development and combine my background in finance with software development.

## Live Demo

https://budgetbuddyapp-jv2.netlify.app


## Stack

- React + Vite + Tailwind CSS
- Flask + SQLAlchemy + SQLite

## Running locally

**Backend**
```bash
cd Backend
python -m pip install flask flask-sqlalchemy flask-cors
python app.py
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Features

- Track income and expenses by category
- Dashboard with balance, income and expense summaries
- Spending by category donut chart
- Income vs expenses bar chart
- Monthly and yearly filtering
- Search transactions by category or note
- Mobile responsive

## What's next

- Budget goals per category
- Edit transactions
- User authentication
- PostgreSQL for persistent storage