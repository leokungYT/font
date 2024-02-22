import axios from 'axios'
import { useEffect, useState } from 'react'

export default function UserHome() {
  const [todos, setREIN] = useState([])

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8000/recordINs', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setREIN(rs.data.recordIN)
    }
    run()
  }, [])

  return (
    <>
      <div>UserHome</div>
      {JSON.stringify(todos)}
    </>
  )
}
