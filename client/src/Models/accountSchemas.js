import * as Yup from 'yup';

const getLogInSchema = () => (
    Yup.object().shape({
        EmailAddress: Yup.string().required("Email is required.").matches(/^\S*$/, {
            message: "Your email can not contain any spaces!",
            excludeEmptyString: true
        }),
        Password: Yup.string().required("Password is required").matches(
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\\$%\\^&\\*])(?!.*\\s).{8,20}$/,
                    {
                      message:
                        "Password must be 8-20 characters, must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (!@#$%^&*), and must not contain any spaces.",
                      excludeEmptyString: true
    })
    })
)

getLogInSchema.initialValues = {
    EmailAddress: "",
    Password: ""
}

export {getLogInSchema};