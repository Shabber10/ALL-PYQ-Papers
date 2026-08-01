import React from 'react'
import { BookOpen } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="header">
      <div className="header-title-container">
        <div className="logo-badge">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="header-title">ALL-PYQ-Papers</h1>
          <p className="header-subtitle">Digital archive of Previous Year Question Papers (PYQs)</p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  )
}
