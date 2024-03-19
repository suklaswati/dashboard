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
import { addEmployee, editEmployee } from 'src/store/apps/employee'
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
  employeeName: yup.string().required('Employee Name is a required field'),
  mobileNumber: yup.number().required('Mobile Number is a required field').positive('Mobile Number must be a positive number'),
  email: yup.string().required('Email is a required field').matches(
    /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
    "Invalid Email Id"
  ),
  password: yup.string().required('Password is a required field'),
  dayCost: yup.number().required('Day Cost is a required field').positive('Day Cost must be a positive number'),
  address: yup.string().required('Address is a required field'),
  qualifications: yup.string().required('Qualifications is a required field'),
  homeAddress: yup.string().required('Home Address is a required field'),
  parentsPhone: yup.number().required('Parents Phone is a required field').positive('Parents Phone must be a positive number'),
  otherInformation: yup.string().required('Other Information is a required field')
});







const backendResponse = {


  "message": "Employee data fetched Successfully",
  "employees": [
    {
      "teamEmployees": [],
      "locations": [],
      "_id": "65c9f62d282679f1bd28f67c",
      "company": {
        "_id": "65c4a575e64f1337b5f38c71",
        "name": "Applore Associates",
        "type": "BPO",
        "address": "87/111 Hauz Khas delhi",
        "state": "Delhi",
        "GST": "09AAACH7409R1ZQ",
        "panNumber": "ABCDE1234P",
        "phoneNumber": 9876897777,
        "email": "applore@applore.in",
        "__v": 0,
        "updatedAt": "2024-03-06T12:38:56.359Z"
      },
      "name": "John Doe",
      "phoneNumber": 1234567890,
      "email": "john.doe@example.com",
      "password": "password123",
      "dayCost": "1000",
      "roles": [
        {
          "_id": "65ddc93453dee6747a2df22c",
          "role": "Marketer",
          "companyType": "Marketing",
          "__v": 0
        }
      ],
      "address": "123 Main Street, Cityville",
      "additionalInfo": {
        "qualification": "abcd qualify",
        "homeAddress": "123 Main Street",
        "parentPhone": 8765897657,
        "otherInfo": "None",
        "_id": "65c9f62d282679f1bd28f67d"
      },
      "createdAt": "2024-02-12T10:42:53.076Z",
      "updatedAt": "2024-02-12T10:42:53.076Z",
      "__v": 0
    },
    {
      "_id": "65c9fc52cb9b68fc5092663b",
      "company": {
        "_id": "65c4a575e64f1337b5f38c71",
        "name": "Applore Associates",
        "type": "BPO",
        "address": "87/111 Hauz Khas delhi",
        "state": "Delhi",
        "GST": "09AAACH7409R1ZQ",
        "panNumber": "ABCDE1234P",
        "phoneNumber": 9876897777,
        "email": "applore@applore.in",
        "__v": 0,
        "updatedAt": "2024-03-06T12:38:56.359Z"
      },
      "name": "John Doe 2",
      "phoneNumber": 1234567899,
      "email": "john.doe2@example.com",
      "password": "$2b$12$KjN3OTZNg5aqpqQAGOG7xOlDU5KRbo7YUYAa6kY7eHC2JXhVx/Ehe",
      "dayCost": "1000",
      "roles": [
        {
          "_id": "65ddc93453dee6747a2df22c",
          "role": "Marketer",
          "companyType": "Marketing",
          "__v": 0
        }
      ],
      "address": "123 Main Street, Cityville",
      "additionalInfo": {
        "qualification": "abcd qualify",
        "homeAddress": "123 Main Street",
        "parentPhone": 8765897657,
        "otherInfo": "None",
        "_id": "65c9fc52cb9b68fc5092663c"
      },
      "createdAt": "2024-02-12T11:09:06.561Z",
      "updatedAt": "2024-02-29T11:50:43.244Z",
      "__v": 1,
      "locations": [
        "Delhi"
      ],
      "teamEmployees": []
    },
    {
      "teamEmployees": [],
      "locations": [],
      "_id": "65ddbe46c99b09a3e91db341",
      "company": {
        "_id": "65cf308352f5a9220fd4f1b9",
        "name": "Udit Associates",
        "type": "BPO",
        "address": "42 greater noidaa",
        "state": "Uttar pradesh",
        "GST": "09AAWCH7409R1ZQ",
        "panNumber": "ABCDE12csvsv",
        "phoneNumber": 9872345678,
        "email": "3@gmail.com",
        "createdAt": "2024-02-16T09:53:07.263Z",
        "updatedAt": "2024-02-23T13:55:49.162Z",
        "__v": 0
      },
      "name": "Uditkatyal",
      "phoneNumber": 1234577899,
      "email": "udit12@example.com",
      "password": "$2b$12$uyK0N1lEy/mDt7.rY3813enC/ESLZ.uSI4yQcycbwtSSNJeUPb90q",
      "dayCost": "3000",
      "roles": [
        {
          "_id": "65ddc94853dee6747a2df22f",
          "role": "Lead Marketer",
          "companyType": "Marketing",
          "__v": 0
        }
      ],
      "address": "123 Main Street, Cityville",
      "additionalInfo": {
        "qualification": "abcd qualify",
        "homeAddress": "123 Main Street",
        "parentPhone": 8765897657,
        "otherInfo": "None",
        "_id": "65ddbe46c99b09a3e91db342"
      },
      "createdAt": "2024-02-27T10:49:42.246Z",
      "updatedAt": "2024-02-28T07:54:24.208Z",
      "__v": 0
    },
    {
      "locations": [],
      "_id": "65deec53355c1f97079f1dbe",
      "company": {
        "_id": "65cf308352f5a9220fd4f1b9",
        "name": "Udit Associates",
        "type": "BPO",
        "address": "42 greater noidaa",
        "state": "Uttar pradesh",
        "GST": "09AAWCH7409R1ZQ",
        "panNumber": "ABCDE12csvsv",
        "phoneNumber": 9872345678,
        "email": "3@gmail.com",
        "createdAt": "2024-02-16T09:53:07.263Z",
        "updatedAt": "2024-02-23T13:55:49.162Z",
        "__v": 0
      },
      "name": "Uditkatyal23",
      "phoneNumber": 1234567879,
      "email": "uditkatyal@example.com",
      "password": "$2b$12$hTr4spbUFCTDxWQmvru2AOZ.crjwOcOjMUymvaHJLK/754GX2zH6y",
      "dayCost": "3000",
      "roles": [
        {
          "_id": "65ddc94853dee6747a2df22f",
          "role": "Lead Marketer",
          "companyType": "Marketing",
          "__v": 0
        }
      ],
      "address": "123 Main Street, Cityville",
      "additionalInfo": {
        "qualification": "abcd qualify",
        "homeAddress": "123 Main Street",
        "parentPhone": 8765897657,
        "otherInfo": "None",
        "_id": "65deec53355c1f97079f1dbf"
      },
      "teamEmployees": [
        {
          "teamEmployees": [],
          "locations": [],
          "_id": "65c9f62d282679f1bd28f67c",
          "company": "65c4a575e64f1337b5f38c71",
          "name": "John Doe",
          "phoneNumber": 1234567890,
          "email": "john.doe@example.com",
          "password": "password123",
          "dayCost": "1000",
          "roles": [
            {
              "_id": "65ddc93453dee6747a2df22c",
              "role": "Marketer",
              "companyType": "Marketing",
              "__v": 0
            }
          ],
          "address": "123 Main Street, Cityville",
          "additionalInfo": {
            "qualification": "abcd qualify",
            "homeAddress": "123 Main Street",
            "parentPhone": 8765897657,
            "otherInfo": "None",
            "_id": "65c9f62d282679f1bd28f67d"
          },
          "createdAt": "2024-02-12T10:42:53.076Z",
          "updatedAt": "2024-02-12T10:42:53.076Z",
          "__v": 0
        },
        {
          "_id": "65c9fc52cb9b68fc5092663b",
          "company": "65c4a575e64f1337b5f38c71",
          "name": "John Doe 2",
          "phoneNumber": 1234567899,
          "email": "john.doe2@example.com",
          "password": "$2b$12$KjN3OTZNg5aqpqQAGOG7xOlDU5KRbo7YUYAa6kY7eHC2JXhVx/Ehe",
          "dayCost": "1000",
          "roles": [
            {
              "_id": "65ddc93453dee6747a2df22c",
              "role": "Marketer",
              "companyType": "Marketing",
              "__v": 0
            }
          ],
          "address": "123 Main Street, Cityville",
          "additionalInfo": {
            "qualification": "abcd qualify",
            "homeAddress": "123 Main Street",
            "parentPhone": 8765897657,
            "otherInfo": "None",
            "_id": "65c9fc52cb9b68fc5092663c"
          },
          "createdAt": "2024-02-12T11:09:06.561Z",
          "updatedAt": "2024-02-29T11:50:43.244Z",
          "__v": 1,
          "locations": [
            "Delhi"
          ],
          "teamEmployees": []
        }
      ],
      "createdAt": "2024-02-28T08:18:27.681Z",
      "updatedAt": "2024-02-28T08:18:27.681Z",
      "__v": 0
    },
    {
      "locations": [],
      "_id": "65df28ebc034c8226bcac107",
      "company": {
        "_id": "65cf308352f5a9220fd4f1b9",
        "name": "Udit Associates",
        "type": "BPO",
        "address": "42 greater noidaa",
        "state": "Uttar pradesh",
        "GST": "09AAWCH7409R1ZQ",
        "panNumber": "ABCDE12csvsv",
        "phoneNumber": 9872345678,
        "email": "3@gmail.com",
        "createdAt": "2024-02-16T09:53:07.263Z",
        "updatedAt": "2024-02-23T13:55:49.162Z",
        "__v": 0
      },
      "name": "Uditkatyal45",
      "phoneNumber": 1234537879,
      "email": "uditkatyal1@example.com",
      "password": "$2b$12$2JS6dgIl2kvkDsY.LAwBVexU0ubA0YHSrZukf/s/JtsKnj88zTsQW",
      "dayCost": "3000",
      "roles": [
        {
          "_id": "65ddc94853dee6747a2df22f",
          "role": "Lead Marketer",
          "companyType": "Marketing",
          "__v": 0
        }
      ],
      "address": "123 Main Street, Cityville",
      "additionalInfo": {
        "qualification": "abcd qualify",
        "homeAddress": "123 Main Street",
        "parentPhone": 8765897657,
        "otherInfo": "None",
        "_id": "65df28ebc034c8226bcac108"
      },
      "teamEmployees": [
        {
          "teamEmployees": [],
          "locations": [],
          "_id": "65c9f62d282679f1bd28f67c",
          "company": "65c4a575e64f1337b5f38c71",
          "name": "John Doe",
          "phoneNumber": 1234567890,
          "email": "john.doe@example.com",
          "password": "password123",
          "dayCost": "1000",
          "roles": [
            {
              "_id": "65ddc93453dee6747a2df22c",
              "role": "Marketer",
              "companyType": "Marketing",
              "__v": 0
            }
          ],
          "address": "123 Main Street, Cityville",
          "additionalInfo": {
            "qualification": "abcd qualify",
            "homeAddress": "123 Main Street",
            "parentPhone": 8765897657,
            "otherInfo": "None",
            "_id": "65c9f62d282679f1bd28f67d"
          },
          "createdAt": "2024-02-12T10:42:53.076Z",
          "updatedAt": "2024-02-12T10:42:53.076Z",
          "__v": 0
        },
        {
          "_id": "65c9fc52cb9b68fc5092663b",
          "company": "65c4a575e64f1337b5f38c71",
          "name": "John Doe 2",
          "phoneNumber": 1234567899,
          "email": "john.doe2@example.com",
          "password": "$2b$12$KjN3OTZNg5aqpqQAGOG7xOlDU5KRbo7YUYAa6kY7eHC2JXhVx/Ehe",
          "dayCost": "1000",
          "roles": [
            {
              "_id": "65ddc93453dee6747a2df22c",
              "role": "Marketer",
              "companyType": "Marketing",
              "__v": 0
            }
          ],
          "address": "123 Main Street, Cityville",
          "additionalInfo": {
            "qualification": "abcd qualify",
            "homeAddress": "123 Main Street",
            "parentPhone": 8765897657,
            "otherInfo": "None",
            "_id": "65c9fc52cb9b68fc5092663c"
          },
          "createdAt": "2024-02-12T11:09:06.561Z",
          "updatedAt": "2024-02-29T11:50:43.244Z",
          "__v": 1,
          "locations": [
            "Delhi"
          ],
          "teamEmployees": []
        },
        {
          "_id": "65e03c7786a612066d9d38d1",
          "company": "65cf308352f5a9220fd4f1b9",
          "name": "marketerUdit",
          "phoneNumber": 1232537879,
          "email": "marketeruditkatyal@example.com",
          "password": "$2b$12$0dLY57f40YL8NCIpQ5FlGe2j9yoX4C7MbzS0H5l4QlnShlHkjLMRm",
          "dayCost": "2000",
          "roles": [
            {
              "_id": "65ddc93453dee6747a2df22c",
              "role": "Marketer",
              "companyType": "Marketing",
              "__v": 0
            }
          ],
          "address": "123 Main Street, Cityville",
          "additionalInfo": {
            "qualification": "abcd qualify",
            "homeAddress": "123 Main Street",
            "parentPhone": 8765897657,
            "otherInfo": "None",
            "_id": "65e03c7786a612066d9d38d2"
          },
          "teamEmployees": [],
          "locations": [
            "Janakpuri",
            "RajouriGarden",
            "Rohini",
            "Delhi"
          ],
          "createdAt": "2024-02-29T08:12:39.492Z",
          "updatedAt": "2024-02-29T11:50:18.327Z",
          "__v": 3
        }
      ],
      "createdAt": "2024-02-28T12:36:59.841Z",
      "updatedAt": "2024-02-29T08:14:00.712Z",
      "__v": 5
    },
    {
      "_id": "65e03c7786a612066d9d38d1",
      "company": {
        "_id": "65cf308352f5a9220fd4f1b9",
        "name": "Udit Associates",
        "type": "BPO",
        "address": "42 greater noidaa",
        "state": "Uttar pradesh",
        "GST": "09AAWCH7409R1ZQ",
        "panNumber": "ABCDE12csvsv",
        "phoneNumber": 9872345678,
        "email": "3@gmail.com",
        "createdAt": "2024-02-16T09:53:07.263Z",
        "updatedAt": "2024-02-23T13:55:49.162Z",
        "__v": 0
      },
      "name": "marketerUdit",
      "phoneNumber": 1232537879,
      "email": "marketeruditkatyal@example.com",
      "password": "$2b$12$0dLY57f40YL8NCIpQ5FlGe2j9yoX4C7MbzS0H5l4QlnShlHkjLMRm",
      "dayCost": "2000",
      "roles": [
        {
          "_id": "65ddc93453dee6747a2df22c",
          "role": "Marketer",
          "companyType": "Marketing",
          "__v": 0
        }
      ],
      "address": "123 Main Street, Cityville",
      "additionalInfo": {
        "qualification": "abcd qualify",
        "homeAddress": "123 Main Street",
        "parentPhone": 8765897657,
        "otherInfo": "None",
        "_id": "65e03c7786a612066d9d38d2"
      },
      "teamEmployees": [],
      "locations": [
        "Janakpuri",
        "RajouriGarden",
        "Rohini",
        "Delhi"
      ],
      "createdAt": "2024-02-29T08:12:39.492Z",
      "updatedAt": "2024-02-29T11:50:18.327Z",
      "__v": 3
    }
  ],
  "totalEmployees": 6,
  "totalPage": 1,
  "perPage": 10,
  "currentPage": 1
};



const companies = backendResponse.employees.map(employee => employee.company.name);
const employeeNames = backendResponse.employees.map(employee => employee.name);
const mobileNumbers = backendResponse.employees.map(employee => employee.phoneNumber);
const emails = backendResponse.employees.map(employee => employee.email);

const passwords = backendResponse.employees.map(employee => employee.password);
const dayCosts = backendResponse.employees.map(employee => parseFloat(employee.dayCost));
const addresses = backendResponse.employees.map(employee => employee.address);



const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, employeeData, editable, data } = props
  console.log(editable)
  console.log('employee data', employeeData)

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  console.log(employeeData?.companies)

  console.log("Companies:", companies);
  console.log("Employee Names:", employeeNames);
  console.log("Mobile Numbers:", mobileNumbers);
  console.log("Emails:", emails);
  console.log("Passwords:", passwords);
  console.log("Day Costs:", dayCosts);
  console.log("Addresses:", addresses);


  // debugger;
  const defaultValues = editable
    ? {
      // company: employeeData?.company?.[0]?.name || '',
      employeeName: employeeData?.name || '',
      mobile: employeeData?.phoneNumber || '',
      email: employeeData?.email || '',
      password: employeeData?.password || '',
      dayCost: employeeData?.dayCost || '',
      address: employeeData?.address || '',

    }
    : {
      // company: '', // Default value for Company (assuming it's a dropdown)
      employeeName: '',
      mobile: '',
      email: '',
      password: '',
      dayCost: '',
      address: '',

    };
  console.log(employeeData)

  console.log("defaultValues", defaultValues);






  // companies state
  const [companiesData, setCompaniesData] = useState([])

  const [type, setType] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.employee)
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
    if (editable) {
      console.log(editable)
      const employeeId = employeeData._id;
      console.log(employeeId)
      dispatch(editEmployee({ employeeId, data })).then((res) => {
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
      dispatch(addEmployee({ ...data, role, currentPlan: plan })).then((res) => {
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

    // setCompanyName(event.target.value)
  }
 


  useEffect(() => {

    // console.log("Employee Data:", employeeData);
    if (employeeData) {


      // setValue('company', employeeData.company?._id || '');
      setValue('employeeName', employeeData.name || '');
      setValue('mobile', employeeData.phoneNumber || '');
      setValue('email', employeeData.email || '');
      setValue('password', employeeData.password || '');
      setValue('dayCost', employeeData.dayCost || '');
      setValue('address', employeeData.address || '');
    }
  }, [employeeData, setValue]);



 





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
          {editable ? 'Edit' : 'Add'} Employee
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
            name='company'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
          
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                value={field.value}  // Ensure that value is an array
                label='Company*'
                placeholder='Select Company'
                id='validation-billing-select'
                error={Boolean(errors.companies)}
                aria-describedby='validation-billing-select'
                {...(errors.companies && { helperText: errors.companies.message })}
                SelectProps={{ MenuProps, value: field.value, onChange: e => field.onChange(e.target.value) }}
              >
                {companiesData.map(company => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />


          <Controller
            name='employeeName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Employee Name*'
                onChange={onChange}
                placeholder='John Doe'
                error={Boolean(errors.employeeName)}
                {...(errors.employeeName && { helperText: errors.employeeName.message })}
              />
            )}
          />

          <Controller
            name='mobile'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Mobile*'
                onChange={onChange}
                placeholder='9876543210'
                error={Boolean(errors.mobile)}
                {...(errors.mobile && { helperText: errors.mobile.message })}
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
                value={value}
                sx={{ mb: 4 }}
                type='email'
                label='Email*'
                onChange={onChange}
                placeholder='john@example.com'
                error={Boolean(errors.email)}
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                type='password'
                label='Password*'
                onChange={onChange}
                placeholder='********'
                error={Boolean(errors.password)}
                {...(errors.password && { helperText: errors.password.message })}
              />
            )}
          />

          <Controller
            name='dayCost'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                type='number'
                label='Day Cost*'
                onChange={onChange}
                placeholder='Enter day cost'
                error={Boolean(errors.dayCost)}
                {...(errors.dayCost && { helperText: errors.dayCost.message })}
              />
            )}
          />

          <Controller
            name='address'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                label='Address*'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.address)}
                placeholder='123 Main St, City, Country'
                {...(errors.address && { helperText: errors.address.message })}
              />
            )}
          />
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Additional Information
            </Typography>

            <Controller
              name='qualification'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  label='Qualification'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.qualification)}
                  placeholder='Enter qualification'
                  {...(errors.qualification && { helperText: errors.qualification.message })}
                />
              )}
            />

            <Controller
              name='homeAddress'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  label='Home Address'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.homeAddress)}
                  placeholder='123 Home St, City, Country'
                  {...(errors.homeAddress && { helperText: errors.homeAddress.message })}
                />
              )}
            />

            <Controller
              name='parentPhone'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  label='Parent Phone'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.parentPhone)}
                  placeholder='9876543210'
                  {...(errors.parentPhone && { helperText: errors.parentPhone.message })}
                />
              )}
            />

            <Controller
              name='otherInfo'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  label='Other Info*'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.otherInfo)}
                  placeholder='Enter other information'
                  {...(errors.otherInfo && { helperText: errors.otherInfo.message })}
                />
              )}
            />
          </Box>

          {/* Save Button */}
          {/* <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
  Save
</Button> */}






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
