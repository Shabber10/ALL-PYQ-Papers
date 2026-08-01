import React from 'react'
import { Search, RotateCcw } from 'lucide-react'

export default function FilterBar({ 
  filters, 
  onFilterChange, 
  onReset,
  availableSubcategories,
  availableYears
}) {
  return (
    <div className="filters-card">
      <div className="search-box-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by subject, year, exam, state..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>
      
      <div className="filters-row">
        {/* Category Filter */}
        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Boards">Boards</option>
          <option value="UPSC">UPSC</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
        </select>
        
        {/* Subcategory Filter */}
        <select
          className="filter-select"
          value={filters.subcategory}
          onChange={(e) => onFilterChange('subcategory', e.target.value)}
          disabled={!filters.category}
        >
          <option value="">All Subcategories</option>
          {availableSubcategories.map((sub, idx) => (
            <option key={idx} value={sub}>{sub}</option>
          ))}
        </select>
        
        {/* Year Filter */}
        <select
          className="filter-select"
          value={filters.year}
          onChange={(e) => onFilterChange('year', e.target.value)}
        >
          <option value="">All Years</option>
          {availableYears.map((yr, idx) => (
            <option key={idx} value={yr}>{yr}</option>
          ))}
        </select>
        
        {/* Reset Filters */}
        <button className="btn btn-secondary" onClick={onReset} title="Reset all filters">
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  )
}
