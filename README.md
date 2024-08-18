# ShowLog

ShowLog is a web application for discovering and exploring movies and TV shows. This project is built with Next.js and utilizes several popular libraries to enhance the user experience.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Player**: A React component for playing videos.
- **Framer Motion**: A library for smooth and flexible animations.
- **React Icons**: A set of ready-to-use icons.

## Prerequisites

Ensure you have the following installed on your local environment:

- Node.js (version 16 or higher)
- npm (version 7 or higher) or yarn as a package manager

## Installation

Follow the steps below to set up and run ShowLog on your local machine.

### 1. Clone the Repository

Clone the project repository to your local machine.

```
git clone https://github.com/mauroef/showlog-public.git
cd showlog
```

### 2. Install Dependencies

Install all necessary dependencies using npm or yarn.

```
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a .env.local file in the root of the project and add the following environment variables:

TheMovieDB Variables (Mandatory)

```
NEXT_PUBLIC_TMDB_API_KEY=your_themoviedb_api_key
```

Google Analytics Variables (Optional)

```
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 4. Run the Development Server

Start the Next.js development server.

```
npm run dev
# or
yarn dev
```

### 5. Build for Production

To create an optimized production build:

```
npm run build
# or
yarn build
```

To run the application in production mode:

```
npm run start
# or
yarn start
```
