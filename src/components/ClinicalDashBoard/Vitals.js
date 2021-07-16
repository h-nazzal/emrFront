import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import DataTableComp from '../typesGenerator/dataTable'

const columns = [
  {
    name: 'Time',
    selector: 'time',
    sortable: true
  },
  {
    name: 'Temperature',
    selector: 'temperature',
    sortable: true,
    center: true
  },
  {
    name: 'Pulse',
    selector: 'pulse',
    sortable: true,
    center: true
  },
  {
    name: 'BP',
    selector: 'systolic',
    sortable: true,
    center: true,
    width: '200px'
  },
  {
    name: 'OxygenSaturation',
    selector: 'oxygenSaturation',
    sortable: true
  },
  {
    name: 'Blood Glucose Level',
    selector: 'bloodGlucoseLevel',
    sortable: true,
    center: true
  },
  {
    name: 'smoking status',
    selector: 'cigarettes',
    sortable: true,
    center: true
  }
]

const VisitScreen = ({ match }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (!match.params.id) return
    axios
      .post(`http://localhost:8080/nurse/getByPtId`, {
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
      <h3>Vitals taken :</h3>
      <DataTableComp data={data} columns={columns} title='' />
    </Container>
  )
}

export default VisitScreen
