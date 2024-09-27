import React, { ReactNode } from 'react'

const StatCard = (props: { title: string, value: string, statistic: string, description: string, icon: ReactNode}) => {
  return (
    <div className="stat shadow py-8 rounded-2xl bg-white items-center w-full min-h-40 max-h-40 md:min-w-80 md:max-w-80">
      <div className="stat-figure">
        {props.icon}
      </div>
      <div className="stat-title text-black text-xl">{props.title}</div>
      <div className="stat-value text-black text-2xl">{props.value}</div>
      <div className="stat-desc text-lg">{props.description}</div>
    </div>
  )
}

export default StatCard
