const errorHandler = (errorObj) => {
  switch (errorObj.response?.status) {
    case 401:
    case 400:
    case 404:
      return { status: errorObj.response.status, message: errorObj.response.data.message }
    case undefined:
      return { status: 'Unknown', message: errorObj.message }
    default:
      return { status: errorObj.response?.status || 'Unknown', message: errorObj.response?.data?.message || errorObj.message }
  }
}

export {
  errorHandler,
}
