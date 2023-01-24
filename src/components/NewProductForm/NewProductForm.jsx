import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import styles from './NewProductForm.module.scss'
import useNewProductForm from './hooks/useNewProductForm'

const NewProductForm = () => {
  const {
    initialValues,
    validationSchema,
    isCreating,
    mutate,
  } = useNewProductForm()

  return (
    <div className={styles.formWrapper}>
      <h2>Create product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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

          <button disabled={isCreating} type="submit" className={styles.formBtn}>Create</button>
        </Form>
      </Formik>
    </div>
  )
}
export default NewProductForm
