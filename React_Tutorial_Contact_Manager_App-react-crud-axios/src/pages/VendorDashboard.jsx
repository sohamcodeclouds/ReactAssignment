import React from 'react'
import { useParams } from 'react-router-dom'

const VendorDashboard = () => {
  const { vendorId } = useParams()
  console.log(vendorId)
  return <div>VendorDashboard</div>
}

export default VendorDashboard
