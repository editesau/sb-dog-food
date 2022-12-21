import { toast } from 'react-toastify'

const showError = (errorText) => toast.error(errorText, {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
})

export {
  showError,
}
