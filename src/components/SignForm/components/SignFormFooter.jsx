import { Link } from 'react-router-dom'

const SignFormFooter = ({ signup }) => {
  if (signup) {
    return (
      <>
        <span>Already registered?</span>
        {' '}
        <Link to="/signin">Login!</Link>
      </>
    )
  }
  return (
    <>
      <span>Not registered yet?</span>
      {' '}
      <Link to="/signup">Sign up!</Link>
    </>
  )
}

export default SignFormFooter
