import React from 'react'

export const Score = ({score, best_score}) => {
  return (
    <div className='scores'>
      <h3>Current score: {score}</h3>
      <h3>Best score: {best_score}</h3>
    </div>
  )
}
