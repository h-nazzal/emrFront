import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import DataTableComp from '../typesGenerator/dataTable'

const columns = [
  {
    name: 'diagnosis',
    selector: 'diagnosis'
  },
  {
    name: 'Chief Complains',
    selector: 'chiefComplains'
  },
  {
    name: 'Treating Doctor',
    selector: 'firstName,lastName',
    cell: row => <span>{row.firstName + ' ' + row.lastName}</span>
  },
  {
    name: 'Date of Creation',
    selector: 'createdAt'
  }
]

const VisitScreen = ({ match }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (!match.params.id) return
    axios
      .post(`http://localhost:8080/visit/getPatientVisits`, {
        ptId: match.params.id,
        type: 'patient'
      })
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        alert(err)
      })
  }, [match])

  return (
    <Container>
      <DataTableComp data={data} columns={columns} title='' />
    </Container>
  )
}

export default VisitScreen
