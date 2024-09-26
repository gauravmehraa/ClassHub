import React, { ReactNode } from 'react'

const StatCard = (props: { title: string, value: string, statistic: string, description: string, icon: ReactNode}) => {
  return (
    <div className="stats shadow w-full md:w-auto">
      <div className="stat py-8 bg-white">
        <div className="stat-figure text-primary">
          {props.icon}
        </div>
        <div className="stat-title text-black text-xl">{props.title}</div>
        <div className="stat-value text-black text-2xl">{props.value}</div>
        <div className="stat-desc text-lg">{props.description}</div>
      </div>
    </div>
  )
}

export default StatCard
