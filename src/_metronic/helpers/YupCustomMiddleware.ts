import * as Yup from 'yup'

// Add method
Yup.addMethod(Yup.string, 'stripEmptyString', function () {
  return this.transform((value) => (value === '' ? undefined : value))
})

export const alfaNumerikOnly = (message: string) => Yup.string().matches(/^[a-zA-Z0-9]*$/, message)
