# Gamification – Book Cover Puzzle

## Project Description

A web application for creating and solving jigsaw puzzles from book covers available in COBISS Plus. Users can select a book cover, which is divided into smaller puzzle pieces. The pieces can then be moved and rotated to reconstruct the original image.

The application is responsive and optimized for use across different devices, including desktop computers, tablets, and smartphones.

## Main Features

- **Multiple difficulty levels**:
  - 2×2 (Very Easy)
  - 2×3 (Easy)
  - 3×3 (Medium)
  - 3×4 (Harder)
  - 4×4 (Hard)
  - 4×5 (Very Hard)

- **Interactive gameplay**:
  - Drag-and-drop functionality
  - Rotate pieces by clicking or tapping
  - Automatic resizing based on the device
  - Animated notification and sound effect upon successful completion
  - Option to reveal the solution
  - Overall statistics
  - Medals for good results

- **Scoring system**:
  - Score based on:
    - Puzzle difficulty
    - Completion time
    - Use of the solution feature
  - Storage of previous results

## Technologies

- **Frontend**:
  - **Next.js** – React framework
  - **TypeScript** – type-safe development
  - **Tailwind CSS** – styling
  - **Framer Motion** – animations
  - **Radix UI** – accessible UI components

- **Backend & Storage**:
  - **COBISS API** – retrieving book data
  - **Next.js API Routes** – server-side logic
  - **LocalStorage** – storing statistics locally

- **Development Tools**:
  - **Node.js**
  - **ESLint** and **Prettier** – code quality and formatting
  - **Git** – version control

## Setup and Installation

1. **Set up and start the IZUM Cobiss Plus backend**
  - Clone and start the `izum-puzzle-backend` repository first. For setup instructions, refer to the backend repository's README.

2. **Clone the repository**
   ```bash
   git clone https://github.com/alesfc1/izum-puzzle-produkcija
   ```
   
3. **Navigate to the project directory**

   ```bash
   cd puzzle-game
   ```

4. **Install dependencies**

   If you are using `npm`:

   ```bash
   npm install
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser.



