// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addBank ,editBank} from 'src/store/apps/bank'
import { Toaster, toast } from "react-hot-toast";

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  bankName: yup.string().required('Bank Name is a required field'),
  bankCode: yup.string().required('Bank Code is a required field').matches(
    /[A-Z]{4}/,
    "Invalid Bank Code"
  ).min(4,'Bank Code is 4 letters only').max(4,'Bank Code is 4 letters only'),
  ifscCode: yup.string().transform((originalValue) => originalValue.toUpperCase()).required('IFSC Code is a required field').matches(
    /^[A-Z]{4}0[A-Z0-9]{6}$/,
    "Invalid IFSC Code"
  ),
  companies: yup.array().test('not-empty', 'Company list should not be empty', (value)=>{
    return value && value.length > 0
  }).required(),
  zonalAddress: yup.string().required('Zonal Address is a required field'),
  zonalEmail: yup.string().required('Zonal Email is a required field').matches(
    /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
    "Invalid Email Id"
  ),
  zonalPhone: yup
    .string()
    .required('Zonal Phone is a required field')
    .min(10,'Zonal Phone must be at least 10 characters long')
    .max(10,'Zonal Phone must be at least 10 characters long')

     
})



const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, bankData,editable } = props
  console.log(editable)
  console.log('bank data', bankData)

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  console.log(bankData?.companies)

  const defaultValues = editable? {
    bankName: bankData.bankName,
    bankCode: bankData.bankCode,
    ifscCode: bankData.ifscCode,
    companies: bankData.companies,
    zonalPhone: bankData.zonalPhone,
    zonalEmail: bankData.zonalEmail,
    zonalAddress: bankData.zonalAddress
  }: {
    bankName: '',
    bankCode: '',
    ifscCode: '',
    companies: [],
    zonalPhone: '',
    zonalEmail: '',
    zonalAddress: ''
  }

  // companies state
  const [companiesData, setCompaniesData] = useState([])

  const [type, setType] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.bank)
  const token = useSelector(state => state.auth.token)

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const onSubmit = data => {
    console.log('onsubmit', data)
      data.companies = [...data.companies]
      if(editable){
        console.log(editable)
        const bankId = bankData._id;
        console.log(bankId)
        dispatch(editBank({bankId,data})).then((res) =>{
          console.log(res)
          if(res.payload.error){
            res.payload.error.forEach((err) =>{
              toast.error(err)
            })
          }
          else {
            toggle();
            reset();
          }
        })
      }
      else {
        dispatch(addBank({ ...data, role, currentPlan: plan })).then((res) =>{
          if(res.payload.error){
            res.payload.error.forEach((err) =>{
              toast.error(err)
            })
          }
          else {
            toggle();
            reset();
          }
        })
      }

     
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contact', Number(''))
    toggle()
    reset()
  }
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://habitus-admin-api.applore.in/api/v1/company/companies', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        const companyDataRes = await response.json()
        setCompaniesData(companyDataRes.companies)
      } catch (err) {
        console.log('Failed to fetch companies')
      }
    }
    fetchCompanies()
  }, [token])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }
  const [companyName, setCompanyName] = useState([])

  const handleChange = event =>{
    console.log(event.target.value)
    setValue('companies',event.target.value)

  }

  useEffect(() =>{
    if(bankData){
      console.log(bankData.companies)
      setValue('bankName', defaultValues.bankName)
      setValue('bankCode', defaultValues.bankCode)
      setValue('ifscCode', defaultValues.ifscCode)
      setValue('companies', defaultValues.companies.map((company) =>{
        return company._id
      }))
      setValue('zonalPhone', defaultValues.zonalPhone)
      setValue('zonalEmail', defaultValues.zonalEmail)
      setValue('zonalAddress', defaultValues.zonalAddress)
    }
  },[bankData, setValue])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography component={'span'} variant='h5'>
          {editable ? 'Edit' : 'Add'} Permission
        </Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='bankName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Bank Name*'
                onChange={onChange}
                placeholder='Bank of India'
                error={Boolean(errors.bankName)}

                {...(errors.bankName && { helperText: errors.bankName.message })}
              />
            )}
          />
           <Controller
            name='bankCode'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Bank Code*'
                onChange={onChange}
                placeholder='BOI'
                error={Boolean(errors.bankCode)}
                {...(errors.bankCode && { helperText: errors.bankCode.message })}
              />
            )}
          />
           <Controller
            name='ifscCode'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='IFSC Code*'
                onChange={onChange}
                placeholder='BOIKD0000123'
                error={Boolean(errors.ifscCode)}
                {...(errors.ifscCode && { helperText: errors.ifscCode.message })}
              />
            )}
          />
          <Controller
            name='companies'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                value={value}
                label='Select Company*'
                id='validation-billing-select'
                error={Boolean(errors.companies)}
                aria-describedby='validation-billing-select'
                {...(errors.companies && { helperText: errors.companies.message })}
                SelectProps={ {MenuProps, multiple: true, value: value  , onChange: e =>handleChange(e)} }
              >
                {companiesData.map(company => {
                  return (
                    <MenuItem key={company._id} value={company._id}>
                      {company.name}
                    </MenuItem>
                  )
                })}
              </CustomTextField>
            )}
          />
          
          <Controller
            name='zonalPhone'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}

                // type='number'
                label='Zonal Phone*'
                onChange={onChange}
                placeholder='9876543210'
                error={Boolean(errors.zonalPhone)}
                {...(errors.zonalPhone && { helperText: errors.zonalPhone.message })}
              />
            )}
          />
          <Controller
            name='zonalEmail'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                type='email'
                label='Zonal Email*'
                onChange={onChange}
                placeholder='info@bankofindia.com'
                error={Boolean(errors.zonalEmail)}
                {...(errors.zonalEmail && { helperText: errors.zonalEmail.message })}
              />
            )}
          />

          <Controller
            name='zonalAddress'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                label='Zonal Address*'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.zonalAddress)}
                placeholder='456 Zonal Avenue, Mumbai, India'
                {...(errors.zonalAddress && { helperText: errors.zonalAddress.message })}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Toaster position="top-right" />
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
