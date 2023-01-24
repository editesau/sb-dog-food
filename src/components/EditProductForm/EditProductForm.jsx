import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EditProductForm.module.scss'
import api from '../../tools/Api'
import { showError, showSuccess } from '../../tools/toaster'
import { ITEM_DETAIL_QUERY_KEY } from '../../tools/queryKeys'
import Loader from '../Loader/Loader'

const EditProductForm = () => {
  const { id } = useParams()

  const { isLoading, data: product } = useQuery({
    queryKey: [ITEM_DETAIL_QUERY_KEY].concat(id),
    queryFn: () => api.getProductById(id),
  })

  const navigate = useNavigate()

  const successHandler = (response) => {
    showSuccess('Product was successfuly edited')
    navigate(`/products/${response.data._id}`)
  }
  const errorHandler = (response) => {
    showError(response.response.data.message)
  }
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: (productData) => api.editProduct(productData, id),
    onSuccess: successHandler,
    onError: errorHandler,
  })

  if (isLoading) return <Loader />

  const initialValues = {
    name: product.data.name,
    pictures: product.data.pictures,
    price: product.data.price,
    discount: product.data.discount,
    stock: product.data.stock,
    wight: product.data.wight,
    description: product.data.description,
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Edit product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(
          {
            name: Yup.string()
              .min(2, 'More than 2 symbols')
              .max(20, 'Max 40 symbols')
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

          <button disabled={isEditing} type="submit" className={styles.formBtn}>Save</button>
        </Form>
      </Formik>
    </div>
  )
}
export default EditProductForm