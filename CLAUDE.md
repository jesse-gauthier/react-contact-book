Build a React Contact Book Application
Create a modern, fully functional contact management application using React with the following specifications:
Core Features:

Add, edit, and delete contacts with fields for name, email, phone, and category
Search functionality to find contacts by name or email in real-time
Filter contacts by category (Work, Personal, Family, Friends, etc.)
Persistent storage using browser localStorage so contacts survive page refreshes
Display contacts in a clean, organized list or card view

Tech Stack:

React with TypeScript and functional components using hooks (useState, useEffect)
Tailwind CSS v4 for styling
DaisyUI components for pre-built UI elements
localStorage API for data persistence
Strong typing with proper TypeScript interfaces for all data structures

TypeScript Requirements:

Define interfaces for Contact (id, name, email, phone, category, createdAt)
Define types for category options and component props
Use proper typing for useState and useEffect hooks
Type all function parameters and return values
Create a custom hook with proper TypeScript types for managing localStorage
Avoid using any type—use specific types or generics instead
Include error handling with typed error messages

Design Requirements:

Modern, clean interface with a professional look
Responsive design that works on mobile, tablet, and desktop
Color scheme: Use a cohesive palette (suggest blues/purples with accent colors)
Include a sidebar or navigation for filtering by category
Search bar prominently placed at the top
Card-based layout for displaying individual contacts
Clear, intuitive buttons for add/edit/delete actions with hover states
Empty state message when no contacts exist

User Experience:

Modal or form overlay for adding/editing contacts
Confirmation dialog before deleting a contact
Toast notifications or alerts for successful actions (added, updated, deleted)
Smooth transitions and animations using Tailwind utilities
Sort contacts alphabetically by default

Code Quality:

Well-organized component structure (separate components for ContactList, ContactForm, SearchBar, etc.)
Custom hooks with TypeScript for managing contacts and localStorage logic
Clean, readable code with meaningful variable names
Error handling for invalid inputs
Proper prop drilling or context for sharing state across components

Additional Polish:

Add a contact count display
Include category color coding
Consider a "favorite" or "pin" feature for frequently used contacts
Loading state handling
