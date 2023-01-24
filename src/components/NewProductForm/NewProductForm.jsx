import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import styles from './NewProductForm.module.scss'
import api from '../../tools/Api'
import { showError, showSuccess } from '../../tools/toaster'

const NewProductForm = () => {
  const navigate = useNavigate()

  const successHandler = (response) => {
    showSuccess(`Product was successfuly created with id: ${response.data._id}`)
    navigate(`/products/${response.data._id}`)
  }
  const errorHandler = (response) => {
    showError(response.response.data.message)
  }
  const { mutate } = useMutation({
    mutationFn: (productData) => api.createProduct(productData),
    onSuccess: successHandler,
    onError: errorHandler,
  })

  const initialValues = {
    name: '',
    pictures: '',
    price: '',
    discount: '',
    stock: '',
    wight: '',
    description: '',
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Create product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(
          {
            name: Yup.string()
              .min(2, 'More than 2 symbols')
              .max(20, 'Max 20 symbols')
              .required('Please set name'),
            pictures: Yup.string()
              .min(2, 'More than 2 symbols')
              .max(100, 'Max 100 symbols')
              .required('Please set image url'),
            price: Yup.number()
              .min(1, 'Cant be < 1')
              .required('empty'),
            discount: Yup.number()
              .min(0, 'Must be positive'),
            stock: Yup.number()
              .min(1, 'Min 1 item on stock'),
            wight: Yup.string()
              .min(2, 'More than 2 symbols')
              .max(20, 'Max 20 symbols'),
            description: Yup.string()
              .min(10, 'More than 10 symbols')
              .max(500, 'Max 500 symbols')
              .required('Please set description'),
          },
        )}
        onSubmit={(values) => {
          mutate(values)
        }}
      >
        <Form className={styles.form}>
          <Field name="name" placeholder="Product name" type="text" />
          <ErrorMessage className={styles.error} component="span" name="name" />

          <Field name="pictures" placeholder="Image link" type="text" />
          <ErrorMessage className={styles.error} component="span" name="pictures" />

          <Field name="price" placeholder="Price" type="number" />
          <ErrorMessage className={styles.error} component="span" name="price" />

          <Field name="discount" placeholder="Discount" type="number" />
          <ErrorMessage className={styles.error} component="span" name="discount" />

          <Field name="stock" placeholder="Count" type="number" />
          <ErrorMessage className={styles.error} component="span" name="stock" />

          <Field name="wight" placeholder="Wight" type="text" />
          <ErrorMessage className={styles.error} component="span" name="wight" />

          <Field name="description" placeholder="Description" type="textarea" />
          <ErrorMessage className={styles.error} component="span" name="description" />

          <button type="submit" className="btn btn-primary">Update</button>
        </Form>
      </Formik>
    </div>
  )
}
export default NewProductForm
