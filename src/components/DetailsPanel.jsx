import React from 'react'
import { X, ExternalLink, Download, Info } from 'lucide-react'

export default function DetailsPanel({ paper, onClose }) {
  if (!paper) return null

  return (
    <div className="details-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">{paper.subject}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ID: #{paper.id}
          </span>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close panel">
          <X size={18} />
        </button>
      </div>

      <div className="panel-content">
        <div className="meta-group">
          <span className="meta-label">Category</span>
          <span className="meta-value">{paper.category}</span>
        </div>

        <div className="meta-group">
          <span className="meta-label">Subcategory</span>
          <span className="meta-value">{paper.subcategory}</span>
        </div>

        <div className="meta-group">
          <span className="meta-label">Exam Year</span>
          <span className="meta-value">{paper.year}</span>
        </div>

        <div className="meta-group">
          <span className="meta-label">File Size</span>
          <span className="meta-value">
            {paper.size_mb > 0 ? `${paper.size_mb} MB` : 'Unknown'}
          </span>
        </div>

        <div className="meta-group">
          <span className="meta-label">Repository Path</span>
          <span className="meta-value path">{paper.path}</span>
        </div>

        <div className="alert-info">
          <Info size={18} />
          <div>
            Opening this file directly launches it in your browser's default PDF viewer. This bypasses GitHub's web preview size limits (e.g. for files &gt; 10MB).
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          <a 
            className="btn btn-primary" 
            href={paper.download_url.replace('raw.githubusercontent.com/Shabber10/ALL-PYQ-Papers/main', 'cdn.jsdelivr.net/gh/Shabber10/ALL-PYQ-Papers@main')} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <ExternalLink size={16} />
            Open PDF in Browser
          </a>
          
          <a 
            className="btn btn-secondary" 
            href={paper.download_url} 
            download={paper.filename}
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  )
}
