import React, { useContext } from 'react'
import alertContext from '../../context/alert/AlertContext'

const Alerts = () => {
  const AlertContext = useContext(alertContext)
  console.log(AlertContext)
  return (
    AlertContext.alerts.length > 0 &&
    AlertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <p><i className='fa fa-info-circle'/> {alert.msg}</p>
      </div>
    ))
  )
}

export default Alerts

