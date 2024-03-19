// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      {/* Habituslogo */}
      <svg width="34" height="34" viewBox="0 0 898 885" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M147.711 100.309C106.826 151.548 77.0768 212.935 62.9298 281.531C14.9372 514.237 164.677 741.788 397.383 789.781C618.548 835.393 835.057 702.4 897.189 489.324C895.713 501.083 893.765 512.875 891.33 524.68C841.102 768.227 602.95 924.942 359.404 874.714C115.857 824.485 -40.858 586.334 9.37025 342.788C29.4171 245.585 79.3988 162.213 147.711 100.309Z" fill="#145B9C"/>
<path d="M229.696 513.056H372.693L370.707 825.7L225.723 814.461L229.696 513.056Z" fill="#145B9C"/>
<path d="M407.431 406.17H551.728V818.747L407.431 825.7V406.17Z" fill="#145B9C"/>
<path d="M586.466 301.955H730.763V785.618L586.466 812.339V301.955Z" fill="#145B9C"/>
<path d="M731.63 152.94C667.257 88.1868 578.1 48.099 479.58 48.099C283.298 48.099 124.181 207.216 124.181 403.497C124.181 478.733 147.559 548.508 187.447 605.955C123.571 541.701 84.0984 453.159 84.0984 355.398C84.0984 159.117 243.216 0 439.497 0C560.543 0 667.454 60.5143 731.63 152.94Z" fill="#145B9C"/>
</svg>

      {/* <svg width={82} height={56.375} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          fill={theme.palette.primary.main}
          d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
        />
        <path
          fill='#161616'
          opacity={0.06}
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
        />
        <path
          fill='#161616'
          opacity={0.06}
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          fill={theme.palette.primary.main}
          d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
        />
      </svg> */}
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
