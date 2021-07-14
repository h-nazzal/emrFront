import axios from 'axios'
const base_url = 'http://localhost:8080'

export const AddPrescriptionToDB = data => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + '/visit/addPrescription', data)
      .then(res => {
        resolve(res.data.insertId)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const loadDrugs = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(base_url + '/drug/getAll')
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const loadMYDrugs = ptId => {
  return new Promise((resolve, reject) => {
    axios
      .get(base_url + '/visit/mydrugs/' + ptId)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const UnActiveDrug = id => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + '/visit/unactive_drug', {
        id: id
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const AddPrescriptionDrug = data => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + '/visit/addPrescription_Drugs_single', data)
      .then(res => {
        resolve(res.data.insertId)
      })
      .catch(err => {
        reject(err)
      })
  })
}
