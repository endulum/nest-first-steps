# Errors

Non-OK responses will typically have a non-OK status code and a payload in the following format:

```json
{
  "message": "The resource you are looking for could not be found."
}
```

If the preceding request was a submission of form data by `POST` or `PUT`, and errors resulted from validation, there will be an additional field denoting the validation errors:

```json
{
  "message": "There are some validation errors with your submission.",
  "fieldErrors": {
    "email": "Please input a valid email address.",
    "confirmPassword": "Passwords do not match."
  }
}
```

The value of `fieldErrors` is a key-value object wherein the keys are input paths, and their values are their validation error message.
