// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import auth from 'src/store/apps/auth'
import company from 'src/store/apps/company'
import bank from 'src/store/apps/bank'
import branch from 'src/store/apps/branch'
import banker from 'src/store/apps/banker'
import gst from 'src/store/apps/gst'
import employee from 'src/store/apps/employee'
import leadMarketer from './apps/leadMarketer'
import myMarketer from './apps/myMarketer'
import accountlist from './apps/accountlist'
import pincode from './apps/pincode'
import method from './apps/method'
import rateunit from './apps/rateunit'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    auth,
    company,
    bank,
    branch,
    banker,
    gst,
    employee,
    leadMarketer,
    myMarketer,
    accountlist,
    pincode,
    method,
    rateunit
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
