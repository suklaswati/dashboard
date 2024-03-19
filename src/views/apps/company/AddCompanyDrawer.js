// ** React Imports
import { useState, useEffect } from 'react'

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
import { addCompany, editCompany } from 'src/store/apps/company'
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
  name: yup.string().required('Company Name is a required field'),
  type: yup.string().required('Company Type is a required field'),
  address: yup.string().required('Company Address is a required field'),
  state: yup.string().required('State is a required field'),
  GST: yup.string().transform((originalValue, originalObject) => originalValue ? originalValue.toUpperCase() : originalValue).
  required('GST Number is a required field').matches(
    /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/,
    "Invalid GST"
  ),
  panNumber: yup.string().transform((originalValue) =>  originalValue.toUpperCase()).required('Pan Number is a required field').matches(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/gm,
    "Invalid Pan Number"
  ),
  email: yup.string().email().required('Email is a required field')
  .matches(
    /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
    "Invalid Email Id"
  ),
  phoneNumber: yup.string().required('Contact is a required field')
  .matches(/^[0-9]+$/, "Contact Number must contain digits only")
  .min(10, 'Contact Number must be exactly 10 digits')
  .max(10, 'Contact Number must be exactly 10 digits')

  
})

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, companyData, editable } = props
  console.log('data print horha hai', companyData)
  const [companyId, setCompanyId] = useState(companyData?._id)

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  const defaultValues = editable
    ? {
      name: companyData?.name || '',
      type: companyData?.type || '',
      address: companyData?.address || '',
      state: companyData?.state || '',
      GST: companyData?.GST || '',
      panNumber: companyData?.panNumber || '',
      phoneNumber: companyData?.phoneNumber || '',
      email: companyData?.email || '',
    }
  : {
      name: '',
      type: '',
      address: '',
      state: '',
      GST: '',
      panNumber: '',
      phoneNumber: '',
      email: '',
    };
  

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.company)

  

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,

    // mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // toast state
  const [errorModal, setErrorModal] = useState(false);

  const onSubmit = data => {
    console.log('onsubmit', data)

    
      if (editable) {
        const id = companyData._id
        dispatch(editCompany({ data, id })).then((res) =>{
          console.log(res)

          if(res.payload.error){
            res.payload.error.forEach((err)=>{
              toast.error(err)
             })
          }
          else {
            toggle();
            reset();
          }
        })
      } else {
        dispatch(addCompany({ ...data, role, currentPlan: plan })).then((res)=>{
          console.log(res)

          if(res.payload.error){
            res.payload.error.forEach((err)=>{
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
  useEffect(() =>{
    if(companyData){
      setValue('name', companyData.name);
      setValue('type', companyData.type);
      setValue('address', companyData.address);
      setValue('state', companyData.state);
      setValue('GST', companyData.GST);
      setValue('panNumber', companyData.panNumber);
      setValue('phoneNumber', companyData.phoneNumber);
      setValue('email', companyData.email);
    }
  },[companyData,setValue])

  const handleClose = () => {
    console.log('handle close reset')
    setPlan('basic')
    setRole('subscriber')

    
    toggle()
    reset()
  }
  
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
     
        <Typography variant='h5'>{editable? 'Edit': 'Add'} Company</Typography>
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
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Company Name*'
                onChange={e => {
                  console.log(e.target.value)
                  onChange(e.target.value)
                }}
                placeholder='Applore'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='type'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label='Select Company Type*'
                id='validation-billing-select'
                error={Boolean(errors.type)}
                aria-describedby='validation-billing-select'
                {...(errors.type && { helperText: errors.type.message })}
                SelectProps={{ value: value , onChange: e => onChange(e) }}
              >
                
                <MenuItem value='BPO'>BPO</MenuItem>
                <MenuItem value='Marketing'>Marketing</MenuItem>
              
              </CustomTextField>
            )}
          />
       
          <Controller
            name='address'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Company Address*'
                onChange={onChange}
                placeholder='Pegasus Tower, Noida'
                error={Boolean(errors.address)}
                {...(errors.address && { helperText: errors.address.message })}
              />
            )}
          />
          <Controller
            name='state'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                label='State'
                value={value===' '? value || defaultValues?.state:value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.state)}
                placeholder='Delhi'
                {...(errors.state && { helperText: errors.state.message })}
              />
            )}
          />
          <Controller
            name='GST'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='GST Number*'
                onChange={onChange}
                placeholder='09AAACH7409R1ZQ'
                error={Boolean(errors.GST)}
                {...(errors.GST && { helperText: errors.GST.message })}
              />
            )}
          />
          <Controller
            name='panNumber'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Pan Number*'
                onChange={onChange}
                placeholder='ABCDE1234P'
                error={Boolean(errors.panNumber)}
                {...(errors.panNumber && { helperText: errors.panNumber.message })}
              />
            )}
          />
          <Controller
            name='phoneNumber'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                type='text'
                label='Contact*'
                onChange={onChange}
                placeholder='(397) 294-5153'
                autoComplete="off"
                error={Boolean(errors.phoneNumber)}
                {...(errors.phoneNumber && { helperText: errors.phoneNumber.message })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='email'
                label='Email*'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder='uditkatyal@applore.in'
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}  >
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
