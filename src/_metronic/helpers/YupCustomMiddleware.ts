import * as Yup from 'yup'

// Add method
Yup.addMethod(Yup.string, 'stripEmptyString', function () {
  return this.transform((value) => (value === '' ? undefined : value))
})
