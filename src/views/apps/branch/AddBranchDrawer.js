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
import branch, { addBranch ,editBranch} from 'src/store/apps/branch'
import {Toaster, toast} from 'react-hot-toast'

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
  name: yup.string().required('Branch name is required field'),
  bank: yup.string().required('Bank is a required field'),
  ifscCode: yup.string().required('IFSC Code is a required field').matches(
    /^[A-Z]{4}0[A-Z0-9]{6}$/,
    "Invalid IFSC Code"
  ),
  address: yup.string().required('Address is a required field'),
  state: yup.string().required('State is a required field'),
  pincode: yup.string().required('Pincode is required').matches(
    /^[1-9][0-9]{5}$/,
    "Invalid Pincode"
  ),
  updateAddress: yup.string(),
  googleAddress: yup.string().required(),
  location: yup.object().required().shape({
      latitude: yup.string(),

      // matches(
      //   /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/,
      //   'Latitude must be a valid value'
      // ),
      longitude: yup.string()

      // .matches(
      //   /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/,
      //   'Longitude must be a valid value'
      // ),
    }),
  managerPhoneNumber:yup.string().required('Contact is a required field')
  .matches(/^[0-9]+$/, "Contact Number must contain digits only")
  .min(10, 'Contact Number must be exactly 10 digits')
  .max(10, 'Contact Number must be exactly 10 digits'),
  deptHeadPhoneNumber:yup.string().required('Contact is a required field')
  .matches(/^[0-9]+$/, "Contact Number must contain digits only")
  .min(10, 'Contact Number must be exactly 10 digits')
  .max(10, 'Contact Number must be exactly 10 digits'),
  email: yup.string().required('Email is required field').matches(
    /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
    "Invalid Email Id",),
  phoneNumber: yup.string().required('Contact is a required field')
    .matches(/^[0-9]+$/, "Contact Number must contain digits only")
    .min(10, 'Contact Number must be exactly 10 digits')
    .max(10, 'Contact Number must be exactly 10 digits'),
    marketer : yup.string().required(),
    serviceMarketer : yup.string().required(),
    bankers: yup.array().required()
})



const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, branchData,editable } = props
  console.log(editable)
  console.log('branch data', branchData)

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  // companies state
  const [banksData, setBanksData] = useState([])

  const defaultValues = editable ? {
    name: branchData?.name,
    bank: branchData?.bank,
    ifscCode: branchData?.ifscCode,
    address: branchData?.address,
    state: branchData?.state,
    pincode: branchData?.pincode,
    updateAddress: branchData?.updateAddress,
    googleAddress: branchData?.googleAddress,
    location: {
      latitude: branchData?.location?.latitude,
      longitude:branchData?.location?.longitude
    },
    managerPhoneNumber: branchData?.managerPhoneNumber,
    deptHeadPhoneNumber: branchData?.deptHeadPhoneNumber,
    email: branchData?.email,
    phoneNumber: branchData?.phoneNumber,
    marketer:branchData?.marketer,
    serviceMarketer:branchData?.serviceMarketer,
    bankers:branchData?.bankers
  }: {
    name: '',
    bank: '',
    ifscCode: '',
    address: '',
    state: '',
    pincode: '',
    updateAddress: '',
    googleAddress: '',
    location: {
      latitude:'',
      longitude:''
    },
    managerPhoneNumber: '',
    deptHeadPhoneNumber: '',
    email: '',
    phoneNumber: '',
    marketer:'',
    serviceMarketer:'',
    bankers:[]
  }


  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.branch)
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


  const onErrors = (err) =>{
  console.log(err)
  }

  const onSubmit = data => {
    console.log('onsubmit', data)
    console.log(editable)

   
      if(editable){
        console.log(editable)
        const branchId = branchData._id;
        console.log(branchId)
        dispatch(editBranch({branchId,data})).then((res) =>{
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
      else {
        dispatch(addBranch({ ...data, role, currentPlan: plan })).then((res)=>{
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

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contact', Number(''))
    toggle()
    reset()
  }

  // const [lat, setLat] = useState('');
  // const [long ,setLong] = useState('');

  // const [plan, setPlan] = useState('basic');
  // const [role, setRole] = useState('subscriber');
  // const [lat, setLat] = useState('');
  // const [long, setLong] = useState('');



  const [location, setLocation] = useState({ latitude: '', longitude: '' });








  useEffect(() => {
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(function(position){
  //       const {latitude , longitude } = position.coords;
  //       setLocation({ latitude: latitude.toString(), longitude: longitude.toString() });
  //     },
  //     function (error) {
  //       console.error("Error getting geolocation:", error);
  //     }
  // )}



  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude: latitude.toString(), longitude: longitude.toString() });
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      
    }
  };
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Button type='button' variant='contained' sx={{ mr: 3, mb: 4 }} onClick={handleGetLocation}>
    Get Current Location
  </Button>
</Box>



    const fetchBanks = async () => {
      try {
        const response = await fetch('https://habitus-admin-api.applore.in/api/v1/bank/banks', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        const bankDataRes = await response.json()
        setBanksData(bankDataRes.banks
          )
      } catch (err) {
        console.log('Failed to fetch banks')
      }
    }
    fetchBanks()

   if(branchData){
    setValue('name', defaultValues.name)
    setValue('bank', defaultValues.bank)
    setValue('ifscCode', defaultValues.ifscCode)
    setValue('address', defaultValues.address)
    setValue('pincode', defaultValues.pincode)
    setValue('state', defaultValues.state)
    setValue('updateAddress', defaultValues.updateAddress)
    setValue('googleAddress', defaultValues.googleAddress)
    // setValue('latitude', defaultValues.location.latitude)
    // setValue('longitude', defaultValues.location.longitude)
    setValue('managerPhoneNumber', defaultValues.managerPhoneNumber)
    setValue('deptHeadPhoneNumber', defaultValues.deptHeadPhoneNumber)
    setValue('email', defaultValues.email)
    setValue('phoneNumber', defaultValues.phoneNumber)
    setValue('marketer', defaultValues.marketer)
    setValue('serviceMarketer', defaultValues.serviceMarketer)
    setValue('bankers', defaultValues.bankers)

    setValue('location.latitude', defaultValues.location.latitude || lat);
    setValue('location.longitude', defaultValues.location.longitude || long);




   }

  }, [token, branchData, setValue])

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
        {editable ? 'Edit' : 'Add'} Branch
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
        <form onSubmit={handleSubmit(onSubmit,onErrors)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Branch Name'
                onChange={onChange}
                placeholder='Bank of India'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
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
                label='IFSC Code'
                onChange={onChange}

                // placeholder='BOI'
                error={Boolean(errors.ifscCode)}
                {...(errors.ifscCode && { helperText: errors.ifscCode.message })}
              />
            )}
          />
          <Controller
            name='bank'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                value={value}
                label='Select Bank'
                id='validation-billing-select'
                error={Boolean(errors.companies)}
                aria-describedby='validation-billing-select'
                {...(errors.bank && { helperText: errors.bank.message })}
                SelectProps={ {MenuProps, value: value , onChange: e =>onChange(e)} }
              >
                {banksData.map(bank => {
                  return (
                    <MenuItem key={bank._id} value={bank._id}>
                      {bank.bankName}
                    </MenuItem>
                  )
                })}
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
                label='Branch Address'
                onChange={onChange}

                // placeholder='BOIKD0000123'
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
                select
                fullWidth
                sx={{ mb: 4 }}
                value={value}
                label='Select State'
                id='validation-billing-select'
                error={Boolean(errors.state)}
                aria-describedby='validation-billing-select'
                {...(errors.state && { helperText: errors.state.message })}
                SelectProps={ {MenuProps, value: value , onChange: e =>onChange(e)} }
              >
                 <MenuItem value='Delhi'>
                      Delhi
                    </MenuItem>
                    <MenuItem value='UttarPradesh'>
                    Uttar Pradesh
                    </MenuItem>
                    <MenuItem value='gujrat'>
                    Gujrat
                    </MenuItem>
                    <MenuItem value='haryana'>
                    Haryana
                    </MenuItem>
              </CustomTextField>
            )}
          />
           <Controller
            name='pincode'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Pincode'
                onChange={onChange}
                placeholder='110059'
                error={Boolean(errors.pincode)}
                {...(errors.pincode && { helperText: errors.pincode.message })}
              />
            )}
          />
          <Controller
            name='updateAddress'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}

                // type='number'
                label='Updated Address'
                onChange={onChange}

                // placeholder='9876543210'
                error={Boolean(errors.updateAddress)}
                {...(errors.updateAddress && { helperText: errors.updateAddress.message })}
              />
            )}
          />
          <Controller
            name='googleAddress'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}

                // type='number'
                label='Google Address'
                onChange={onChange}

                // placeholder='9876543210'
                error={Boolean(errors.googleAddress)}
                {...(errors.googleAddress && { helperText: errors.googleAddress.message })}
              />
            )}
          />
          <Controller
            name='location.latitude'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
 
                // type='number'
                label='Latitude'
                onChange={onChange}

                // placeholder='9876543210'
                error={Boolean(errors.location?.latitude)}
                {...(errors.location?.latitude && { helperText: errors.location?.latitude.message })}
              />
            )}
          />
//           <Controller
//             name='location.longitude'
//             control={control}
//             rules={{ required: true }}
//             render={({ field: { value, onChange } }) => (
//               <CustomTextField
//                 fullWidth
//                 value={value}
//                 sx={{ mb: 4 }}


{/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button type='button' variant='contained' sx={{ mr: 3, mb: 4 }} onClick={handleGetLocation}>
          Get Current Location
        </Button>
      </Box> */}





      <Controller
  name='location.latitude'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value || location.latitude} // Use the form state value or location.latitude
      sx={{ mb: 4 }}
      label='Latitude'
      onChange={onChange}
      disabled={Boolean(location.latitude)} // Disable input if location.latitude is already filled
      // placeholder='9876543210'
      error={Boolean(errors.location?.latitude)}
      {...(errors.location?.latitude && { helperText: errors.location?.latitude.message })}
    />
  )}

  />
 
<Controller
  name='location.longitude'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <CustomTextField
      fullWidth
      value={value || location.longitude} // Use the form state value or location.longitude
      sx={{ mb: 4 }}
      label='Longitude'
      onChange={onChange}
      disabled={Boolean(location.longitude)} // Disable input if location.longitude is already filled
      // placeholder='9876543210'
      error={Boolean(errors.location?.longitude)}
      {...(errors.location?.longitude && { helperText: errors.location?.longitude.message })}
    />
  )}
/>
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
              <Button type='button' variant='contained' sx={{ mr: 3 , mb:4 }}>
                    Get Address
              </Button>
          </Box>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}

                // type='email'
                label='Email'
                onChange={onChange}
                placeholder='info@bankofindia.com'
                error={Boolean(errors.email)}
                {...(errors.email && { helperText: errors.email.message })}
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
                label='Phone Number'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.phoneNumber)}

                // placeholder='456 Zonal Avenue, Mumbai, India'
                {...(errors.phoneNumber && { helperText: errors.phoneNumber.message })}
              />
            )}
          /> 
          <Controller
            name='managerPhoneNumber'
            control={control}
            rules={{ required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                label='Branch Manager Mobile'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.managerPhoneNumber)}

                // placeholder='456 Zonal Avenue, Mumbai, India'
                {...(errors.managerPhoneNumber && { helperText: errors.managerPhoneNumber.message })}
              />
            )}
          /> 
          <Controller
            name='deptHeadPhoneNumber'
            control={control}
            rules={{ required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                label='Dept Head Mobile'

                // type='number'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.deptHeadPhoneNumber)}

                {...(errors.deptHeadPhoneNumber && { helperText: errors.deptHeadPhoneNumber.message })}
              />
            )}
          /> 
          <Controller
            name='marketer'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                value={value}
                label='Select Marketer'
                id='validation-billing-select'
                error={Boolean(errors.bankers)}
                aria-describedby='validation-billing-select'
                {...(errors.bankers && { helperText: errors.bankers.message })}
                SelectProps={ {value: value  , onChange: e =>onChange(e)} }
              >
                    <MenuItem value='Zafar'>
                      Zafar
                    </MenuItem>
                    <MenuItem value='Raman'>
                      Raman
                    </MenuItem>
                    <MenuItem value='Naman'>
                      Naman
                    </MenuItem>
              </CustomTextField>
            )}
          /> 
           <Controller
            name='serviceMarketer'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                value={value}
                label='Select Service Marketer'
                id='validation-billing-select'
                error={Boolean(errors.bankers)}
                aria-describedby='validation-billing-select'
                {...(errors.bankers && { helperText: errors.bankers.message })}
                SelectProps={ {value: value  , onChange: e =>onChange(e)} }
              >
                    <MenuItem value='Zafar'>
                      Zafar
                    </MenuItem>
                    <MenuItem value='Raman'>
                      Raman
                    </MenuItem>
                    <MenuItem value='Naman'>
                      Naman
                    </MenuItem>
              </CustomTextField>
            )}
          /> 
          


            {/* <Controller
            name='bankers'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                value={value}
                label='Select Bankers'
                id='validation-billing-select'
                error={Boolean(errors.bankers)}
                aria-describedby='validation-billing-select'
                {...(errors.bankers && { helperText: errors.bankers.message })}
                SelectProps={ {value: value  , onChange: e =>onChange(e)} }
              >
                    <MenuItem value='banker1'>
                      Banker 1
                    </MenuItem>
                    <MenuItem value='banker2'>
                      Banker 2
                    </MenuItem>
                    <MenuItem value='banker3'>
                      Banker 3
                    </MenuItem>
              </CustomTextField>
            )}
          /> */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Toaster postion='top-right' />
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
