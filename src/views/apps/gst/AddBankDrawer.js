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
import { addGst, editGst } from 'src/store/apps/gst'
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
  ).min(4, 'Bank Code is 4 letters only').max(4, 'Bank Code is 4 letters only'),
  ifscCode: yup.string().transform((originalValue) => originalValue.toUpperCase()).required('IFSC Code is a required field').matches(
    /^[A-Z]{4}0[A-Z0-9]{6}$/,
    "Invalid IFSC Code"
  ),
  companies: yup.array().test('not-empty', 'Company list should not be empty', (value) => {
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
    .min(10, 'Zonal Phone must be at least 10 characters long')
    .max(10, 'Zonal Phone must be at least 10 characters long')


})

const backendResponse = {


  "message": "Fetched GST Data Successfully",
  "gst": [
    {
      "_id": "65dd9514c8051cc29a989c59",
      "gstNumber": "22AAAAA0000A1Z5",
      "bank": {
        "_id": "65c5d94848f5313d4003c313",
        "bankName": "HDFC Bank",
        "bankCode": "HDFC789",
        "ifscCode": "BOIN000022345",
        "companies": [
          {
            "_id": "65c4a575e64f1337b5f38c71",
            "name": "Applore Associates",
            "type": "BPO",
            "address": "87/111 Hauz Khas",
            "state": "Delhi",
            "GST": "09AAACH7409R1ZQ",
            "panNumber": "ABCDE1234P",
            "phoneNumber": 9876897777,
            "email": "applore@applore.in",
            "__v": 0,
            "updatedAt": "2024-02-26T07:13:06.260Z"
          }
        ],
        "zonalPhone": "8765432109",
        "zonalEmail": "info@hdfcbank.com",
        "zonalAddress": "789 Zonal Street, Mumbai, India",
        "createdAt": "2024-02-09T07:50:32.258Z",
        "updatedAt": "2024-02-25T06:17:53.896Z",
        "__v": 0
      },
      "state": "Delhi",
      "createdAt": "2024-02-27T07:53:56.597Z",
      "updatedAt": "2024-02-27T07:53:56.597Z",
      "__v": 0
    },
    {
      "_id": "65dd9703e953b11134a71c66",
      "gstNumber": "22AAAAA0000A1Z9",
      "bank": {
        "_id": "65c5d94848f5313d4003c313",
        "bankName": "HDFC Bank",
        "bankCode": "HDFC789",
        "ifscCode": "BOIN000022345",
        "companies": [
          {
            "_id": "65c4a575e64f1337b5f38c71",
            "name": "Applore Associates",
            "type": "BPO",
            "address": "87/111 Hauz Khas",
            "state": "Delhi",
            "GST": "09AAACH7409R1ZQ",
            "panNumber": "ABCDE1234P",
            "phoneNumber": 9876897777,
            "email": "applore@applore.in",
            "__v": 0,
            "updatedAt": "2024-02-26T07:13:06.260Z"
          }
        ],
        "zonalPhone": "8765432109",
        "zonalEmail": "info@hdfcbank.com",
        "zonalAddress": "789 Zonal Street, Mumbai, India",
        "createdAt": "2024-02-09T07:50:32.258Z",
        "updatedAt": "2024-02-25T06:17:53.896Z",
        "__v": 0
      },
      "state": "Delhi",
      "createdAt": "2024-02-27T08:02:11.944Z",
      "updatedAt": "2024-02-27T08:02:11.944Z",
      "__v": 0
    },
    {
      "_id": "65dd97b6e953b11134a71c83",
      "gstNumber": "22AAAAA0000A1Z4",
      "bank": {
        "_id": "65c5d94848f5313d4003c313",
        "bankName": "HDFC Bank",
        "bankCode": "HDFC789",
        "ifscCode": "BOIN000022345",
        "companies": [
          {
            "_id": "65c4a575e64f1337b5f38c71",
            "name": "Applore Associates",
            "type": "BPO",
            "address": "87/111 Hauz Khas",
            "state": "Delhi",
            "GST": "09AAACH7409R1ZQ",
            "panNumber": "ABCDE1234P",
            "phoneNumber": 9876897777,
            "email": "applore@applore.in",
            "__v": 0,
            "updatedAt": "2024-02-26T07:13:06.260Z"
          }
        ],
        "zonalPhone": "8765432109",
        "zonalEmail": "info@hdfcbank.com",
        "zonalAddress": "789 Zonal Street, Mumbai, India",
        "createdAt": "2024-02-09T07:50:32.258Z",
        "updatedAt": "2024-02-25T06:17:53.896Z",
        "__v": 0
      },
      "state": "Delhi",
      "createdAt": "2024-02-27T08:05:10.945Z",
      "updatedAt": "2024-02-27T08:05:10.945Z",
      "__v": 0
    }
  ],
  "totalGsts": 3,
  "totalPage": 1,
  "perPage": 10,
  "currentPage": 1
};



const gstNumbers = backendResponse.gst.map(item => item.gstNumber);
const bankNames = backendResponse.gst.map(item => item.bank.bankName);
const states = backendResponse.gst.map(item => item.state);




const SidebarAddUser = props => {
  // ** Props
  const { bankId, open, toggle, gstData, editable, data } = props
  console.log("bankid", bankId)
  console.log(editable)
  console.log('gst data', gstData)


  console.log("GST Numbers:", gstNumbers);
  console.log("Bank Names:", bankNames);
  console.log("States:", states);

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

 

  const defaultValues = editable
    ? {
      gstNumber: gstData?.gstNumber || '',
      bankName: gstData?.bankName || [],
      state: gstData?.state || [],
    }
    : {
      gstNumber: '',
      bankName: [],
      state: [],
    };

  console.log("defaultValues", defaultValues);


  // companies state
  const [companiesData, setCompaniesData] = useState([])

  const [type, setType] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.gst)
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

  const banksData = [
    { _id: '1', name: 'State Bank of India' },
    { _id: '2', name: 'Indian Overseas Bank' },
    { _id: '3', name: 'Punjab National Bank' },
    { _id: '4', name: 'ICICI' }
    ,
    { _id: '4', name: 'HDFC' }

 
  ];


  const onSubmit = data => {
    console.log('onsubmit', data)
    data.companies = [...data.companies]
    if (editable) {
      console.log(editable)

      const gstId = gstData._id;

      console.log(gstId)
      dispatch(editGst({ gstId, data })).then((res) => {
        console.log(res)
        if (res.payload.error) {
          res.payload.error.forEach((err) => {
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
      dispatch(addGst({ ...data, role, currentPlan: plan })).then((res) => {
        if (res.payload.error) {
          res.payload.error.forEach((err) => {
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

  const handleChange = event => {
    console.log(event.target.value)
    setValue('companies', event.target.value)


  }

  const statesData = [
    { _id: '1', name: 'Delhi' },
    { _id: '2', name: 'Haryana' },
    { _id: '1', name: 'Odisha' },
    { _id: '2', name: 'Utter Pradesh' },
    { _id: '1', name: 'Punjab' },
    { _id: '2', name: 'Andhra Pradesh' },
    { _id: '1', name: 'Rajasthan' },
    { _id: '2', name: 'Bihar' },

  ];




  useEffect(() => {


    if (gstData) {

      console.log(gstData.companies)
      setValue('gstNumber', gstData?.gstNumber || '');
      setValue('bankName', gstData?.bankName || '');
      setValue('state', gstData?.state || []);


      setValue('companies', gstData?.companies?.map((company) => company._id) || []);



    }
  }, [gstData, setValue])

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
          {editable ? 'Edit' : 'Add'} GST
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
            name='gstNumber'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='GST No*'
                onChange={onChange}
                placeholder='GST No'
                error={Boolean(errors.gstNo)}
                {...(errors.gstNo && { helperText: errors.gstNo.message })}
              />
            )}
          />





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
                error={Boolean(errors.bank)}
                {...(errors.bank && { helperText: errors.bank.message })}
                SelectProps={{ MenuProps, value: field.value, onChange: e => field.onChange(e.target.value) }}
              >
                {banksData.map(bank => (
                  <MenuItem key={bank._id} value={bank._id}>
                    {bank.name}
                  </MenuItem>



                ))}

              </CustomTextField>
            )}
          />

          <Controller
            name='state'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                value={field.value}
                label='Select State*'
                id='validation-billing-select'
                error={Boolean(errors.state)}
                {...(errors.state && { helperText: errors.state.message })}
                SelectProps={{ MenuProps, value:field.value, onChange: e => field.onChange(e.target.value) }}
              >
                {statesData.map(state => (
                  <MenuItem key={state._id} value={state._id}>
                    {state.name}
                  </MenuItem>
                ))}
              </CustomTextField>
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
