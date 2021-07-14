import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { AddPrescriptionDrug, loadDrugs as LoadFromDB } from './request'
const useStyles = makeStyles(theme => ({
  root: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 10
  },
  formControl: {
    marginRight: 2,
    marginTop: 10,
    width: '100%'
  },
  button: {
    marginRight: 2,
    marginTop: 40,
    width: '100%'
  }
}))
export default function BasicTextFields ({ add_row, PID, ptId }) {
  const classes = useStyles()

  const [drugs, setDrugs] = React.useState([])

  const DrugSchema = Yup.object({
    quantity: Yup.number()
      .required()
      .min(1),
    drug: Yup.string().required(),
    notes: Yup.string(),
    duration: Yup.number().required()
  })

  const AddToDB = row => {
    console.log(row)
    var t = row.drug.split(',')
    let data = {
      Quantity: row.quantity,
      Duration: row.duration,
      drug_id: t[0],
      PId: PID,
      notes: row.notes,
      ptId: ptId,
      drId: localStorage.getItem('userId')
    }
    AddPrescriptionDrug(data)
      .then(result => {
        console.log('-----------------------------')
        console.log(result)
        add_row({
          drugName: t[1],
          Quantity: row.quantity,
          Duration: row.duration,
          notes: row.notes,
          id: result
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useEffect(async () => {
    await loadDrugs()
  }, [])

  const loadDrugs = () => {
    console.log(drugs)
    if (drugs.length > 0) {
      return
    }

    LoadFromDB()
      .then(data => {
        setDrugs(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <h1 style={{ textAlign: 'center' }}>Drugs</h1>
      <Formik
        validationSchema={DrugSchema}
        initialValues={{ quantity: 1, duration: 7, drug: '', notes: '' }}
        onSubmit={(values, actions) => {
          AddToDB(values)
          actions.resetForm()
        }}
      >
        {formikprops => (
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Drug Name</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={formikprops.values.drug}
                onChange={formikprops.handleChange('drug')}
                onBlur={formikprops.handleBlur('drug')}
                error={
                  formikprops.touched.drug && formikprops.errors.drug
                    ? true
                    : false
                }
              >
                {drugs.length > 0 &&
                  drugs.map(drug => (
                    <MenuItem key={drug.id} value={drug.id + ',' + drug.name}>
                      {drug.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                type='number'
                InputProps={{ inputProps: { min: 1, max: 6 } }}
                error={
                  formikprops.touched.quantity && formikprops.errors.quantity
                    ? true
                    : false
                }
                id='standard-basic'
                label='Quantity Per Day'
                value={formikprops.values.quantity}
                onChange={formikprops.handleChange('quantity')}
                onBlur={formikprops.handleBlur('quantity')}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                type='number'
                InputProps={{ inputProps: { min: 1 } }}
                error={
                  formikprops.touched.duration && formikprops.errors.duration
                    ? true
                    : false
                }
                id='standard-basic'
                label='Duration Per Day'
                value={formikprops.values.duration}
                onChange={formikprops.handleChange('duration')}
                onBlur={formikprops.handleBlur('duration')}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id='standard-textarea'
                label='Notes'
                placeholder='Write Any thing'
                multiline
                error={
                  formikprops.touched.notes && formikprops.errors.notes
                    ? true
                    : false
                }
                value={formikprops.values.notes}
                onChange={formikprops.handleChange('notes')}
                onBlur={formikprops.handleBlur('notes')}
              />
            </FormControl>
            <Button
              onClick={formikprops.handleSubmit}
              className={classes.button}
              variant='contained'
              color='primary'
            >
              Add
            </Button>
          </div>
        )}
      </Formik>
    </form>
  )
}
