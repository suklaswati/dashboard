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
import { addBanker ,editBanker} from 'src/store/apps/banker'
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
const banksData = [
    { _id: 1, name: 'State Bank of India' },
    { _id: 2, name: 'Indian Overseas Bank' },
    { _id: 3, name: 'HDFC' },
    { _id: 4, name: 'ICICI' },

    // ... other banks
  ];


const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, bankerData,editable,data } = props
  console.log(editable)
  console.log('bank data', bankerData)

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  console.log(bankerData?.companies)

  // const defaultValues = editable? {
  //   bankName: bankerData.bankName,
  //   bankCode: bankData.bankCode,
  //   ifscCode: bankData.ifscCode,
  //   companies: bankData.companies,
  //   zonalPhone: bankData.zonalPhone,
  //   zonalEmail: bankData.zonalEmail,
  //   zonalAddress: bankData.zonalAddress
  // }: {
  //   bankName: '',
  //   bankCode: '',
  //   ifscCode: '',
  //   companies: [],
  //   zonalPhone: '',
  //   zonalEmail: '',
  //   zonalAddress: ''
  // }



  const defaultValues = editable ? {
    SelectBank: bankerData.bankName,
    BankerMobile: bankerData.bankerMobile,
    BankerName: bankerData.bankerName,
    Email: bankerData.email,
    OldMobileNo1: bankerData.oldMobileNo1,
    OldMobileNo2: bankerData.oldMobileNo2,
    Notes: bankerData.notes,
    Level2Profile: bankerData.level2Profile,
    Level3Profile: bankerData.level3Profile
  } : {
    SelectBank: '',
    BankerMobile: '',
    BankerName: '',
    Email: '',
    OldMobileNo1: '',
    OldMobileNo2: '',
    Notes: '',
    Level2Profile: '',
    Level3Profile: ''
  };
  








  // companies state
  const [companiesData, setCompaniesData] = useState([])

  const [type, setType] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.banker)
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
        const bankerId = bankerData._id;
        console.log(bankerId)
        dispatch(editBanker({bankerId,data})).then((res) =>{
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
        dispatch(addBanker({ ...data, role, currentPlan: plan })).then((res) =>{
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
    if(bankerData){
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
  },[bankerData, setValue])

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
          {editable ? 'Edit' : 'Add'} Banker
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
       render={({ field }) => (
       <CustomTextField
      select
      fullWidth
      sx={{ mb: 4 }}
      value={field.value}
      label='Select Bank*'
      error={Boolean(errors.bankName)}
      {...(errors.bankName && { helperText: errors.bankName.message })}
      SelectProps={{ MenuProps, value:field.value, onChange: e => field.onChange(e.target.value) }}
    >
      {banksData.map(bank => (
        <MenuItem key={bank._id} value={bank._id}>
          {bank.name}
        </MenuItem>
      ))}
    </CustomTextField>
  )}
/>

{/* Banker Mobile */}
<Controller
  name='bankerMobile'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      label='Banker Mobile*'
      onChange={onChange}
      placeholder='9876543210'
      error={Boolean(errors.bankerMobile)}
      {...(errors.bankerMobile && { helperText: errors.bankerMobile.message })}
    />
  )}
/>

{/* Banker Name */}
<Controller
  name='bankerName'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      label='Banker Name*'
      onChange={onChange}
      placeholder='John Doe'
      error={Boolean(errors.bankerName)}
      {...(errors.bankerName && { helperText: errors.bankerName.message })}
    />
  )}
/>

{/* Email */}
<Controller
  name='email'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      type='email'
      label='Email*'
      onChange={onChange}
      placeholder='john.doe@example.com'
      error={Boolean(errors.email)}
      {...(errors.email && { helperText: errors.email.message })}
    />
  )}
/>

{/* Old Mobile No 1 */}
<Controller
  name='oldMobileNo1'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      label='Old Mobile No 1*'
      onChange={onChange}
      placeholder='9812354245'
      error={Boolean(errors.oldMobileNo1)}
      {...(errors.oldMobileNo1 && { helperText: errors.oldMobileNo1.message })}
    />
  )}
/>

{/* Old Mobile No 2 */}
<Controller
  name='oldMobileNo2'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      label='Old Mobile No 2*'
      onChange={onChange}
      placeholder='7839856234'
      error={Boolean(errors.oldMobileNo2)}
      {...(errors.oldMobileNo2 && { helperText: errors.oldMobileNo2.message })}
    />
  )}
/>

{/* Visiting Card - Choose File Feature */}
<Controller
  name='visitingCard'
  control={control}
  rules={{ required: true }}
  render={({ field: { onChange } }) => (
    <CustomTextField
      fullWidth
      type='file'
      sx={{ mb: 4 }}
      label='Visiting Card*'
      onChange={(e) => onChange(e.target.files[0])}
      error={Boolean(errors.visitingCard)}
      InputLabelProps={{ shrink: true }}
      {...(errors.visitingCard && { helperText: errors.visitingCard.message })}
    />
  )}
/>




<Controller
  name='notes'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      label='Notes*'
      onChange={onChange}
      placeholder='notes'
      error={Boolean(errors.notes)}
      {...(errors.notes && { helperText: errors.notes.message })}
    />
  )}
/>



<Controller
  name='labelno2profile'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      label='Label no2 Profile*'
      onChange={onChange}
      placeholder='Label 2 Profile/Social Media'
      error={Boolean(errors.labelno2profile)}
      {...(errors.labelno2profile && { helperText: errors.labelno2profile.message })}
    />
  )}
/>





<Controller
  name='labelno3profile'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value}
      sx={{ mb: 4 }}
      label='Label no3 Profile*'
      onChange={onChange}
      placeholder='Label 3 Profile/Social Media'
      error={Boolean(errors.labelno3profile)}
      {...(errors.labelno3profile && { helperText: errors.labelno3profile.message })}
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
