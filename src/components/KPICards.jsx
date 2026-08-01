import React from 'react'
import { FileText, Award, Layers, Clipboard } from 'lucide-react'

export default function KPICards({ stats }) {
  const cards = [
    {
      label: 'Total PDF Papers',
      value: stats.total,
      icon: <FileText size={20} />,
    },
    {
      label: 'UPSC Papers',
      value: stats.upsc,
      icon: <Award size={20} />,
    },
    {
      label: 'JEE & NEET',
      value: stats.competitive,
      icon: <Layers size={20} />,
    },
    {
      label: 'Board Papers',
      value: stats.boards,
      icon: <Clipboard size={20} />,
    }
  ]

  return (
    <div className="kpi-grid">
      {cards.map((card, index) => (
        <div key={index} className="kpi-card">
          <div className="kpi-icon-wrapper">
            {card.icon}
          </div>
          <div className="kpi-info">
            <span className="kpi-label">{card.label}</span>
            <span className="kpi-value">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
