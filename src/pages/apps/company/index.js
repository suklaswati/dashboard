// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/company'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/company/TableHeader'
import AddCompanyDrawer from 'src/views/apps/company/AddCompanyDrawer'

import toast from 'react-hot-toast'
import Button from '@mui/material/Button'

// ** renders client column
const userRoleObj = {
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  author: { icon: 'tabler:circle-check', color: 'success' },
  editor: { icon: 'tabler:edit', color: 'info' },
  maintainer: { icon: 'tabler:chart-pie-2', color: 'primary' },
  subscriber: { icon: 'tabler:user', color: 'warning' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column
const renderClient = row => {
  if (row?.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name ? row.name : 'Dummy Company')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ toggleEditUserDrawer, data }) => {
  // ** Hooks
  // console.log(toggleEditUserDrawer)
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  const handleEdit = () => {
    dispatch(editUser(id))
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/apps/user/view/account'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            toggleEditUserDrawer()
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const getCols = toggleEditUserDrawer => {
  const columns = [
    {
      flex: 0.15,
      minWidth: 240,
      field: 'name',
      headerName: 'Company Name',
      renderCell: ({ row }) => {
        const { name, email } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                href='/apps/user/view/account'
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {name}
              </Typography>
              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'address',
      minWidth: 190,
      headerName: 'Address',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
           
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize',whiteSpace: 'pre-line' }}>
              {row.address}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 190,
      field: 'GST',
      headerName: 'GST',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.GST}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: 'panNumber',
      headerName: 'Pan No.',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.panNumber}
          </Typography>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 150,
      field: 'phoneNumber',
      headerName: 'Phone Number',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.phoneNumber}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 190,
      field: 'addedDate',
      headerName: 'Added Date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.createdAt?.slice(0, 10)}
          </Typography>
        )
      }
    },

     
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions toggleEditUserDrawer={toggleEditUserDrawer} data={row} />
    }
  ]

  return columns
}

const CompanyList = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.company)
  console.log("company store",store.companies)
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan,
        page: paginationModel.page+1,
        limit: paginationModel.pageSize
      })
    )
  }, [dispatch, plan, role, status, value,paginationModel.page, paginationModel.pageSize])

  console.log(paginationModel.page)

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => {
    setEditUserOpen(false)
    console.log(editUserOpen)
   setAddUserOpen(!addUserOpen)
  }

  const toggleEditUserDrawer = () =>{
   console.log(editUserOpen)
    setEditUserOpen(!editUserOpen)
  }

  const [companyData, setCompanyData] = useState({})

  console.log(addUserOpen, editUserOpen)

  const handleRow = data => {
    setCompanyData(data)
    console.log(data)
  }
  
return (
    <Grid container spacing={6.5}>
     
      <Grid item xs={12}>
        <Card>
          
          <Divider sx={{ m: '0 !important' }} />
          
        
          <TableHeader records={store.total} value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          
          
          
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.companies}
            getRowId={row => row._id}
            columns={getCols(toggleEditUserDrawer)}
            onRowClick={row => handleRow(row.row)}
            disableRowSelectionOnClick

            rowCount={store.total}

             
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />

          
        </Card>
      </Grid>
      <AddCompanyDrawer
        open={addUserOpen ? addUserOpen : editUserOpen}
        toggle={
          editUserOpen
            ? () => {
                toggleEditUserDrawer()
              }
            : toggleAddUserDrawer
        }
        companyData={editUserOpen ? companyData : null}
        editable={editUserOpen}
      />
    </Grid>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default CompanyList
