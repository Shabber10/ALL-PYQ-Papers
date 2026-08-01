import React from 'react'
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ExternalLink, Download } from 'lucide-react'

export default function Table({ 
  papers, 
  selectedPaper, 
  onSelectPaper, 
  currentPage, 
  onPageChange,
  itemsPerPage 
}) {
  const totalPages = Math.ceil(papers.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPapers = papers.slice(startIndex, startIndex + itemsPerPage)

  const getCategoryBadgeClass = (category) => {
    switch (category.toLowerCase()) {
      case 'boards': return 'badge badge-boards'
      case 'upsc': return 'badge badge-upsc'
      case 'jee': return 'badge badge-jee'
      case 'neet': return 'badge badge-neet'
      default: return 'badge'
    }
  }

  return (
    <div className="table-card">
      <div className="table-header-toolbar">
        <h2 className="table-title">Exam Papers List</h2>
        <span className="table-count-badge">{papers.length} papers found</span>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Paper Subject / Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Year</th>
              <th>File Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPapers.length > 0 ? (
              paginatedPapers.map((paper) => (
                <tr 
                  key={paper.id} 
                  className={selectedPaper?.id === paper.id ? 'selected' : ''}
                  onClick={() => onSelectPaper(paper)}
                >
                  <td className="paper-name-cell" title={paper.subject}>
                    {paper.subject}
                  </td>
                  <td>
                    <span className={getCategoryBadgeClass(paper.category)}>
                      {paper.category}
                    </span>
                  </td>
                  <td>{paper.subcategory}</td>
                  <td>
                    <span className="badge-mono">{paper.year}</span>
                  </td>
                  <td>{paper.size_mb > 0 ? `${paper.size_mb} MB` : 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectPaper(paper)
                        }}
                      >
                        Details
                      </button>
                      <a 
                        className="btn btn-primary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', textDecoration: 'none' }}
                        href={paper.download_url.replace('raw.githubusercontent.com/Shabber10/ALL-PYQ-Papers/main', 'cdn.jsdelivr.net/gh/Shabber10/ALL-PYQ-Papers@main')}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open <ExternalLink size={12} />
                      </a>
                      <a 
                        className="btn btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', textDecoration: 'none' }}
                        href={paper.download_url}
                        download={paper.filename}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Download <Download size={12} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No papers found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="pagination-container">
          <span className="pagination-info">
            Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, papers.length)}</strong> of <strong>{papers.length}</strong> papers
          </span>
          
          <div className="pagination-buttons">
            <button 
              className="pagination-btn"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              title="First Page"
            >
              <ChevronsLeft size={16} />
            </button>
            
            <button 
              className="pagination-btn"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button 
              className="pagination-btn"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              title="Next Page"
            >
              <ChevronRight size={16} />
            </button>
            
            <button 
              className="pagination-btn"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              title="Last Page"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
