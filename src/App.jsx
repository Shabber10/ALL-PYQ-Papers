import React, { useState, useMemo, useEffect } from 'react'
import Header from './components/Header'
import KPICards from './components/KPICards'
import FilterBar from './components/FilterBar'
import Table from './components/Table'
import DetailsPanel from './components/DetailsPanel'
import papersData from './data/papers.json'

export default function App() {
  // State variables
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subcategory: '',
    year: ''
  })
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // 1. Static counts for Overall Repository scale (KPI cards)
  const overallStats = useMemo(() => {
    let total = papersData.length
    let upsc = 0
    let competitive = 0
    let boards = 0

    papersData.forEach(p => {
      if (p.category === 'UPSC') upsc++
      else if (p.category === 'Boards') boards++
      else if (p.category === 'JEE' || p.category === 'NEET') competitive++
    })

    return { total, upsc, competitive, boards }
  }, [])

  // Reset pagination when any filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // 2. Extract available subcategories based on chosen category
  const availableSubcategories = useMemo(() => {
    if (!filters.category) return []
    const subs = new Set()
    papersData.forEach(p => {
      if (p.category === filters.category) {
        subs.add(p.subcategory)
      }
    })
    return Array.from(subs).sort()
  }, [filters.category])

  // 3. Extract available years based on chosen category/subcategory
  const availableYears = useMemo(() => {
    const yrs = new Set()
    papersData.forEach(p => {
      if (filters.category && p.category !== filters.category) return
      if (filters.subcategory && p.subcategory !== filters.subcategory) return
      if (p.year && p.year !== 'Unknown') {
        yrs.add(p.year)
      }
    })
    return Array.from(yrs).sort((a, b) => b.localeCompare(a)) // descending
  }, [filters.category, filters.subcategory])

  // Handle single filter modification
  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value }
      // If category is cleared, also clear subcategory
      if (key === 'category') {
        next.subcategory = ''
      }
      return next
    })
  }

  // Clear all filters
  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      subcategory: '',
      year: ''
    })
    setSelectedPaper(null)
    setCurrentPage(1)
  }

  // 4. Perform in-memory filtering of papers
  const filteredPapers = useMemo(() => {
    const query = filters.search.trim().toLowerCase()
    
    return papersData.filter(paper => {
      // Category filter
      if (filters.category && paper.category !== filters.category) return false
      
      // Subcategory filter
      if (filters.subcategory && paper.subcategory !== filters.subcategory) return false
      
      // Year filter
      if (filters.year && paper.year !== filters.year) return false
      
      // Text search filter
      if (query) {
        const matchesSubject = paper.subject.toLowerCase().includes(query)
        const matchesCategory = paper.category.toLowerCase().includes(query)
        const matchesSubcategory = paper.subcategory.toLowerCase().includes(query)
        const matchesYear = paper.year.toLowerCase().includes(query)
        const matchesFilename = paper.filename.toLowerCase().includes(query)
        
        return matchesSubject || matchesCategory || matchesSubcategory || matchesYear || matchesFilename
      }
      
      return true
    })
  }, [filters])

  return (
    <div className="app-container">
      {/* Header with Title and Dark Mode Toggle */}
      <Header />
      
      {/* Overview Stat Cards */}
      <KPICards stats={overallStats} />
      
      {/* Search and Dropdown Filter Row */}
      <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        availableSubcategories={availableSubcategories}
        availableYears={availableYears}
      />
      
      {/* Main Layout Area: Grid splits if details panel is visible */}
      <main className="main-layout">
        <div className={`table-container-wrapper ${selectedPaper ? 'collapsed' : ''}`}>
          <Table 
            papers={filteredPapers}
            selectedPaper={selectedPaper}
            onSelectPaper={setSelectedPaper}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
        
        {/* Right drawer details panel */}
        {selectedPaper && (
          <DetailsPanel 
            paper={selectedPaper}
            onClose={() => setSelectedPaper(null)}
          />
        )}
      </main>
    </div>
  )
}
